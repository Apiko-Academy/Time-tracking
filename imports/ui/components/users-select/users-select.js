import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './users-select.html';
import './users-search.js';
import './users-list.js';

Template.Users_select.onCreated(function() {
  this.subscribe('all.users');
  this.searchStr = new ReactiveVar(null);
});

Template.Users_select.helpers({
  users: function() {
    let searchStr = Template.instance().searchStr.get();
    let query = { _id: { $ne: Meteor.userId() } };

    if (searchStr && _.isString(searchStr)) {
      let searchRegExp = new RegExp(searchStr, 'i');

      query.$or = [
        { 'profile.firstName': searchRegExp },
        { 'profile.lastName': searchRegExp }
      ];
    }

    return Meteor.users.find(query);
  },
  onSelectUser: function() {
    return this.onSelectUser;
  },
  setSearchStr: function() {
    let template = Template.instance();
    return function(str) {
      template.searchStr.set(str);
    }
  },
  inOrganisation: function() {
    return this.inOrganisation;
  }
});
