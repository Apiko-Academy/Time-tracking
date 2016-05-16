import './navbar.html';

import '../topmenu/topmenu.js';
import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';

Template.navbar.events({
	'click .sign-out': function() {
		Meteor.logout();
	},
	'click .sign-in': function() {
		Router.go('signIn');
	},
	'click .sign-up': function() {
		Router.go('signUp');
	},
	'click .forgot-password': function() {
		Router.go('forgotPassword');
	}
});