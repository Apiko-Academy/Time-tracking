import { Meteor } from 'meteor/meteor';
import '../../../ui/pages/organisation.html';
import '../../../ui/pages/role.html';

Router.route('/organisation', {
  name: 'organisation',
  template: 'organisation'
});