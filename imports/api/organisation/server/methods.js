import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.methods({
  organisationInsert: function(organisationAttributes) {

    check(organisationAttributes, {
      name: String,
      description: String,
      profile: {
        companySite: Match.Maybe(String),
        iconUrl: Match.Maybe(String)
      }
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

  // getUsersInGroup: function(role, roles) {
  //   if (!this.userId) {
  //     return 'Need to sign in';
  //   }
    
  //   var organistaionsId = Roles.getGroupsForUser(this.userId, role);
  //   var userInGroup = Roles.getUsersInRole(roles, organistaionsId[0]).fetch();

  //   return {
  //     organistaionsId: organistaionsId[0],
  //     userInGroup: userInGroup
  //   }
  // },

  addUsersToRoles: function(userId, role, organisationId) {
    Roles.addUsersToRoles(userId, role, organisationId);
    return true;
  }
});
