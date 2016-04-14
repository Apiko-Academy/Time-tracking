import { Meteor } from 'meteor/meteor';

import { Mongo } from 'meteor/mongo';

import { check } from 'meteor/check';

Meteor.methods({
  'users.update'(userId, options) {
    check(userId, String);
    check(options, Object);

    const user = Meteor.users.findOne(userId);

    if (user._id !== Meteor.userId()) {
      throw new Meteor.Error('wrong-user');
    }

    Meteor.users.update(userId, { $set: options });
  },
});