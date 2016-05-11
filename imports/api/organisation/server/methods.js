import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { MongoId } from '../../../modules/regex.js';
import { Organisation } from '../../organisation/organisation.js';

import { userHasRole } from '../../../modules/checkRole.js';

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

    if (! userHasRole(this.userId, Organisation.findOne(organisationData._id), "owners")) {
      throw new Meteor.Error("You don't have permissions to edit this organization");
    }

    Organisation.update({_id: organisationData._id}, {$set: organisationData});
  }
});
