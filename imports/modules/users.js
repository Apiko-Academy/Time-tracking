let getFullName = (userId) => {
  let userItem = Meteor.users.findOne(userId);

  if(userItem){
    return userItem.profile.firstName + ' ' + userItem.profile.lastName;
  }
};
export { getFullName };