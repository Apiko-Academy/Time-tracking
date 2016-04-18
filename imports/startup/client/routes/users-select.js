import { ReactiveVar } from 'meteor/reactive-var'
import { Session } from 'meteor/session';
import '../../../ui/pages/userselect/users-select.js';

Router.route('/userselect', {
  name: 'userselect',
  template: 'Users_select',
  waitOn: function() {
    return Meteor.subscribe('all.users');
  },
  data: function() {
    return {
      allUsers: Meteor.users.find().fetch()
    }
  }
});
