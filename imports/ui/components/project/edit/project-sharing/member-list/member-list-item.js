import './member-list-item.html';

import { getFullName, getProfileIcon, getUserEmail } from '../../../../../../modules/users.js';
import { handleMethodResult } from '../../../../../../modules/handle-method-result.js';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

Template.Member_list_item.helpers({
  fullName(userId){
  	return getFullName(userId);
  },
  email(userId){
  	return getUserEmail(userId);
  },
  icon(userId){
  	return getProfileIcon(userId);
  },
  isManager(){
    return this.role === 'manager';
  },
  unsetRole(){
    return this.role === 'manager' ? 'worker' : 'manager';
  }
});

Template.Member_list_item.events({
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