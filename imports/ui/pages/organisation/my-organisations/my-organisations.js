import './my-organisations.html';
import '../organisation-settings/organisation-settings.html';

import { getOrganisationIcon } from '/imports/modules/organisation.js';
import { getFullName } from '/imports/modules/users.js';

Template.myOrganisations.helpers({
  isOwner: function(){
    return this.owners.indexOf(Meteor.userId()) !== -1;
  },
  getUsername: function(userId){
    return getFullName(userId);
  },
  iconUrl: function(){
    return getOrganisationIcon(this._id);
  }
});