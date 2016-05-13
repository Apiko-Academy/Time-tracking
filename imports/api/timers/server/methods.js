import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { MongoId } from '/imports/modules/regex.js';
import { Timers } from '../../collections.js';

Meteor.methods({
  // create and start new timer for task
  "timers.start"(timerAttrs) {
    check(timerAttrs, {
      taskId: MongoId,
      userId: MongoId
    });

    const newTimer = _.extend(timerAttrs, {ticking: true, startedAt: new Date()});

    return Timers.insert(newTimer);
  },
  // stop timer by id
  "timers.stop"(timerId) {
    check(timerId, MongoId);

    const stopTime = new Date();
    const startedAt = Timers.findOne({_id: timerId}).startedAt;

    Timers.update({_id: timerId}, {$set: {ticking: false, elapsed: stopTime - startedAt}});
  },
  // stop all timers belonging to user
  "timers.stopAll"(userId) {
    check(userId, MongoId);

    const stopTime = new Date();
    const activeUserTimers = Timers.find({userId: userId, ticking: true});

    activeUserTimers.forEach((timer) => {
      Timers.update({_id: timer._id}, {$set: {ticking: false, elapsed: stopTime - timer.startedAt}});
    });
  }
});