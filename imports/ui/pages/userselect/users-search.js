import { Meteor } from 'meteor/meteor';
import './users-search.html';


if (Meteor.isClient) {
  Template.Users_search.onCreated(function() {
    this.searchSource = this.AntiSearchSource({
      collection: 'Meteor.users',
      searchMode: 'global',
      fields: ['profile'],
      mongoQuery: {},
      limit: 10
    });
  });

  Template.Users_search.helpers({
    searchResult: function() {
      return Template.instance().searchSource.searchResult();
    }
  });

  Template.Users_search.events({
    'keyup input': _.throttle(function(event, tmpl) {
    	tmpl.searchSource.search($('input').val())
    }, 1500)
  });
}
