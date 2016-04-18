import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './users-select.html';
import './users-list.js';
import '../../../lib/anti-toggl.js';

Template.Users_select.helpers({
  onSelectUser: function() {
    return this.onSelectUser;
  }
});
