import { Template } from 'meteor/templating';

AccountsTemplates.configure({
  // Behavior
  confirmPassword: true,
  enablePasswordChange: true,
  forbidClientAccountCreation: false,
  overrideLoginErrors: true,
  sendVerificationEmail: false,
  lowercaseUsername: false,
  focusFirstInput: true,

  // Appearance
  showAddRemoveServices: false,
  showForgotPasswordLink: true,
  showLabels: true,
  showPlaceholders: true,
  showResendVerificationEmailLink: false,

  // Client-side Validation
  continuousValidation: false,
  negativeFeedback: false,
  negativeValidation: true,
  positiveValidation: true,
  positiveFeedback: true,
  showValidating: true,

  // Privacy Policy and Terms of Use
  privacyUrl: 'privacy',
  termsUrl: 'terms-of-use',

  // Redirects
  homeRoutePath: '/home',
  redirectTimeout: 4000,

  // Texts
  texts: {
    button: {
      signUp: "Register Now!"
    },
    socialSignUp: "Register",
    socialIcons: {
      "meteor-developer": "fa fa-rocket"
    },
    title: {
      forgotPwd: "Recover Your Password"
    },
  },
});

AccountsTemplates.configureRoute('signIn', {
  name: 'signIn',
  path: '/signin',
  layoutTemplate: 'mainLayout',
  redirect: '/'
});

AccountsTemplates.configureRoute('signUp', {
  name: 'signUp',
  path: '/signup',
  layoutTemplate: 'mainLayout',
  redirect: '/'
});

AccountsTemplates.configureRoute('forgotPwd', {
  name: 'forgotPwd',
  path: '/forgot-password',
  layoutTemplate: 'mainLayout',
  redirect: '/'
});

AccountsTemplates.configureRoute('changePwd', {
  name: 'changePwd',
  path: '/change-password',
  layoutTemplate: 'mainLayout',
  redirect: '/'
});

AccountsTemplates.addField({
  _id: 'firstName',
  type: 'text',
  displayName: 'First Name',
  required: true,
  minLength: 3,
  errStr: 'error.minChar',
  trim: true
});

AccountsTemplates.addField({
  _id: 'lastName',
  type: 'text',
  displayName: 'Last Name',
  required: true,
  minLength: 3,
  errStr: 'error.minChar',
  trim: true
});