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

    if (organization) {
      return organization.profile.iconUrl;
    }
  }
});

Namespace('AntiToggl.profileImage', {
  getIcon: function (id) {
    
    let user = Meteor.users.findOne({_id: id});
    
    if (user && user.profile.profileImage) {
      return user.profile.profileImage;
    } else {
      return "/default-user.png";
    }
  }
});

Namespace('AntiToggl.isInRole', {
  isUserInRole: function(role = 'owner', userId = Meteor.userId(), group = null) {
    if (typeof userId !== 'string') {
      userId = Meteor.userId();
    }

    if (typeof group === "string") {
      return Roles.userIsInRole(userId, role, group);
    } else {
      return Roles.userIsInRole(userId, role);
    }
  }
});