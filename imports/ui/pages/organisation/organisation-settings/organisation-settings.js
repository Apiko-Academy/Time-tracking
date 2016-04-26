import '../my-organisations.html';
import './organisation-settings.html';
import '../../../../lib/organisation.js';
import { outputHandler } from '../../../../modules/output-handler.js';
import { handleMethodResult } from '../../../../modules/handle-method-result.js';

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import 'meteor/mongo';

Template.organisationSettings.onCreated(function () {
  loadFilePicker('AMxXlNUEKQ1OgRo47XtKSz');
  this.iconUrl = new ReactiveVar(this.data.profile.iconUrl);
  this.organisationUsers = new ReactiveVar(this.data.users);
  this.otherUsers = new ReactiveVar(Meteor.users.find({_id: {$nin: this.organisationUsers.get()}}).map(function(item){ return item._id } ));
  this.owner = new ReactiveVar(this.data.owners);
});
Template.organisationSettings.helpers({
  iconUrl(){
    let tmpl = Template.instance();
    return tmpl.iconUrl.get();
  },
  isInOrganisationUsers() {
    return Meteor.users.find({_id: {$in: Template.instance().organisationUsers.get()}});
  },
  notInOrganisationUsers(){
    return  Meteor.users.find({_id: {$in: Template.instance().otherUsers.get()}});
  },
  isUserInRoleOwner () {
    if (_.contains(Template.instance().owner.get(), this._id)) {
      return true;
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
    let data = {};
    _.extend(data, {
      _id: tmpl.data._id,
      name:  tmpl.$('[name=organisation-name]').val().trim(),
      description:  tmpl.$('[name=organisation-description]').val().trim(),
      profile: {
        companySite:  tmpl.$('[name=company-site]').val().trim(),
        iconUrl: tmpl.iconUrl.get()
      },
      users: tmpl.organisationUsers.get(),
      owners: tmpl.owner.get()
    });
    if (!data.name || !data.description) {
      outputHandler('Name or description are empty');
      return;
    } else {
      Meteor.call('editOrganisation', data, handleMethodResult(() => {
        Router.go('myorganisations');
      }));
    }
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