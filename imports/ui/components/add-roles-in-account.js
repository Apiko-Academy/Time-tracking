import '../../lib/anti-toggl.js';

Accounts.onCreateUser(function(options, user) {
	
  if(!options || !user) {
      console.log('error creating user');
    return;
  }
  
  if (options.profile) {
  	options.profile.avatar = AntiToggl.image.noImage;
  	user.profile = options.profile;
  }

  return user;
});

Meteor.users.after.insert(function (userId, doc) {
  
  if (this._id) {
    Roles.addUsersToRoles(this._id, ['owner'], 'general_group');
  }

});