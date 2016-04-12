import { Meteor } from 'meteor/meteor';
import '../../../ui/pages/organisation/organisation.js';

Router.route('/organisation', {
  name: 'organisation',
  template: 'organisation',
  waitOn: function() {
    return Meteor.subscribe('organisations');
  },
  data: function() {
  	return {
        organisation: Organisation.find().fetch()
    }
  }

});