import './organisation-settings.html';

import './modal.js';
import './users-table.js';
import '../../../../lib/organisation.js';

import { handleMethodResult } from '../../../../modules/handle-method-result.js';
import { Mongo } from 'meteor/mongo';
import { outputHandler } from '../../../../modules/output-handler.js';
import { ReactiveArray } from 'meteor/manuel:reactivearray';
import { ReactiveVar } from 'meteor/reactive-var';
import { changeIcon } from '../../../../modules/filepicker.js';

Template.organisationSettings.onCreated(function () {
  this.iconUrl = new ReactiveVar(this.data.profile.iconUrl);
  this.organisationUsers = new ReactiveArray(this.data.users);
  this.organisationOwners = new ReactiveArray(this.data.owners);

  this.usersRolesInOrganisation = (userId, eventPressed) => {
    let methodName = eventPressed === 'add-user-to-owners' ? 'push' : 'remove';
    this.organisationOwners[methodName](userId);
  };

  this.addOrRemoveUserFromOrganisation =  (userId, eventPressed) => {
    if (eventPressed === 'remove') {
      this.organisationOwners.remove(userId);
      this.organisationUsers.remove(userId);
    } else {
      this.organisationUsers.push(userId);
    }
  };
});

Template.organisationSettings.helpers({
  iconUrl(){
    let tmpl = Template.instance();
    return tmpl.iconUrl.get();
  },
  users () {
    let tmpl = Template.instance();
    return Meteor.users.find({_id: {$in: tmpl.organisationUsers.array()}});
  },
  changeOrganisationUsers () {
    let tmpl = Template.instance();
    return tmpl.addOrRemoveUserFromOrganisation;
  },
  usersRolesInOrganisation () {
    let tmpl = Template.instance();
    return tmpl.usersRolesInOrganisation;
  },
  currentOrganisation () {
    return this;
  },
  organisationOwners() {
    let tmpl = Template.instance();
    return tmpl.organisationOwners.array();
  },
  organisationUsers () {
    let tmpl = Template.instance();
    return tmpl.organisationUsers.array();
  }
});

Template.organisationSettings.events({
  'click #organisation-icon': function (event, tmpl) {
    changeIcon({
      onsuccess: (result) => tmpl.iconUrl.set(result),
      onerror: outputHandler
    });
  },
  'submit .edit-organisation-form': function(event, tmpl) {
    event.preventDefault();
    let data =  {
      _id: tmpl.data._id,
      name: event.target['organisation-name'].value.trim(),
      description:  event.target['organisation-description'].value.trim(),
      profile: {
        companySite:  event.target['company-site'].value.trim(),
        iconUrl: tmpl.iconUrl.get()
      },
      users: tmpl.organisationUsers.array(),
      owners: tmpl.organisationOwners.array()
    };

    Meteor.call('editOrganisation', data, handleMethodResult(() => {
       Router.go('myorganisations');
    }));
  }
});