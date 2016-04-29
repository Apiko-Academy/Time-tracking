import './my-organisations.html';

import { getOrganisationIcon } from '../../../modules/organisation.js';
import { getFullName } from '../../../modules/users.js';

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