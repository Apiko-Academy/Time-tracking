import '../../../lib/organisation.js';

import { Meteor } from 'meteor/meteor';

Meteor.publish('organisation', function () {
  return Organisation.find();
});