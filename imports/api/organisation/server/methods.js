import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { MongoId } from '/imports/modules/regex.js';
import { Organisations } from '/imports/api/collections.js';
import { Roles } from '/imports/modules/Roles.js';

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

    let organisationWithSameName = Organisations.findOne({ name: organisationAttributes.name });

    if (organisationWithSameName) {
      return organisationWithSameName._id;
    }

    let organisation = _.extend(organisationAttributes, {
      owners: [this.userId],
      createdAt: new Date()
    });

    return Organisations.insert(organisation);
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

    if (! Roles.userHasRole(this.userId, organisationData, "owners")) {
      throw new Meteor.Error("You don't have permissions to edit this organization");
    }

    if(organisationData.owners.length === 0){
      throw new Meteor.Error("You can not remove the last owner");
    }

    Organisations.update({_id: organisationData._id}, {$set: organisationData});
  }
});
