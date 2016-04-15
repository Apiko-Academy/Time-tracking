Meteor.methods({
  organisationInsert: function(organisationAttributes) {

    check(organisationAttributes, {
      name: String,
      description: String
    });

    let organisationWithSameName = Organisation.findOne({ name: organisationAttributes.name });

    if (organisationWithSameName) {
      return organisationWithSameName._id;
    }

    let organisation = _.extend(organisationAttributes, {
      owners: [this.userId],
      createdAt: new Date()
    });

    let organisationId = Organisation.insert(organisation);

    if (organisationId) {
      Roles.setUserRoles(this.userId, ['owner'], organisationId);

      if (Roles.userIsInRole(this.userId, 'owner', 'general_group') && Roles.userIsInRole(this.userId, 'owner', organisationId)) {
        Roles.removeUsersFromRoles(this.userId, ['owner'], 'general_group');
      }
    }

    return organisationId;
  },

  getGroupsForUser: function(role) {
    return Roles.getGroupsForUser(this.userId, role);
  },

  getUsersInGroup: function(role, roles) {
    if (!this.userId) {
      return 'Need to sign in';
    }

    var userInGroup = null;
    var organistaionsId = null;

    Meteor.call('getGroupsForUser', role, function(error, result) {
      if (result) {
        organistaionsId = result[0];
        userInGroup = Roles.getUsersInRole(roles, organistaionsId).fetch();
      } else {
        console.log('error')
      }
    })

    return {
      organistaionsId: organistaionsId,
      userInGroup: userInGroup
    }
  },

  setUserInGroup: function(userId, role, organisationId) {
    Roles.setUserRoles(userId, role, organisationId);
    return true;
  }
});
