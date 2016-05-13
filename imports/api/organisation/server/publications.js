import { Meteor } from 'meteor/meteor';
import { Organisations } from '../../collections.js';

import 'meteor/underscore';

Meteor.publish('all.users', function allUsers() {
  if (this.userId) {
    return Meteor.users.find();
  }
});

Meteor.publish('organisation', function() {
  let userId = this.userId;

  return Organisations.find({ members: userId });
});

Meteor.publishComposite('current.organisation', function(organisationId){
  return {
    find: function() {
      return Organisations.find({_id: organisationId});
    },
    children: [
      {
        find: function () {
          let usersArray = _.flatten(Organisations.find({_id: organisationId}).map(
              (item)=> {
                return _.union(item.members, item.owners);
              }));
          Meteor.users.find({_id: {$in: usersArray}});
        }
      }
    ]
  }
});