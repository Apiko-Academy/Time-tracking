import './users-search.html';

Template.Users_search.events({
  'keyup input': function(event, tmpl) {
    Template.searchStr.set($('input').val());
  }
});