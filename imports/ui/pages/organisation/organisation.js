import './organisation.html';
import './create-organisation.js';
import './list-organisation.html';

Template.organisation.helpers({
  rolename: function () {
    if ( antitoggl.isUserInRole('owner') ) {
      return 'owner';	
    }
  }	
});