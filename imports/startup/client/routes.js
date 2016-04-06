import { Template } from 'meteor/templating';

import '/imports/ui/layouts/mainLayout.js';
import '/imports/ui/layouts/content/homepage.html';
import '/imports/ui/layouts/content/organisation.html';
import '/imports/ui/layouts/content/projects.html';
import '/imports/ui/layouts/content/tasks.html';
import '/imports/ui/layouts/content/reports.html';

Router.configure({
  layoutTemplate: 'main-layout'
});

Router.route('/', {
    name: 'home',
    template: 'homePage'
});

Router.route('/organisation', {
    name: 'organisation',
    template: 'organisation'
});

Router.route('/projects', {
    name: 'projects',
    template: 'projects'
});

Router.route('/tasks', {
    name: 'tasks',
    template: 'tasks'
});

Router.route('/reports', {
    name: 'reports',
    template: 'reports'
});