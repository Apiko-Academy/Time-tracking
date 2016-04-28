import './organisation-settings.html';
import './modal.html';

import './modal.js';
import '../../../../lib/organisation.js';

import { getFullName } from '../../../../modules/users.js';
import { handleMethodResult } from '../../../../modules/handle-method-result.js';
import { Mongo } from 'meteor/mongo';
import { outputHandler } from '../../../../modules/output-handler.js';
import { ReactiveVar } from 'meteor/reactive-var';

Template.organisationSettings.onCreated(function () {
  loadFilePicker('AMxXlNUEKQ1OgRo47XtKSz');
  this.iconUrl = new ReactiveVar(this.data.profile.iconUrl);
  this.organisationUsers = new ReactiveArray(this.data.users);
  this.organisationOwners = new ReactiveArray(this.data.owners);
  console.log(this)

  this.usersRolesInOrganisation = function (userId, eventPressed) {
    if (eventPressed === 'add-user-to-owner') {
      this.organisationOwners.push(userId);
    } else {
      this.organisationOwners.remove(userId);
    }
  };

  this.removeUserFromOrganisation = function (userId) {
      this.organisationOwners.remove(userId);
      this.organisationUsers.remove(userId);
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
  isUserInRoleOwner () {
    let tmpl = Template.instance();
    if (tmpl.organisationOwners.indexOf(this._id) > -1) {
      return true;
    }
  },
  getName () {
    return getFullName(this);
  },
  changeOrganisationUsers () {
    let tmpl = Template.instance();
    return function(value) {
      tmpl.organisationUsers.push(value);
    }
  },
  reactiveVar () {
    let tmpl = Template.instance();
    return tmpl.organisationUsers.array();
  }
});
Template.organisationSettings.events({
  'click #organisation-icon': function (event, tmpl) {
    filepicker.pick({
          mimetypes: ['image/gif','image/jpeg','image/png'],
          multiple: false
        },
        function(InkBlobs){
          tmpl.iconUrl.set(InkBlobs.url);
        },
        function(FPError){
          outputHandler(FPError.toString());
        });
  },
  'submit .edit-organisation-form': function(event, tmpl) {
    event.preventDefault();
    let data =  {
      _id: tmpl.data._id,
      name:  tmpl.$('[name=organisation-name]').val().trim(),
      description:  tmpl.$('[name=organisation-description]').val().trim(),
      profile: {
        companySite:  tmpl.$('[name=company-site]').val().trim(),
        iconUrl: tmpl.iconUrl.get()
      },
      users: tmpl.organisationUsers.array(),
      owners: tmpl.organisationOwners.array()
    };

    Meteor.call('editOrganisation', data, handleMethodResult(() => {
       Router.go('myorganisations');
    }));
  },
  'click .remove-from-organisation-users': function(event, tmpl){
    event.preventDefault();
    tmpl.removeUserFromOrganisation(event.target.value);
  },
  'click .add-user-to-owners': function(event, tmpl) {
    event.preventDefault();
    tmpl.usersRolesInOrganisation(event.target.value, 'add-user-to-owner');
  },
  'click .remove-user-from-owners': function(event, tmpl) {
    event.preventDefault();
    tmpl.usersRolesInOrganisation(event.target.value, 'remove-user-from-owners');
  }
});