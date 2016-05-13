import { Meteor } from 'meteor/meteor';
import { Tasks } from '../../collections.js';

Meteor.publish('tasks', function() {
  if(this.userId) {
    return Tasks.find({users: this.userId});
  } else {
    this.ready();
  }
});

