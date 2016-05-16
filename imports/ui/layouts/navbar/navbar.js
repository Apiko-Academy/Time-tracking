import './loginButtons.html';
import './navbar.html';

import '../topmenu/topmenu.js';
import { Template } from 'meteor/templating';

Template.navbar.events({
	'click .sign-out': function() {
		Meteor.logout();
	}
});