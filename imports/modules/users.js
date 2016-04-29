let getFullName = (userId) => {
  let userItem = Meteor.users.findOne(userId);

  if(userItem){
    return userItem.profile.firstName + ' ' + userItem.profile.lastName;
  }
};
let getProfileIcon = (profileId) => {
  let user = Meteor.users.findOne({_id: profileId});

  if (user && user.profile.profileImage) {
    return user.profile.profileImage;
  } else {
    return "/default-user.png";
  }
};
let useGravatar = (email, userId) => {
  let options = {
    size: 50
  };
  let imageUrl = Gravatar.imageUrl(email, options);
  Meteor.users.update({_id: userId}, {$set: {'profile.profileImage': imageUrl}});
};
export { getFullName, getProfileIcon, useGravatar };