import { Meteor } from 'meteor/meteor';
import { Organisation } from '../../../api/organisation/organisation.js';

import '../../../ui/pages/organisation/organisation.js';

import '../../../ui/pages/organisation/my-organisations.js';
import '../../../ui/pages/organisation/organisation-settings/organisation-settings.js';


Router.route('/organisation', {
  name: 'organisation',
  template: 'organisation'
});

Router.route('/editOrganisation/:_id', {
  name: 'organisationSettings',
  template: 'organisationSettings',
  waitOn: function(){
    return Meteor.subscribe('current.organisation', this.params._id);
  },
  data: function(){
    return Organisation.findOne(this.params._id);
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
        return Organisation.find({}, {sort: {createdAt: -1}});
      }
    }
  }
});