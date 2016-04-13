import './user-profile.html';

import { Template } from 'meteor/templating';
import { loadFilePicker } from 'meteor/natestrauser:filepicker-plus';

Template.userProfile.onCreated(function () {
  // should be defined other way: meteor settings or env var, I guess
  loadFilePicker('AMxXlNUEKQ1OgRo47XtKSz');
});

Template.userProfile.onRendered(function () {
  $.fn.editable.defaults.mode = 'inline';

  this.$('#username.editable').editable({
    display: false,
    pk: Meteor.userId(),
    title: "Enter username",
    success: updateUserProfile,
    validate: function(value) {
      return validateOnRequire(value);
    }
  });

  this.$('#profile\\.firstName.editable').editable({
    display: false,
    pk: Meteor.userId(),
    title: "Enter first name",
    success: updateUserProfile,
    validate: function(value) {
      return validateOnRequire(value);
    }
  });

  this.$('#profile\\.lastName.editable').editable({
    display: false,
    pk: Meteor.userId(),
    title: "Enter last name",
    success: updateUserProfile,
    validate: function(value) {
      return validateOnRequire(value);
    }
  });

  this.$('#emails\\.0\\.address.editable').editable({
    display: false,
    pk: Meteor.userId(),
    title: "Enter email",
    success: updateUserProfile,
    validate: function(value) {
      return validateOnRequire(value) || validateEmail(value);
    }
  });
});

Template.userProfile.helpers({
  avatar: function () {
    let noImg = AntiToggl.img.noImg;

    return Meteor.user() && Meteor.user().profile && Meteor.user().profile.avatar || noImg;
  },
  email: function () {
    return Meteor.user() && Meteor.user().emails && Meteor.user().emails[0].address;
  },
  isNotVerifiedEmail: function () {
    let isVerifiedEmail = Meteor.user() && Meteor.user().emails && Meteor.user().emails[0].verified;
    
    return !isVerifiedEmail;
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

Template.userProfile.events({
  'click #user-avatar': function () {
    filepicker.pick({
        mimetypes: ['image/gif','image/jpeg','image/png'],
        multiple: false
      },
      function(InkBlobs){
        updateUserProfile('', InkBlobs.url);
      },
      function(FPError){
        console.log(FPError.toString());
    });
  }
});

//have to find out what should be in 'response'
function updateUserProfile (response, newValue) {
  let userId    = Meteor.userId();
  let fieldName = $(this)[0].id || "profile.avatar";
  let options   = {};

  options[fieldName] = newValue;

  Meteor.call('users.update', userId, options);
}

function validateEmail (email) {
  if (!AntiToggl.regex.email(email)) {
    return 'Enter valid email';
  }
}

function validateOnRequire (value) {
  if ($.trim(value) == '') {
    return 'This field is required';
  }
}