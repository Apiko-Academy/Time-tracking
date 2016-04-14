import './user-profile.html';

import { Template } from 'meteor/templating';
import { loadFilePicker } from 'meteor/natestrauser:filepicker-plus';

import '../../startup/client/config.js';

Template.userProfile.onCreated(function () {
  // should be defined other way: meteor settings or env var, I guess
  loadFilePicker('AMxXlNUEKQ1OgRo47XtKSz');
  this.subscribe('organisation');
});

Template.userProfile.onRendered(function () {
  let fieldsConfig = [{
    selector: '#username',
    title: 'Enter username'
  }, {
    selector: '#profile\\.firstName',
    title: 'Enter first name'
  }, {
    selector: '#profile\\.lastName',
    title: 'Enter last name'
  }, {
    selector: '#emails\\.0\\.address',
    title: 'Enter email'
  }];
  let template = this;
  
  fieldsConfig.forEach(function(field) {
    let fieldName = cropSelector(field.selector);
    let configObject = {
      pk: Meteor.userId(),
      title: field.title,
      success: updateUserProfile(fieldName),
      validate: function(value) {
        return validateOnRequire(value);
      }
    };

    if (field.selector.includes('email')) {
      configObject.validate = function(value) {
        return validateOnRequire(value) || validateEmail(value);
      }
    }

    template.$(field.selector).editable(configObject);
  });
});

Template.userProfile.helpers({
  email: function () {
    let user = Meteor.user();
    return user && user.emails && user.emails[0].address;
  },
  isNotVerifiedEmail: function () {
    let user = Meteor.user();
    let isVerifiedEmail = user && user.emails && user.emails[0].verified;
    
    return !isVerifiedEmail;
  },
  organizations: function () {
    let userId = Meteor.userId();
    let organizationIds = Roles.getGroupsForUser(userId) || [];
    
    return Organisation.find({_id:{$in:organizationIds}}).fetch();
  }
});

Template.userProfile.events({
  'click #user-avatar': function () {
    filepicker.pick({
        mimetypes: ['image/gif','image/jpeg','image/png'],
        multiple: false
      },
      function(InkBlobs){
        updateUserProfile('profile.avatar')('', InkBlobs.url);
      },
      function(FPError){
        console.log(FPError.toString());
    });
  }
});

function updateUserProfile (fieldName) {
  return function (response, newValue) {
    let userId    = Meteor.userId();
    let options   = {};

    options[fieldName] = newValue;

    Meteor.call('users.update', userId, options);
  }
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

function cropSelector (selector) {
  selector = selector.replace('#', '');
  selector = removeSlashFromString(selector);

  return selector;
}

function removeSlashFromString (string) {
  string = string.replace('\\', '');
  if (string.includes('\\')){
    return removeSlashFromString(string);
  }

  return string;
}