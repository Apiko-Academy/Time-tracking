Accounts.onCreateUser(function(options, user) {
  
  // if (options.roles.length > 0) {
  //   Roles.addUsersToRoles(user._id, options.roles);
  // }

  Roles.addUsersToRoles(user._id, 'owner');
  
  return user;
});
		

// Accounts.validateNewUser(function (user) {
//   var loggedInUser = Meteor.user();

//   if (Roles.userIsInRole(loggedInUser, ['owner'])) {
//     // NOTE: This example assumes the user is not using groups.
//     return true;
//   }

//   throw new Meteor.Error(403, "Not authorized to create new users");
// });