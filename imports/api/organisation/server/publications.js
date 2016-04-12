if (Meteor.isServer) {
  Meteor.publish('organisations', function() {
    return Organisation.find();
  });
}