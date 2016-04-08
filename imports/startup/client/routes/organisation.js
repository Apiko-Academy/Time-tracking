import '../../../ui/pages/organisation.html';

Router.route('/organisation', {
  name: 'organisation',
  template: 'organisation'
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
