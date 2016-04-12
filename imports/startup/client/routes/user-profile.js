import { Meteor } from 'meteor/meteor';

import '../../../ui/pages/user-profile.js';

Router.route('/userProfile', {
  name: 'userProfile',
  template: 'userProfile',
  data: Meteor.user()
});