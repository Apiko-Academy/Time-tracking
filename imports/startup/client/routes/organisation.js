import '../../../ui/pages/organisation.html';
import '../../../ui/pages/role.html';
import { Meteor } from 'meteor/meteor';

Router.route('/organisation', {
  name: 'organisation',
  template: 'organisation'
});

Template.organisation.helpers({
  isInRole(role) {
    let id = Meteor.userId();
    return Roles.userIsInRole(id, role);
  }
})
