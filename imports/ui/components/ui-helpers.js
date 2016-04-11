import { Template } from 'meteor/templating';

Template.registerHelper('isUserInRole', (userId = Meteor.userId(), role, group = null) => {

	console.log('userId',userId);
	console.log('role',role);
	console.log('group',group);

  return Roles.userIsInRole(userId, role);
});