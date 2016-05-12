import { Router } from 'meteor/iron:router';

// main layout
import '/imports/ui/layouts/main-layout.js';
// loading
import '/imports/ui/pages/loading.html';
// 404
import '/imports/ui/pages/not-found.html';

Router.configure({
  layoutTemplate: 'mainLayout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});
