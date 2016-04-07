Accounts.ui.config({

  requestPermissions: {},
  // passwordSignupFields: 'USERNAME_AND_EMAIL',
  extraSignupFields: [{
    fieldName: 'firstName',
    fieldLabel: 'First name',
    inputType: 'text',
    visible: true,
    validate: function(value, errorFunction) {
      if (!value.trim()) {
        errorFunction("Please write your first name");
        return false;
      } else {
        return true;
      }
    }
  }, {
    fieldName: 'lastName',
    fieldLabel: 'Last name',
    inputType: 'text',
    visible: true,
    validate: function(value, errorFunction) {
      if (!value.trim()) {
        errorFunction("Please write your last name");
        return false;
      } else {
        return true;
      }
    }
  }]
});