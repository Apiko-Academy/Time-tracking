import { Meteor } from 'meteor/meteor';

import '../../../ui/pages/user-profile.js';

Router.route('/userProfile', {
  name: 'userProfile',
  template: 'userProfile',
  data: function () {
  	return Meteor.user();
  }
});