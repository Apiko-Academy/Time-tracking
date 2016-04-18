import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var'
import './users-select.html';
import './users-search.js';
import './users-list.js';


Template.Users_select.helpers({
  onUserSelectHandler: function() {
  	return function(selectedUserId) {
      console.log('selectedUserId : ', selectedUserId);
     
      // Meteor.call('addUsersToRoles', selectedUserId, 'member', _organistaionsId, function(error, result) {
      //   if (result) {

      //     let _idUsersInGroup = idUsersInGroup.get();
      //     _idUsersInGroup.push(selectedUserId);
      //     idUsersInGroup.set(_idUsersInGroup);

      //   } else {
      //     console.log('error');
      //   }
      // });
    }
  }
});
