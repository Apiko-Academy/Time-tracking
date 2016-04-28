import './modal.html';

import './organisation-settings.js';
import { getFullName } from '../../../../modules/users.js';


Template.usersTable.helpers({
  getName () {
    return getFullName(this);
  },
  isUserInRoleOwner () {
    let tmpl = Template.instance();
    return tmpl.data.organisationOwners.indexOf(this._id) > -1;
  },
});