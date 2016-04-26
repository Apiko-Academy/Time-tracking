import './users-list.html';
import { getProfileIcon } from '../../../modules/users.js';
Template.Users_list.onCreated(function () {
  console.log(this);
});
Template.Users_list.events({
  'click li.list-group-item': function(event, tmpl) {
    tmpl.data.onSelectUser(tmpl.data.itemUser._id);
    let usersInGroups = tmpl.data.inOrganisation(tmpl.data.itemUser._id);
    if (usersInGroups) {
      tmpl.$('[value="' + tmpl.data.itemUser._id + '"]').css({'background':'green'});
    }
  }
});

Template.Users_list.helpers({
  src: function() {
    return getProfileIcon(this.itemUser._id);
  }
});
