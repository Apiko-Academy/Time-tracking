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
  regex: {
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  }
});