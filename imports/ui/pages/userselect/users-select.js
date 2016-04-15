import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import './users-select.html';
import './users-search.js';
import './users-list.js';


Template.Users_select.onCreated(function() {
  if (Meteor.isClient) {

    let userId = Meteor.userId();
    let idUsersInGroup = [];

    if (userId) {
      Meteor.call('getUsersInGroup', 'owner', ['owner', 'member'], function(error, result) {
        if (result) {

          for (let value of result.userInGroup) {
            idUsersInGroup.push(value._id);
          }

          Session.set('idUsersInGroup', idUsersInGroup);
          Session.set('organistaionsId', result.organistaionsId);
        } else {
          //throwError(error.reason);
          console.log('error');
        }
      });
    }
  }
});

Template.Users_select.helpers({
  onUserSelectHandler: function() {
    return function(selectedUserId) {
      console.log('selectedUserId : ', selectedUserId);
      
      let organistaionsId = Session.get('organistaionsId');
      Meteor.call('setUserInGroup', selectedUserId, 'member', organistaionsId, function(error, result) {
        if (result) {

          let idUsersInGroup = Session.get('idUsersInGroup');
          idUsersInGroup.push(selectedUserId);
          Session.set('idUsersInGroup', idUsersInGroup);

          console.log('added!');
        } else {
          console.log('error');
        }
      });
    }
  }
});
