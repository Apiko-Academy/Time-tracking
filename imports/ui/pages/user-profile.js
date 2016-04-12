import { Template } from 'meteor/templating';

import '../../api/users.js';
import './user-profile.html';

Template.userProfile.onRendered(function () {
  $.fn.editable.defaults.mode = 'inline';

  $('#username.editable').editable({
    display: false,
    pk: Meteor.userId(),
    success: updateUserProfile
  });

  $('#profile\\.firstName.editable').editable({
    display: false,
    pk: Meteor.userId(),
    success: updateUserProfile
  });

  $('#profile\\.lastName.editable').editable({
    display: false,
    pk: Meteor.userId(),
    success: updateUserProfile
  });

  $('#emails\\.0\\.address.editable').editable({
    display: false,
    pk: Meteor.userId(),
    success: updateUserProfile
  });

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
  email: function () {
    return Meteor.user() && Meteor.user().emails && Meteor.user().emails[0].address;
  },
  organizations: function () {
    let organizationsIDs = Meteor.user() && Meteor.user().organizations;

    //temporary implementation of assigned organization untill no organizations
    return [{
      location: 'location',
      timezone: 'timezone',
      iconUrl: 'http://jssolutionsdev.com/img/logo.png',
      companySite: 'http://jssolutionsdev.com/'
    }]
  }
});

function updateUserProfile (response, newValue) {
  let userId    = $(this).data().editable.options.pk,
      fieldName = $(this)[0].id,
      options   = {};

  options[fieldName] = newValue;

  Meteor.call('users.update', userId, options);
}