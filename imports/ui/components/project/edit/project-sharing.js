import './project-sharing.html';
import '../../users-select/users-select.js';
import './users-add.js';
import '../../permissions-page/permissions.html';

import 'meteor/trsdln:modals';

import { getFullName, getProfileIcon, getUserEmail } from '../../../../modules/users.js';
import { handleMethodResult } from '../../../../modules/handle-method-result.js';
import { Meteor } from 'meteor/meteor';
import { ReactiveArray } from 'meteor/manuel:reactivearray';
import { Template } from 'meteor/templating';

Template.Project_sharing.helpers({
  projectMembers(){
    let project = Template.instance().data.project;
    return [...project.managers, ...project.workers];
  },
  fullName(){
  	return getFullName(this.toString());
  },
  email(){
  	return getUserEmail(this.toString());
  },
  icon(){
  	return getProfileIcon(this.toString());
  }
});

Template.Project_sharing.events({
  'click .worker-set': function (event, tmpl){
    event.preventDefault();
    Meteor.call('project.member.set', tmpl.data.project._id, event.target.id, handleMethodResult());
  },
  'click .manager-set': function(event, tmpl){
    event.preventDefault();
    Meteor.call('project.member.set', tmpl.data.project._id, event.target.id, 'manager', handleMethodResult());  
  },
  'click .remove-member': function(event, tmpl){
    event.preventDefault();
    Meteor.call('project.member.remove', tmpl.data.project._id, event.target.id, handleMethodResult());  
  }
});