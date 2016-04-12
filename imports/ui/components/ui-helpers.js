Namespace('antitoggl', {
isUserInRole: function(role = 'owner', userId = Meteor.userId(), group = null) {

      if (typeof userId === "object") {
        userId = Meteor.userId();
      }

      if (typeof group === "string") {
        return Roles.userIsInRole(userId, role, group);
      } else {
        return Roles.userIsInRole(userId, role);
      }
  },

  resetForm: function(event) {
    event.target.reset();
  }

});