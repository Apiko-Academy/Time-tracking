import { Template } from 'meteor/templating';

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