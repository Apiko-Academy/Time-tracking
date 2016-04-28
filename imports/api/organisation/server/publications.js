import { Meteor } from 'meteor/meteor';
import '../../../lib/organisation.js';

Meteor.publish('all.users', function allUsers() {
  if (this.userId) {
    return Meteor.users.find();
  }
});

Meteor.publish('organisation', function() {
  let userId = this.userId;
  let organizationIds = Roles.getGroupsForUser(userId);

  return Organisation.find({ _id: { $in: organizationIds } });
});

Meteor.publishComposite('current.organisation', {
  find: (organisationId) => {
    return Organisation.find({_id: organisationId});
  },
  children: [{
    find: (organisation) => {
      let users = _.flatten(organisation.map((item) => _.union(item.users, item.owners)));
      Meteor.users.find({ _id: {$in: users} });
    }
  }]
});