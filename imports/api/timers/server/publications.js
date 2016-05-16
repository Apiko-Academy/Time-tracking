import { Meteor } from 'meteor/meteor';
import { Timers } from '../../collections.js';

Meteor.publish("timers", function() {
  if(this.userId) {
    return Timers.find({userId: this.userId});
  } else {
    this.ready();
  }
});
