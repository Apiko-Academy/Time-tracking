import { Meteor } from 'meteor/meteor';
import './organisation.html';
import './create-organisation.js';

Template.organisation.helpers({
	isUser: function() {
    return Meteor.userId();
	}
  // isOwner: function () {
  //   return antitoggl.isUserInRole('owner');
  // }	
});