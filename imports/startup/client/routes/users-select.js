import { Session } from 'meteor/session';
import '../../../ui/pages/userselect/users-select.js';

Router.route('/userselect', {
  name: 'userselect',
  template: 'Users_select',
  waitOn: function() {

    let idUsersInGroup = Session.get('idUsersInGroup');
    idUsersInGroup = idUsersInGroup ? idUsersInGroup : [];

    return Meteor.subscribe('users.in.group', idUsersInGroup);
  },
  data: function() {
    return {
      usersOutsideGroup: Meteor.users.find().fetch()
    }
  }
});
