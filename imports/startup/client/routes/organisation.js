import { Meteor } from 'meteor/meteor';
import 'meteor/mongo';

import '../../../lib/organisation.js';
import '../../../ui/pages/organisation/organisation.js';

import '../../../ui/pages/organisation/my-organisations.js';
import '../../../ui/pages/organisation/organisation-settings/organisation-settings.js';
import '../../../ui/pages/organisation/organisation-settings/organisation-settings.html';


Router.route('/organisation', {
  name: 'organisation',
  template: 'organisation'
});

Router.route('/editOrganisation/:_id', {
  name: 'organisationSettings',
  template: 'organisationSettings',
  waitOn: function(){
    return [
      Meteor.subscribe('current.organisation', this.params._id),
      Meteor.subscribe('users')
    ]
  },
  data: function(){
    return Organisation.findOne();
  }
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