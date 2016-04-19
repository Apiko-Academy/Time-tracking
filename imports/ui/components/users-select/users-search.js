import './users-search.html';

Template.Users_search.events({
  'keyup input': function(event, tmpl) {
    tmpl.data.setSearchStr($('input').val());
  }
});