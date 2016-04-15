import './users-list.html';

Template.Users_list.events({
  'click li.list-group-item': function(event, tmpl) {
    tmpl.data.onSelectUser(tmpl.data.itemUser._id);
  }
});

Template.Users_list.helpers({
  user_profile_picture: function() {
    if (this.itemUser.profile && this.itemUser.profile.profileImage) {
      return user.profile.profileImage;
    } else {
      return "";
    }
  }
});
