import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Projects } from '../../collections.js';

Meteor.methods({
  'project.create': function(projectAttributes) {
    check(projectAttributes, {
      name: String,
      clientId: String,
      color: String,
      public: Boolean
    });

    let project = Projects.findOne({name: projectAttributes.name, managers: this.userId});

    if(!project && this.userId){
      projectAttributes = _.extend(projectAttributes, {
        createdAt: new Date(),
        managers: [this.userId],
        workers: []
      });

      return Projects.insert(projectAttributes);
    } else if(project){
      throw new Meteor.Error('Project is already exists');
    }
  },
  'project.member.set': function(projectId, userId, role = 'worker'){
    check(projectId, String);
    check(userId, String);
    check(role, String);
   
    let project = Projects.findOne({_id: projectId, managers: this.userId});

    if(!project){
      throw new Meteor.Error('Access denied');
    }

    let query = {};

    if(role === 'worker'){

      if(project.managers.length === 1 && project.managers.indexOf(userId) > -1){
        throw new Meteor.Error('You can not remove the last manager');
      }
      _.extend(query, {$pull: {managers: userId}, $addToSet: {workers: userId}});
    } else if(role === 'manager'){
      _.extend(query, {$addToSet: {managers: userId}, $pull: {workers: userId}});
    }
    
    return Projects.update({_id: projectId}, query);
  },
  'project.member.remove': function(projectId, userId){
    check(projectId, String);
    check(userId, String);

    let project = Projects.findOne({_id: projectId, managers: this.userId});

    if(!project){
      throw new Meteor.Error('Access denied');
    }
    
    if(project.managers.length === 1 && project.managers.indexOf(userId) > -1){
        throw new Meteor.Error('You can not remove the last manager');
    }

    return Projects.update({_id: projectId}, {$pull: {workers: userId, managers: userId}});
  }
});