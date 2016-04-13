import './loginButtons.html';

Template._loginButtonsAdditionalLoggedInDropdownActions.events({
  'click #login-buttons-profile-settings': function(event) {
    // Router.go('tasks');
  },
  'click #login-buttons-organisation-settings': function(event) {
    Router.go('organisation');
  }
});