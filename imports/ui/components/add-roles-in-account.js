import { outputHandler } from '../../modules/output-handler.js';
import { noImage } from '../../modules/images.js';

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
