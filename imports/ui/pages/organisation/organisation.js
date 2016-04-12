import { Meteor } from 'meteor/meteor';
import './organisation.html';
import './create-organisation.js';
import './list-organisation.html';

Template.organisation.helpers({
	isUser: function() {
    return Meteor.userId();
	}
  // isOwner: function () {
  //   return antitoggl.isUserInRole('owner');
  // }	
});