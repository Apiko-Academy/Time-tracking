// routes alltogether

// DEPENDENCY IMPORTS
import { Meteor } from 'meteor/meteor';
import { Router } from 'meteor/iron:router';

// homepage
import '../../../ui/pages/homepage.html';
// main layout
import '../../../ui/layouts/main-layout.js';
// loading
import '../../../ui/pages/loading.html';
// 404
import '../../../ui/pages/not-found.html';
// organisation
import { Organisation } from '/imports/api/collections.js';
import '../../../ui/pages/organisation/organisation.js';
import '../../../ui/pages/organisation/my-organisations.js';
import '../../../ui/pages/organisation/organisation-settings/organisation-settings.js';
// projects
import '../../../ui/pages/projects-page.js';
// reports
import '../../../ui/pages/reports.html';
// tasks
import '../../../ui/pages/tasks.js';
// timer
import '../../../ui/pages/timer.html';
// user profile
import '../../../ui/pages/user-profile.js';
// permissions
import '../../../ui/components/permissions-page/permissions.html';

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
