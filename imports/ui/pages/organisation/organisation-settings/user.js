import './modal.js';
import './user.html';

import { getFullName } from '../../../../modules/users.js';
import { getProfileIcon } from '../../../../modules/users.js';

Template.userInOrganisation.helpers({
  getName () {
    return getFullName(this.user._id);
  },
  isUserInRoleOwner () {
    return this.organisationOwners.indexOf(this.user._id) > -1;
  },
  profileImage () {
    return getProfileIcon(this.user._id);
  }
})

Template.userInOrganisation.events({
  'click .remove-from-organisation-users': function(event){
    event.preventDefault();
    this.changeOrganisationMembers(this.user._id, 'remove');
  },
  'click .add-user-to-owners': function(event) {
    event.preventDefault();
    this.usersRolesInOrganisation(this.user._id, 'add-user-to-owners');
  },
  'click .remove-user-from-owners': function(event) {
    event.preventDefault();
    this.usersRolesInOrganisation(this.user._id, 'remove-user-from-owners');
  }
});
