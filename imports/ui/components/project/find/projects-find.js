import './projects-find.html';
import 'meteor/alanning:roles';
import 'meteor/underscore';
import '../../select-dropdown/select-dropdown.js';

import { Clients } from '/imports/api/collections.js';
import { Template } from 'meteor/templating';
import { getFullName } from '../../../../modules/users.js';

Template.Projects_find.helpers({
  clients: function(){
    let clients = Clients.find().fetch();

    clients.unshift({
      _id: 'without client',
      name: 'Without client'
    });

    return clients;
  },
  clientFilterChanged: function(){
    return (selectVal)=>{
      this.onFilterChange('clientFilter', selectVal);
    }
  },
  teamFilterChanged: function(){
    return (selectVal)=>{
      this.onFilterChange('teamFilter', selectVal);
    }
  },
  teamMembers: function(){
    let organizationIds = Roles.getGroupsForUser(Meteor.userId());
    let usersIds = [];

    organizationIds.forEach((orgId)=>{
      usersIds = _.union(usersIds, 
        _.pluck(Roles.getUsersInRole(['member', 'owner'], orgId).fetch(), '_id')
      );
    });
    return usersIds.map((id)=>{
      return {
        _id: id,
        name: getFullName(id)
      };
    });
  }
});

Template.Projects_find.events({
  'keyup .project-name': function(event, tmpl){
    event.preventDefault();
    let nameFilterVal = tmpl.$(".project-name").val();
    tmpl.data.onFilterChange('nameFilter', nameFilterVal);
  },

  'click .reset-filters': (event, tmpl)=>{
    event.preventDefault();
    let filterNames = ['nameFilter', 'clientFilter', 'teamFilter'];

    tmpl.$(".filter-client").val(null).trigger("change");
    tmpl.$(".filter-team").val(null).trigger("change");
    tmpl.$(".project-name").val('');

    filterNames.forEach(function(filter){
      tmpl.data.onFilterChange(filter, null);
    });
  }
});
