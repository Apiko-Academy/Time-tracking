import { Meteor } from 'meteor/meteor';
import '../../../ui/pages/organisation.js';

Router.route('/organisation', {
  name: 'organisation',
  template: 'organisation'
});