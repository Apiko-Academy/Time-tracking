import './modal.js';
import './user.html';

import { getFullName } from '../../../../modules/users.js';

Template.userInOrganisation.onCreated(function () {
  console.log(this)
})

Template.userInOrganisation.helpers({
  getName () {
    return getFullName(this);
  },
  isUserInRoleOwner () {
    let tmpl = Template.instance();
    //return tmpl.data.organisationOwners.indexOf(this._id) > -1;
  }
})
