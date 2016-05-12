import './user-organization.html';
import { Template } from 'meteor/templating';

Template.userOrganization.onRendered(function () {
	let options = {
		placement: 'bottom',
		title: this.data.name
	};
	this.$('.organization-icon').tooltip(options);
});
