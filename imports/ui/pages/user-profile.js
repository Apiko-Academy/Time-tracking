import { Template } from 'meteor/templating';
// import { filepicker } from 'meteor/natestrauser:filepicker-plus';

import '../../api/users.js';
import './user-profile.html';

Template.userProfile.onCreated(() => {
  loadFilePicker('AMxXlNUEKQ1OgRo47XtKSz');
});

Template.userProfile.onRendered(() => {
  $.fn.editable.defaults.mode = 'inline';

  $('#username.editable').editable({
    display: false,
    pk: Meteor.userId(),
    success: updateUserProfile,
    validate: function(value) {
      return validateOnRequire(value);
    }
  });

  $('#profile\\.firstName.editable').editable({
    display: false,
    pk: Meteor.userId(),
    success: updateUserProfile,
    validate: function(value) {
      return validateOnRequire(value);
    }
  });

  $('#profile\\.lastName.editable').editable({
    display: false,
    pk: Meteor.userId(),
    success: updateUserProfile,
    validate: function(value) {
      return validateOnRequire(value);
    }
  });

  $('#emails\\.0\\.address.editable').editable({
    display: false,
    pk: Meteor.userId(),
    success: updateUserProfile,
    validate: function(value) {
      return validateOnRequire(value) || validateEmail(value);
    }
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
    return Meteor.user() && Meteor.user().profile && Meteor.user().profile.avatar;
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
})

//have to find out what should be in 'response'
function updateUserProfile (response, newValue) {
  let userId    = Meteor.userId(),
      fieldName = $(this)[0].id || "profile.avatar",
      options   = {};

  options[fieldName] = newValue;

  Meteor.call('users.update', userId, options);
}

function validateEmail (email) {
  let regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!regEx.test(email)) {
    return 'Enter valid email';
  }
}

function validateOnRequire (value) {
  if ($.trim(value) == '') {
    return 'This field is required';
  }
}