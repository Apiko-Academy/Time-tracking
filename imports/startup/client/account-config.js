import { Template } from 'meteor/templating';

//AccountsTemplates.configure({
//  defaultLayout: 'layout'
//});

AccountsTemplates.addField({
  _id: 'firstname',
  type: 'text',
  displayName: 'First Name',
  required: true,
  minLength: 3,
  errStr: 'error.minChar',
  trim: true
});

AccountsTemplates.addField({
  _id: 'lastname',
  type: 'text',
  displayName: 'Last Name',
  required: true,
  minLength: 3,
  errStr: 'error.minChar',
  trim: true
});