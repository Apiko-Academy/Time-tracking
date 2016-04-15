Meteor.publish('users.in.group', function usersInGroup(users) {
  return Meteor.users.find({ _id: { $nin: users } }, {
    fields: {
      profile: 1,
      emails: 1
    }
  });
});