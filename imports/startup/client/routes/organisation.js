import { Meteor } from 'meteor/meteor';
import '../../../ui/pages/organisation/organisation.js';

Router.route('/organisation', {
  name: 'organisation',
  template: 'organisation'
});