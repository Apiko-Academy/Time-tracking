import './projects-find.html';
import 'meteor/alanning:roles';
import 'meteor/underscore';
import {getFullName} from '../../../modules/users.js';

Template.projectsFind.helpers({
  clients: function(){
    return Clients.find();
  },
  teamMembers: function(){
    let organizationIds = Roles.getGroupsForUser(Meteor.userId());
    let usersIds = [];
    let members = [];

    organizationIds.forEach(function(orgId){
      usersIds = _.union(usersIds, _.pluck(Roles.getUsersInRole(['member', 'owner'], orgId).fetch(), '_id'));
    });
    usersIds.forEach(function(id){
      members.push({
        _id: id,
        fullName: getFullName(id)
      });
    });
    return members;
  }
});

Template.projectsFind.events({
  'click .apply-filter': function (event, inst) {
    event.preventDefault();
    let name = inst.$(".project-name").val();
    if(name){
      inst.filter.name = {$regex: name + ".*"};
    } else {
      delete inst.filter.name;
    }
    inst.view.parentView._templateInstance.filter.set(inst.filter); 
  },
  'click .reset-filters': function(event, inst){
    event.preventDefault();
    inst.view.parentView._templateInstance.filter.set({});
  }
});

Template.projectsFind.onRendered(function(){
  let filter = this.filter;

  $('.filter_client').selectpicker({
    liveSearchPlaceholder: 'Find client'
  }).on('changed.bs.select', function (e) {
    if($(this).val()){
      filter.clientId = {$all: $(this).val()};
    } else {
      delete filter.clientId;
    }
  });

  $('.filter_team').selectpicker({
    liveSearchPlaceholder: 'Find team'
  }).on('changed.bs.select', function (e) {
    if($(this).val()){
      filter.$or = [{workers: {$all: $(this).val()}}, {managers: {$all: $(this).val()}}];
    } else {
      delete filter.$or;
    }
  });

});

Template.projectsFind.onCreated(function(){
  this.filter = {};
});