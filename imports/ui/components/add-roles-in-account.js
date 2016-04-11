Accounts.onCreateUser(function(options, user) {
	console.log(options);

  if(!options || !user) {
      console.log('error creating user');
    return;
  }
  
  if (options.profile) {
  	options.profile.profileImage = '';
  	user.profile = options.profile;
  }

  return user;
});

Meteor.users.after.insert(function (userId, doc) {
  
  if (this._id) {
    Roles.addUsersToRoles(this._id, ['owner']);
  }

});