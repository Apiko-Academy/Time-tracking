import { Template } from 'meteor/templating';

import '/imports/ui/layouts/mainLayout.js';
import '/imports/ui/layouts/content/homepage.html';
import '/imports/ui/layouts/content/organisation.html';
import '/imports/ui/layouts/content/projects.html';
import '/imports/ui/layouts/content/tasks.html';
import '/imports/ui/layouts/content/reports.html';

Router.configure({
  layoutTemplate: 'mainLayout'
});

Router.route('/', {
    name: 'home',
    template: 'homePage',
    path: '/'
});

Router.route('/', {
    name: 'organisation',
    template: 'organisation',
    path: '/organisation'
});

Router.route('/', {
    name: 'projects',
    template: 'projects',
    path: '/projects'
});

Router.route('/', {
    name: 'tasks',
    template: 'tasks',
    path: '/tasks'
});

Router.route('/', {
    name: 'reports',
    template: 'reports',
    path: '/reports'
});