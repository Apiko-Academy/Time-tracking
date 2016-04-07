Accounts.ui.config({

  requestPermissions: {},
  // passwordSignupFields: 'USERNAME_AND_EMAIL',
  extraSignupFields: [{
    fieldName: 'first-name',
    fieldLabel: 'First name',
    inputType: 'text',
    visible: true,
    validate: function(value, errorFunction) {
      value.trim();
      if (!value) {
        errorFunction("Please write your first name");
        return false;
      } else {
        return true;
      }
    }
  }, {
    fieldName: 'last-name',
    fieldLabel: 'Last name',
    inputType: 'text',
    visible: true,
  }, {
    fieldName: 'terms',
    fieldLabel: 'I accept the terms and conditions',
    inputType: 'checkbox',
    visible: true,
    saveToProfile: false,
    validate: function(value, errorFunction) {
      value.trim();
      if (value) {
        return true;
      } else {
        errorFunction('You must accept the terms and conditions.');
        return false;
      }
    }
  }]
});