import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { MongoId } from '../../../modules/regex.js';
import { Organisation } from '../../organisation/organisation.js';

Meteor.methods({
  organisationInsert: function(organisationAttributes) {

    check(organisationAttributes, {
      name: String,
      description: String,
      profile: {
        companySite: Match.Maybe(String),
        iconUrl: Match.Maybe(String)
      },
      members: [MongoId]
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

  editOrganisation: function (organisationData) {
    check(organisationData, {
      _id: MongoId,
      description: String,
      name: String,
      profile: {
        companySite: Match.Optional(String),
        iconUrl: String
      },
      members: [MongoId],
      owners: [MongoId]
    });

    if(!Roles.userIsInRole(this.userId, 'owner', organisationData._id)){ 
      throw new Meteor.Error('You dont have permissions to edit this organisation'); 
    }

    _.each(organisationData.owners, function(organisationOwner) {
      Roles.setUserRoles(organisationOwner, ['owner'], organisationData._id);
      if (Roles.userIsInRole(organisationOwner, 'owner', 'general_group') && Roles.userIsInRole(organisationOwner, 'owner', organisationData._id)) {
        Roles.removeUsersFromRoles(organisationOwner, ['owner'], 'general_group');
      }
    });
    Organisation.update({_id: organisationData._id}, {$set: organisationData});
  },
  addUsersToRoles: function(userId, role, organisationId) {
    if(!Roles.userIsInRole(this.userId, 'owner', organisationData._id)){ 
      throw new Meteor.Error('You dont have permissions to edit this organisation'); 
    }
    Roles.addUsersToRoles(userId, role, organisationId);
    return true;
  }
});
