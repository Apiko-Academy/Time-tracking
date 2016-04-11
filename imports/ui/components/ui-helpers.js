import { Template } from 'meteor/templating';

Template.registerHelper('isUserInRole', (role, group = null, userId = Meteor.userId() ) => {

	console.log('role',role);
	
	console.log('group',group);
	console.log('userId',userId);

  return Roles.userIsInRole(userId, role);
});