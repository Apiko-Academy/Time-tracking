import '../my-organisations.html';
import './organisation-settings.html';
import '../../../../lib/organisation.js';

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import 'meteor/mongo';

Template.organisationSettings.helpers({
  users(){
    console.log(Meteor.users.find().fetch())
  }
});