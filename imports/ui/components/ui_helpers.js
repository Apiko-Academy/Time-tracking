import { Template } from 'meteor/templating';

UI.registerHelper('isInRole', (role) => {
  let id = Meteor.userId();
  return Roles.userIsInRole(id, role);
});