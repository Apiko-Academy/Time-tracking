import './modal.html';

import './user.js'
import './organisation-settings.js';

Template.usersTable.helpers({
  organisationUsers () {
    let tmpl = Template.instance();
    return tmpl.data.organisationUsers;
  },
  organisationOwners () {
    let tmpl = Template.instance();
    return tmpl.data.organisationOwners;
  },
  changeOrganisationUsers() {
    let tmpl = Template.instance();
    return tmpl.data.changeOrganisationUsers;
  },
  usersRolesInOrganisation () {
    let tmpl = Template.instance();
    return tmpl.data.usersRolesInOrganisation;
  }
});