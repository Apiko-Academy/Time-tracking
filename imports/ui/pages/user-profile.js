import { Template } from 'meteor/templating';

import '../../api/users.js';
import './user-profile.html';

Template.userProfile.onRendered(function () {
  $('#username.editable').editable({
    pk: Meteor.userId(),
    success: updateUserProfile
  });

  $('#profile\\.firstName.editable').editable({
    pk: Meteor.userId(),
    success: updateUserProfile
  });

  $('#profile\\.lastName.editable').editable({
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
  emails: function () {
    return Meteor.user() && Meteor.user().emails;
  },
  organizations: function () {
    return Meteor.user() && Meteor.user().organizations;
  }
});

function updateUserProfile (response, newValue) {
  let userId    = $(this).data().editable.options.pk,
      fieldName = $(this)[0].id,
      options   = {};

  options[fieldName] = newValue;

  Meteor.call('users.update', userId, options);
}