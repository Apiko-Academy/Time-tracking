import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { MongoId } from '/imports/modules/regex.js';
import { Tasks } from '../../collections.js';

Meteor.methods({
  // create new task
  'tasks.create'(taskAttrs) {
    check(taskAttrs, {
      title: String,
      projectId: MongoId,
      active: Boolean,
      users: [MongoId]
    });

    return Tasks.insert(taskAttrs);
  },
  // add user to task by id
  'tasks.addUser'(taskId, userId) {
    check(taskId, MongoId);
    check(userId, MongoId);

    const userAlreadyAddedToTask = Tasks.find({_id: taskId, users: userId}).count() > 0;

    if (userAlreadyAddedToTask) {
      throw new Meteor.Error('This user is already assigned to task');
    }

    Tasks.update({_id: taskId}, {$addToSet: {users: userId}});
  }
});
