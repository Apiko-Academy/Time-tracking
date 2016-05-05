import './user-organization.html';
import { Template } from 'meteor/templating';

Template.userOrganization.onRendered(function () {
	this.options = {
		placement: 'bottom',
		title: this.data.name
	};
	this.$('.organization-icon').tooltip(this.options);
});
