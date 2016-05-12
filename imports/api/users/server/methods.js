import {MongoId} from '/imports/modules/regex.js';

import { Meteor } from 'meteor/meteor';

import { Mongo } from 'meteor/mongo';

import { check } from 'meteor/check';

Meteor.methods({
  'users.update'(userId, options) {
    check(userId, MongoId);
    check(options, Object);

    const user = Meteor.users.findOne(userId);

    if (user._id !== Meteor.userId()) {
      throw new Meteor.Error('wrong-user');
    }

    Meteor.users.update(userId, { $set: options });
  },
  'user.image.update' (userId, iconUrl) {
    check(userId, MongoId);
    check(iconUrl, String);
    Meteor.users.update({_id: userId}, {$set: {'profile.profileImage': iconUrl}});
  }
});