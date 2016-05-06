import './organisation.html';
import './create-organisation.js';

import { Template } from 'meteor/templating';

Template.organisation.helpers({
  isUser: function() {
    return Meteor.userId();
  }
  // isOwner: function () {
  //   return antitoggl.isUserInRole('owner');
  // }	
});