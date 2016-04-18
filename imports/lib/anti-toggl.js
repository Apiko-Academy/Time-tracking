import { Namespace } from 'meteor/zephraph:namespace';

Namespace('AntiToggl.regex', {
  email: function (email) {
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    return regex.test(email);
  }
});

Namespace('AntiToggl.image', {
  noImage: "https://cdn.filepicker.io/api/file/oWq4fx2lTOK6w9L5xCJn"
});

Namespace('AntiToggl.organization', {
  getIcon: function (organizationId) {
    let organization = Organisation.findOne(organizationId);

    if (organization && organization.profile && organization.profile.iconUrl ) {
      return organization.profile.iconUrl;
    } else {
      return AntiToggl.image.noImage;
    }
  }
});

Namespace('AntiToggl.users', {
  getFullName: function (userId) {
    let userProfile = Meteor.users.findOne(userId).profile;
    return userProfile.firstName + ' ' + userProfile.lastName;
  }
});