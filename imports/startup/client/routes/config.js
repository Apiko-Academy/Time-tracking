import {Router} from 'meteor/iron:router';

Router.configure({
  layoutTemplate: 'mainLayout',
	loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});

import './main-layout.js';
import './homepage.js';
import './organisation.js';
import './projects.js';
import './tasks.js';
import './reports.js';
import '../../../ui/pages/loading.html';
import '../../../ui/pages/not-found.html';