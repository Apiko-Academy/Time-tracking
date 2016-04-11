import { Template } from 'meteor/templating';

Template.registerHelper('isUserInRole', (role = 'owner', userId = Meteor.userId(), group = null) => {

  if (typeof userId === "object") {
    userId = Meteor.userId();
  }

  return Roles.userIsInRole(userId, role);
});