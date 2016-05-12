import '/imports/ui/components/users-select/users-select.js';
import './tasks.html';

Template.tasks.helpers({
  onUserSelectHandler: function() {
    return function(selectedUserId) {
      console.log('selectedUserId : ', selectedUserId);
    }
  }
});
