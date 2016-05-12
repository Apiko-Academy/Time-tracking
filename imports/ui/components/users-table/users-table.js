import '../add-user-modal/modal.html';

import '../user/user.js'
import '/imports/ui/pages/organisation/organisation-settings/organisation-settings.js';

Template.usersTable.helpers({
  organisationMembers () {
    let tmpl = Template.instance();
    return tmpl.data.organisationMembers;
  },
  organisationOwners () {
    let tmpl = Template.instance();
    return tmpl.data.organisationOwners;
  },
  changeOrganisationMembers() {
    let tmpl = Template.instance();
    return tmpl.data.changeOrganisationMembers;
  },
  toggleOwner () {
    return Template.instance().data.toggleOwner;
  }
});