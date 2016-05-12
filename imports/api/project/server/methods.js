import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Project } from '../project.js';

Meteor.methods({
  'project.create': function(projectAttributes) {
    check(projectAttributes, {
      name: String,
      clientId: String,
      color: String,
      public: Boolean
    });

    let project = Project.findOne({name: projectAttributes.name, managers: this.userId});

    if(!project && this.userId){
      projectAttributes = _.extend(projectAttributes, {
        createdAt: new Date(),
        managers: [this.userId],
        workers: []
      });

      return Project.insert(projectAttributes);
    } else if(project){
      throw new Meteor.Error('Project is already exists');
    }
  },
  'project.member.set': function(projectId, userId, role = 'worker'){
    check(projectId, String);
    check(userId, String);
    check(role, String);
   
    let query = {};

    if(role === 'worker'){
      _.extend(query, {$pull: {managers: userId}, $addToSet: {workers: userId}});
    } else if(role === 'manager'){
      _.extend(query, {$addToSet: {managers: userId}, $pull: {workers: userId}});
    }

    let project = Project.findOne({_id: projectId, managers: this.userId});

    if(project){
      return Project.update({_id: projectId}, query);
    } else {
      throw new Meteor.Error('Access denied');
    }
  },
  'project.member.remove': function(projectId, userId){
    check(projectId, String);
    check(userId, String);

    if(Project.find({_id: projectId, managers: this.userId})){
      return Project.update({_id: projectId}, {$pull: {workers: userId, managers: userId}});
    } else {
      throw new Meteor.Error('Access denied');
    }
  }
});