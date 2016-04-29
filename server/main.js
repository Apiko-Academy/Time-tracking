import { Meteor } from 'meteor/meteor';
import { Gravatar } from 'meteor/jparker:gravatar';

import '../imports/ui/components/add-roles-in-account.js';
import '../imports/api/users/server/methods.js';
import '../imports/api/users/server/publications.js';
import '../imports/lib/organisation.js';
import '../imports/api/organisation/server/methods.js';
import '../imports/api/organisation/server/publications.js';

function setGravatars() {
  let users = Meteor.users.find( { md5hash: { $exists: false } } );
  users.forEach( ( user ) => {
    Meteor.users.update( { _id: user._id }, {
      $set: { md5hash: Gravatar.hash( user.emails[0].address ) }
    });
  });
}

Meteor.startup( () => setGravatars() );