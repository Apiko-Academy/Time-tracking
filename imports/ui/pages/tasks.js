import '../components/users-select/users-select.js';
import './tasks.html';

Template.tasks.helpers({
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
