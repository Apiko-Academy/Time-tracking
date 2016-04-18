import '../../../ui/pages/tasks.js';

Router.route('/tasks', {
  name: 'tasks',
  template: 'tasks',
  waitOn: function() {
    return Meteor.subscribe('all.users');
  },
  data: function() {
    return {
      allUsers: Meteor.users.find().fetch()
    }
  }
});
