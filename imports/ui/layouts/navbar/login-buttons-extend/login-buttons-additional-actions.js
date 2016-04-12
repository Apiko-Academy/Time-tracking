import { Template } from 'meteor/templating';

import './login-buttons-additional-actions.html';

Template._loginButtonsLoggedInDropdown.events({
  'click #user-profile': function(event) {
    Router.go('userProfile');
  }
});