import './users-list.html';
import '../organisation-settings.html';
import '../../../../../lib/organisation.js';
import { outputHandler } from '../../../../../modules/output-handler.js';
import { getFullName } from '../../../../../modules/users.js';
import { handleMethodResult } from '../../../../../modules/handle-method-result.js';

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';

Template.usersList.helpers({
  users(){
    //console.log(this)
  },
  getName(){
    return getFullName(this);
  }
})