import './my-organisations.html';
import '../../../lib/anti-toggl/anti-toggl.js';

import { Template } from 'meteor/templating';

Template.myOrganisations.helpers({
  isOwner: function(){
    return this.owners.indexOf(Meteor.userId()) !== -1;
  },
  getUsername: function(userId){
    return AntiToggl.users.getFullName(userId);
  },
  iconUrl: function(){
    return AntiToggl.organization.getIcon(this._id);
  }
});