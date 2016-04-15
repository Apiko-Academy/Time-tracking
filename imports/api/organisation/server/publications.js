import '../../../lib/organisation.js';

import { Meteor } from 'meteor/meteor';

Meteor.publish('organisation', function () {
  let userId = this.userId;
  let organizationIds = Roles.getGroupsForUser(userId);

  return Organisation.find({ _id: { $in: organizationIds } });
});