import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './users-select.html';
import './users-list.js';
import '../../../lib/anti-toggl.js';

Template.Users_select.onCreated(function () {
  this.subscribe('all.users');
});

Template.Users_select.helpers({
	users: function() {
    return Meteor.users.find({_id: {$ne: Meteor.userId()}});
  },
  onSelectUser: function() {
  	return this.onSelectUser;
  }
});
