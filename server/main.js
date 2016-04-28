import { Meteor } from 'meteor/meteor';

import '../imports/ui/components/add-roles-in-account.js';

import '../imports/api/users/server/methods.js';
import '../imports/api/users/server/publications.js';

import Organisation from '../imports/api/organisation/organisation.js';
import '../imports/api/organisation/server/methods.js';
import '../imports/api/organisation/server/publications.js';

import Project from '../imports/api/project/project.js';
import '../imports/api/project/server/methods.js';
import '../imports/api/project/server/publications.js';

import Clients from '../imports/api/clients/clients.js';
import '../imports/api/clients/server/methods.js';
import '../imports/api/clients/server/publications.js';
Meteor.startup(() => {

});