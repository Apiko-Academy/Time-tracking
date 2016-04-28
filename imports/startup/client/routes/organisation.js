import { Meteor } from 'meteor/meteor';

import '../../../ui/pages/organisation/organisation.js';

import '../../../ui/pages/organisation/my-organisations.js';

Router.route('/organisation', {
  name: 'organisation',
  template: 'organisation'
});

Router.route('/my-organisations', {
  name: 'myorganisations',
  template: 'myOrganisations',
  waitOn: function(){
    return [
      Meteor.subscribe('organisation'),
      Meteor.subscribe('users')
    ]
  },
  data: function(){
    return {
      organisations: function(){
        return Organisation.find();
      }
    }
  }
});