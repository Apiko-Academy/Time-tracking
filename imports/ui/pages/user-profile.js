import { Template } from 'meteor/templating';

import './user-profile.html';

Template.userProfile.onRendered(function () {
  $('#username.editable').editable({
    success: function(response, newValue) {
    
  }});

  $('#firstName.editable').editable({
    success: function(response, newValue) {
    
  }});

  $('#lastName.editable').editable({
    success: function(response, newValue) {
    
  }});
})

Template.userProfile.helpers({
  username: function () {
    return Meteor.user() && Meteor.user().username;
  },
  firstName: function () {
    return Meteor.user() && Meteor.user().profile && Meteor.user().profile.firstName;
  },
  lastName: function () {
    return Meteor.user() && Meteor.user().profile && Meteor.user().profile.lastName;
  },
  avatar: function () {
    return Meteor.user() && Meteor.user().avatar;
  },
  emails: function () {
    return Meteor.user() && Meteor.user().emails;
  },
  organizations: function () {
    return Meteor.user() && Meteor.user().organizations;
  }
});