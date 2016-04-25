import 'meteor/mongo';

import '../../../ui/pages/project/projects.js';

Router.route('/projects', {
    name: 'projects',
    template: 'projects',
    waitOn: function(){
      return [
        Meteor.subscribe('projects'),
        Meteor.subscribe('clients')
      ]
    }
});