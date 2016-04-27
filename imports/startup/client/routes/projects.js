import 'meteor/mongo';

import '../../../ui/pages/project/projects.js';

Router.route('/projects', {
    name: 'projects',
    template: 'Projects',
    waitOn: function(){
      return [
        Meteor.subscribe('projects'),
        Meteor.subscribe('clients'),
        Meteor.subscribe('users')
      ]
    },
    data: function(){
      return {
        clients: function(){
          return Clients.find();
        }
      }
    }
});