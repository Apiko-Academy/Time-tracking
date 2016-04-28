import './modal.js';
import './user.html';

import { getFullName } from '../../../../modules/users.js';

Template.userInOrganisation.onCreated(function () {
  console.log(Template.currentData())
})

Template.userInOrganisation.helpers({
  getName () {
    return getFullName(this);
  },
  isUserInRoleOwner () {
    let tmpl = Template.instance();
    return tmpl.data.organisationOwners.indexOf(this._id) > -1;
  }
})

Template.userInOrganisation.events({
  'click .remove-from-organisation-users': function(event, tmpl){
    event.preventDefault();
    tmpl.addOrRemoveUserFromOrganisation(tmpl.data._id, 'remove');
  },
  'click .add-user-to-owners': function(event, tmpl) {
    event.preventDefault();
    tmpl.usersRolesInOrganisation(event.target.value, 'add-user-to-owners');
  },
  'click .remove-user-from-owners': function(event, tmpl) {
    event.preventDefault();
    tmpl.usersRolesInOrganisation(event.target, 'remove-user-from-owners');
  }
});
