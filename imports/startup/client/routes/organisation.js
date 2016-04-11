import { Meteor } from 'meteor/meteor';
import '../../../ui/pages/organisation.html';

Router.route('/organisation', {
  name: 'organisation',
  template: 'organisation'
});