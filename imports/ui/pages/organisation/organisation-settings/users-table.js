import './users-table.html';
import './organisation-settings.html';
import './modal.html';

import './organisation-settings.js';
import { getFullName } from '../../../../modules/users.js';


Template.usersTable.helpers({
  users() {
    return this.users;
  },
  getName () {
    return getFullName(this);
  },
  isUserInRoleOwner () {
    let tmpl = Template.instance();
    if (tmpl.data.organisationOwners.indexOf(this._id) > -1) {
      return true;
    }
  },
});