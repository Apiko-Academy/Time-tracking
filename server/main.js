import { Meteor } from 'meteor/meteor';

import '../imports/ui/components/add-roles-in-account.js';
import '../imports/api/users/server/methods.js';
import '../imports/lib/organisation.js';
import '../imports/api/organisation/server/methods.js';
import '../imports/api/organisation/server/publications.js';

Meteor.startup(() => {

});


AntiSearchSource.allow('Meteor.users', {
  maxLimit: 10,
  securityCheck(userId, configs) {
    return !!userId;
  },
  allowedFields: ['profile']
});
