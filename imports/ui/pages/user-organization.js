import './user-organization.html';
import { Template } from 'meteor/templating';

Template.userOrganization.onRendered(function () {
	this.$('[data-toggle="tooltip"]').tooltip();
});
