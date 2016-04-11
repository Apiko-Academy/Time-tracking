import { Template } from 'meteor/templating';

Template.registerHelper('isUserInRole', (role = 'owner', userId = Meteor.userId(), group = null) => {

  if (typeof userId === "object") {
    userId = Meteor.userId();
  }
  
  if (typeof group === "string") {
    return Roles.userIsInRole(userId, role, group);
  }

  return Roles.userIsInRole(userId, role);
});