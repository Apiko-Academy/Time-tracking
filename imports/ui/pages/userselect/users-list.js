import './users-list.html';
import '../../../lib/anti-toggl.js';

Template.Users_list.events({
  'click li.list-group-item': function(event, tmpl) {
    tmpl.data.onSelectUser(tmpl.data.itemUser._id);
  }
});

Template.Users_list.helpers({
  src: function() {
    return AntiToggl.user.getIcon(this.itemUser._id);
  },
  currentUserId: function() {
    return this.itemUser._id !== Meteor.userId();
  }
});