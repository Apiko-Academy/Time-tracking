// routes alltogether

// DEPENDENCY IMPORTS
import { Meteor } from 'meteor/meteor';
import { Router } from 'meteor/iron:router';

// homepage
import '/imports/ui/pages/homepage/homepage.html';
// organisation
import { Organisation } from '/imports/api/collections.js';
import '/imports/ui/pages/organisation/organisation.js';
import '/imports/ui/pages/organisation/my-organisations.js';
import '/imports/ui/pages/organisation/organisation-settings/organisation-settings.js';
// projects
import '/imports/ui/pages/projects/projects-page.js';
// reports
import '/imports/ui/pages/reports/reports.html';
// tasks
import '/imports/ui/pages/tasks/tasks.js';
// timer
import '/imports/ui/pages/timer/timer.html';
// user profile
import '/imports/ui/pages/user-profile/user-profile.js';

// CONFIGURATION
import "./config.js";

// HOOKS
import "./hooks.js";

// ROUTES

// homepage
Router.route('/', {
  name: 'home',
  template: 'homePage'
});

// organisation
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

// projects
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

// reports
Router.route('/reports', {
  name: 'reports',
  template: 'reports'
});

// tasks
Router.route('/tasks', {
  name: 'tasks',
  template: 'tasks'
});

// timer
Router.route('/timer', {
  name: 'timer',
  template: 'timer'
});

// user profile
Router.route('/userProfile', {
  name: 'userProfile',
  template: 'userProfile',
  data: function () {
    return Meteor.user();
  }
});
