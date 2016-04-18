import { Meteor } from 'meteor/meteor';
import '../../../lib/organisation.js';

Meteor.publish('all.users', function allUsers() {
	if (this.userId) {
	  return Meteor.users.find();	
	}
});

Meteor.publish('organisation', function () {
  return Organisation.find();
});