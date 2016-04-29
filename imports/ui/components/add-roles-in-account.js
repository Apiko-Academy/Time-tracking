import { outputHandler } from '../../modules/output-handler.js';
import { noImage } from '../../modules/images.js';
import { Gravatar } from 'meteor/jparker:gravatar';

Accounts.onCreateUser((options, user) => {
	
  if(!options || !user) {
    outputHandler('error creating user');
    return;
  }

  if (options.profile) {
  	options.profile.profileImage = noImage;
  	user.profile = options.profile;
  }

  return user;
});

Meteor.users.after.insert(function (userId, doc) {
  
  if (this._id) {
    Roles.addUsersToRoles(this._id, ['owner'], 'general_group');
  }

});