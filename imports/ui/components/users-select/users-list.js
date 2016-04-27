import './users-list.html';
import { getProfileIcon } from '../../../modules/users.js';

Template.Users_list.events({
  'click li.list-group-item': function(event, tmpl) {
    tmpl.data.onSelectUser(tmpl.data.itemUser._id);
  }
});

Template.Users_list.helpers({
  src: function() {
    return getProfileIcon(this.itemUser._id);
  }
});
