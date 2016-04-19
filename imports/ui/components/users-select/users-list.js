import './users-list.html';

Template.Users_list.events({
  'click li.list-group-item': function(event, tmpl) {
    tmpl.data.onSelectUser(tmpl.data.itemUser._id);
  }
});

Template.Users_list.helpers({
  src: function() {
    return AntiToggl.profileImage.getIcon(this.itemUser._id);
  }
});
