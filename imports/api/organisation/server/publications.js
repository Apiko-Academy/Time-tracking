import { Meteor } from 'meteor/meteor';

import { Organisation } from'../organisation.js';

Meteor.publish('all.users', function allUsers() {
  if (this.userId) {
    return Meteor.users.find();
  }
});

Meteor.publish('organisation', function() {
  let userId = this.userId;

  return Organisation.find({ members: userId });
});

Meteor.publishComposite('current.organisation', function(organisationId){
  return {
    find: function() {
      return Organisation.find({_id: organisationId});
    },
    children: [
      {
        find: function () {
          let usersArray = _.flatten(Organisation.find({_id: organisationId}).map(
              (item)=> {
                return _.union(item.members, item.owners);
              }));
          Meteor.users.find({_id: {$in: usersArray}});
        }
      }
    ]
  }
});