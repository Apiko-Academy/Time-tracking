import { Meteor } from 'meteor/meteor';

import '../imports/ui/components/add-roles-in-account.js';

import '../imports/api/users/server/methods.js';
import '../imports/api/users/server/publications.js';

import '../imports/lib/organisation.js';
import '../imports/api/organisation/server/methods.js';
import '../imports/api/organisation/server/publications.js';

import '../imports/lib/project.js';
import '../imports/api/project/server/methods.js';
import '../imports/api/project/server/publications.js';

import '../imports/lib/clients.js';
import '../imports/api/clients/server/methods.js';
import '../imports/api/clients/server/publications.js';
Meteor.startup(() => {

});