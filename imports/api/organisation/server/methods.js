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

      if( Roles.userIsInRole(this.userId, 'owner', 'general_group') && Roles.userIsInRole(this.userId, 'owner', organisationId) ) {
        Roles.removeUsersFromRoles(this.userId, ['owner'], 'general_group');
      }
    }

    return organisationId;
  }

});