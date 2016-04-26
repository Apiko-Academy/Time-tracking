import './organisation-settings.html';
import '../../../../lib/organisation.js';
import './users-list/users-list.html';
import { outputHandler } from '../../../../modules/output-handler.js';
import { getFullName } from '../../../../modules/users.js';
import { handleMethodResult } from '../../../../modules/handle-method-result.js';

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';

Template.organisationSettings.onCreated(function () {
  loadFilePicker('AMxXlNUEKQ1OgRo47XtKSz');
  this.iconUrl = new ReactiveVar(this.data.profile.iconUrl);
  this.organisationUsers = new ReactiveVar(this.data.users);
  let others = Meteor.users.find({_id: {$nin: this.data.users}}).map(function(item){ return item._id; } );
  this.otherUsers = new ReactiveVar(others);
  this.owner = new ReactiveVar(this.data.owners);
  this.selectedUsers = new ReactiveVar([]);
});
Template.organisationSettings.helpers({
  iconUrl(){
    let tmpl = Template.instance();
    return tmpl.iconUrl.get();
  },
  isInOrganisationUsers() {
    let usersInOrganisation = Template.instance().organisationUsers.get();
    let tmpl = Template.instance();
    let users =  Meteor.users.find({_id: {$in: usersInOrganisation}});
    return function (itemId) {
      console.log(itemId)
    }
  },
  notInOrganisationUsers(){
    let usersNotInOrganisation = Template.instance().otherUsers.get();
    return  Meteor.users.find({_id: {$in: usersNotInOrganisation}});
  },
  isUserInRoleOwner () {
    let owners = Template.instance().owner.get();
    if (_.contains(owners, this._id)) {
      return true;
    }
  },
  onUserSelectHandler () {
    let tmpl = Template.instance();
    return function (itemId) {
      let selected = tmpl.selectedUsers.get();
      selected.push(itemId)
      selected = _.uniq(selected);
      tmpl.selectedUsers.set(selected);
    }
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
  'click .btn-success': function(event, tmpl) {
    event.preventDefault();
    let data =  {
      _id: tmpl.data._id,
      name:  tmpl.$('[name=organisation-name]').val().trim(),
      description:  tmpl.$('[name=organisation-description]').val().trim(),
      profile: {
        companySite:  tmpl.$('[name=company-site]').val().trim(),
        iconUrl: tmpl.iconUrl.get()
      },
      users: tmpl.organisationUsers.get(),
      owners: tmpl.owner.get()
    };
    Meteor.call('editOrganisation', data, handleMethodResult(() => {
       Router.go('myorganisations');
    }));
  },
  'click .btn-primary': function(event, tmpl) {
    event.preventDefault();
    let users = tmpl.organisationUsers.get();
    let otherUsers = tmpl.otherUsers.get();
    users.push(event.target.value);
    tmpl.organisationUsers.set(users);
    tmpl.otherUsers.set(_.without(otherUsers, event.target.value));
  },
  'click .btn-warning': function(event, tmpl) {
    event.preventDefault();
    let users = tmpl.organisationUsers.get();
    let otherUsers = tmpl.otherUsers.get();
    let owners = tmpl.owner.get();
    otherUsers.push(event.target.value);
    tmpl.organisationUsers.set(_.without(users, event.target.value));
    tmpl.otherUsers.set(otherUsers);
    tmpl.owner.set(_.without(owners, event.target.value));
  },
  'click .btn-default': function(event, tmpl){
    event.preventDefault();
    let owners = tmpl.owner.get();
    tmpl.owner.set(_.without(owners, event.target.value));
  },
  'click .btn-info': function(event, tmpl) {
    event.preventDefault();
    let owners = tmpl.owner.get();
    owners.push(event.target.value);
    tmpl.owner.set(owners);
  },
  'click .btn-danger': function(){
    Router.go('myorganisations');
  }
});