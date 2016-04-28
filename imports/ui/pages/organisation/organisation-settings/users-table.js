import './modal.html';

import './user.js'
import './organisation-settings.js';

Template.usersTable.helpers({
  organisationUsers () {
    let tmpl = Template.instance();
    console.log(tmpl)
    return tmpl.data.organisationUsers;
  },
  organisationOwners () {
    let tmpl = Template.instance();
    return tmpl.data.organisationOwners;
  }
});