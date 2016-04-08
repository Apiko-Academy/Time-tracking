import '../../../ui/pages/organisation.html';
import { Meteor } from 'meteor/meteor';

Router.route('/organisation', {
  name: 'organisation',
  template: 'organisation',

		waitOn: function() {
			return Meteor.subscribe('userData');
		},
		data: function() { 
			return {
				//groups: Groups.find().fetch() 
			}
		}
});

Template.organisation.helpers({
  roles() {
      return 'owner';
  },
  isInRole(role) {
    let id = Meteor.userId();

    console.log(Roles.userIsInRole(id, role));

    return Roles.userIsInRole(id, role);
  }
})
