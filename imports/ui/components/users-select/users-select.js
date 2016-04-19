import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './users-select.html';
import './users-search.js';
import './users-list.js';
import '../../../lib/anti-toggl.js';

Template.Users_select.onCreated(function() {
  this.subscribe('all.users');
  Template.searchStr = new ReactiveVar(null);
});

Template.Users_select.helpers({
  users: function() {
    let searchStr = Template.searchStr.get();
    let query = { _id: { $ne: Meteor.userId() } };

    if (searchStr && searchStr.length >= 3 && _.isString(searchStr)) {
      
      query.$or = [
        { 'profile.firstName': { $regex: ".*" + _escapeRegExpStr(searchStr) + ".*", $options: "i" } },
        { 'profile.lastName': { $regex: ".*" + _escapeRegExpStr(searchStr) + ".*", $options: "i" } }
      ];

    }

    return Meteor.users.find(query);
  },
  onSelectUser: function() {
    return this.onSelectUser;
  }
});

let _escapeRegExpStr = str => str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
