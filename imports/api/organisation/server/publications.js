import { Meteor } from 'meteor/meteor';
import '../../../lib/organisation.js';

// Meteor.publish('users.in.group', function usersInGroup(users) {
// 	return Meteor.users.find({ _id: { $nin: users }}, {
//     fields: {
//       profile: 1,
//       emails: 1
//     }
//   })
// });

Meteor.publish('all.users', function allUsers() {
	if (this.userId) {
	  return Meteor.users.find();	
	}
});

Meteor.publish('organisation', function () {
  return Organisation.find();
});