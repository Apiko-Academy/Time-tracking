import { Meteor } from 'meteor/meteor';
import { Projects } from '../../collections.js';

Meteor.publish('projects', function () {
  let userId = this.userId;
  if (userId) {
    return Projects.find({$or: [{managers: userId}, {workers: userId}]});
  } else {
  	this.ready();
  }
});

Meteor.publish('current.project', function(projectId){
  let userId = this.userId;
  if(userId){
    return Projects.find({_id: projectId, managers: userId});
  } else {
    this.ready();
  }
});