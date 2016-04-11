import { Template } from 'meteor/templating';

Template.registerHelper('isInRole', (role) => {
  let id = Meteor.userId();
  return Roles.userIsInRole(id, role);
});