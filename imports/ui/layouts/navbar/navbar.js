import './navbar.html';

import '../topmenu/topmenu.js';
import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';
import { getFullName, getProfileIcon } from '/imports/modules/users.js';

Template.navbar.helpers({
	userFullName: function() {
		return getFullName(Meteor.userId());
	},
	userAvatar: function() {
		return getProfileIcon(Meteor.userId());
	}
});

Template.navbar.events({
	'click .sign-out': function() {
		Meteor.logout();
	}
});