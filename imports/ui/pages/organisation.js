import './organisation.html';

Template.organisation.helpers({
  rolename: function () {
    if ( antitoggl.isUserInRole('owner') ) {
      return 'owner';	
    }
  }	
});