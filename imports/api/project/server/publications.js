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

Meteor.publish('current.project', function(projectId){
  let userId = this.userId;
  if(userId){
    return Project.find({_id: projectId, managers: userId});
  } else {
    this.ready();
  }
});