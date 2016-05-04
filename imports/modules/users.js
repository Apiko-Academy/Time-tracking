import { MongoId } from './regex.js';

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

let getUserEmail = (userId) => {
  check(userId, MongoId)
  let user = Meteor.users.findOne({_id: userId});
  return user.emails[0].address;
};

export { getFullName, getProfileIcon, getUserEmail };