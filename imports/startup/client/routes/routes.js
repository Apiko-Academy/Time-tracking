import './configure.js';

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

Router.onBeforeAction('loading');