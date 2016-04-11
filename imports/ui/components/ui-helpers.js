import { Template } from 'meteor/templating';

Template.registerHelper('isUserInRole', (role = 'owner', userId = Meteor.userId(), group = null ) => {

	if( typeof userId === "object") {
		userId = Meteor.userId();
	}

	console.log('role',role);
	console.log('userId',userId);
	console.log('group',group);

  return Roles.userIsInRole(userId, role);
});