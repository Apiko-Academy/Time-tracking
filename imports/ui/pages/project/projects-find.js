import './projects-find.html';
import 'meteor/alanning:roles';
import 'meteor/underscore';
import '../../components/select-dropdown/select-dropdown.js';
import {getFullName} from '../../../modules/users.js';

Template.Projects_find.helpers({
  clients: function(){
    return Clients.find();
  },
  clientFilterChanged: function(){
    let filter = Template.instance().filter;
    return function(event){
      let selectVal = $(event.target).val();
      if(selectVal){
        filter.clientId = {$in: selectVal};
      } else {
        delete filter.clientId;
      }
    }
  },
  teamFilterChanged: function(){
    let filter = Template.instance().filter;
    return function(event){
      let selectVal = $(event.target).val();
      if(selectVal){
        filter.$or = [{workers: {$all: selectVal}}, {managers: {$all: selectVal}}];
      } else {
        delete filter.$or;
      }
    }
  },
  teamMembers: ()=>{
    let organizationIds = Roles.getGroupsForUser(Meteor.userId());
    let usersIds = [];

    organizationIds.forEach((orgId)=>{
      usersIds = _.union(usersIds, _.pluck(Roles.getUsersInRole(['member', 'owner'], orgId).fetch(), '_id'));
    });
    let members = usersIds.map((id)=>{
      return {
        _id: id,
        name: getFullName(id)
      };
    });
    return members;
  }
});

Template.Projects_find.events({
  'click .apply-filter': function(event, tmpl){
    event.preventDefault();
    let name = tmpl.$(".project-name").val();
    let filter = tmpl.filter;

    if(name){
      filter.name = {$regex: name + ".*"};
    } else {
      delete filter.name;
    }

    tmpl.data.filter(filter);

  },
  'click .reset-filters': (event, tmpl)=>{
    event.preventDefault();
    
    tmpl.$(".filter-client").selectpicker('deselectAll');
    tmpl.$(".filter-team").selectpicker('deselectAll');
    tmpl.$(".project-name").val('');
    tmpl.data.filter({});
  }
});

Template.Projects_find.onRendered(function(){
  this.isRendered = true;
});

Template.Projects_find.onCreated(function(){
  this.isRendered = false;
  this.filter = {};
});