import './projects-find.html';
import 'meteor/alanning:roles';
import 'meteor/underscore';
import {getFullName} from '../../../modules/users.js';

Template.Projects_find.helpers({
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

Template.Projects_find.events({
  'click .apply-filter': function (event, tmpl) {
    event.preventDefault();
    let name = tmpl.$(".project-name").val();
    if(name){
      tmpl.filter.name = {$regex: name + ".*"};
    } else {
      delete tmpl.filter.name;
    }
    tmpl.view.parentView._templatetmplance.filter.set(tmpl.filter); 
  },
  'click .reset-filters': function(event, tmpl){
    event.preventDefault();
    
    tmpl.$(".filter_client").selectpicker('deselectAll');
    tmpl.$(".filter_team").selectpicker('deselectAll');
    tmpl.$(".project-name").val('');
    tmpl.view.parentView._templatetmplance.filter.set({});
  }
});

Template.Projects_find.onRendered(function(){
  let filter = this.filter;

  this.$('.filter_client').selectpicker({
    liveSearchPlaceholder: 'Find client'
  }).on('changed.bs.select', function (e) {
    if($(this).val()){
      filter.clientId = {$all: $(this).val()};
    } else {
      delete filter.clientId;
    }
  });

  this.$('.filter_team').selectpicker({
    liveSearchPlaceholder: 'Find team'
  }).on('changed.bs.select', function (e) {
    if($(this).val()){
      filter.$or = [{workers: {$all: $(this).val()}}, {managers: {$all: $(this).val()}}];
    } else {
      delete filter.$or;
    }
  });

});

Template.Projects_find.onCreated(function(){
  this.filter = {};
});