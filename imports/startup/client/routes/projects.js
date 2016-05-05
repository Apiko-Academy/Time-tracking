import { Meteor } from 'meteor/meteor';

import '../../../ui/pages/projects-page.js';

Router.route('/projects', {
    name: 'projects',
    template: 'Projects_page',
    waitOn: function(){
      return [
        Meteor.subscribe('projects'),
        Meteor.subscribe('clients'),
        Meteor.subscribe('users')
      ]
    }
});