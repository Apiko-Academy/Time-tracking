let noImage = "https://cdn.filepicker.io/api/file/oWq4fx2lTOK6w9L5xCJn";
let getProfileIcon = (profileId) => {
    let user = Meteor.users.findOne({_id: profileId});

    if (user && user.profile.profileImage) {
      return user.profile.profileImage;
    } else {
      return "/default-user.png";
    }
};
let getOrganisationIcon = (organisationId) => {
  let organization = Organisation.findOne({_id: organisationId});
  if (organization && organization.profile && organization.profile.iconUrl ) {
    return organization.profile.iconUrl;
  } else {
    return noImage;
  }
};

export { noImage, getProfileIcon, getOrganisationIcon };