import { Meteor } from 'meteor/meteor';
import { Project } from'../project.js';

Meteor.publish('projects', function () {
  let userId = this.userId;
  if (userId) {
    return Project.find({$or: [{managers: userId}, {workers: userId}]});
  } else {
  	this.ready();
  }
});