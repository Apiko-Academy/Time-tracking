import './my-organisations.html';
import '../../../lib/anti-toggl.js';

import { Template } from 'meteor/templating';

Template.myOrganisations.helpers({
  isOwner: function(){
    return this.owners.indexOf(Meteor.userId()) !== -1 || false;
  },
  getUsername: function(userId){
  	let userProfile = Meteor.users.findOne(userId).profile;
    return userProfile.firstName + ' ' + userProfile.lastName;
  },
  iconUrl: function () {
    let noImage = AntiToggl.image.noImage;

    return AntiToggl.organization.getIcon(this._id) || noImage;
  }
});