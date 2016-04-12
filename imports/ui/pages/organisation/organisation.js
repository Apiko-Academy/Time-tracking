import './organisation.html';
import './create-organisation.js';
import './list-organisation.html';

Template.organisation.helpers({
  isOwner: function () {
    return antitoggl.isUserInRole('owner');	
  }	
});