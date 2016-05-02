import './projects-find.html';
import 'meteor/alanning:roles';
import 'meteor/underscore';
import '../../select-dropdown/select-dropdown.js';

import {getFullName} from '../../../../modules/users.js';

Template.Projects_find.helpers({
  clients: function(){
    return Clients.find();
  },
  clientFilterChanged: function(){
    let filter = Template.instance().data.filter;
    let currentFilter = filter.get();

    return function(selectVal){
      if(selectVal){
        currentFilter.clientId = {$in: selectVal};  
      } else {
        delete currentFilter.clientId;
      }
      filter.set(currentFilter);
      console.log(currentFilter);
    }
  },
  teamFilterChanged: function(){
    let filter = Template.instance().data.filter;
    let currentFilter = filter.get();

    return function(selectVal){
      if(selectVal){
        currentFilter.$or = [{workers: {$all: selectVal}}, {managers: {$all: selectVal}}];
      } else {
        delete currentFilter.$or;
      }
      filter.set(currentFilter);
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
    let name = tmpl.$(".project-name").val();
    let filter = tmpl.data.filter;
    let currentFilter = filter.get();

    if(name){
      currentFilter.name = {$regex: name + ".*"};
    } else {
      delete currentFilter.name;
    }

    filter.set(currentFilter);

  },
  'click .reset-filters': (event, tmpl)=>{
    event.preventDefault();
    
    tmpl.$(".filter-client").val(null).trigger("change");
    tmpl.$(".filter-team").val(null).trigger("change");
    tmpl.$(".project-name").val('');
    tmpl.data.filter.set({});
  }
});
