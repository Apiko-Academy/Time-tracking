import './organisation-settings.html';
import '../../../../lib/organisation.js';
import './users-list/users-list.html';
import { outputHandler } from '../../../../modules/output-handler.js';
import { getFullName } from '../../../../modules/users.js';
import { handleMethodResult } from '../../../../modules/handle-method-result.js';
import './modal.html';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';
import './modal.js'

Template.organisationSettings.onCreated(function () {
  loadFilePicker('AMxXlNUEKQ1OgRo47XtKSz');
  this.iconUrl = new ReactiveVar(this.data.profile.iconUrl);
  this.organisationUsers = new ReactiveVar(this.data.users);
  this.owner = new ReactiveVar(this.data.owners);
  this.usersInOrganisation = new ReactiveVar(this.data.users);
});
Template.organisationSettings.helpers({
  iconUrl(){
    let tmpl = Template.instance();
    return tmpl.iconUrl.get();
  },
  users () {
    let tmpl = Template.instance();
    let users = Meteor.users.find({_id: {$in: tmpl.organisationUsers.get()}});
    return users;
  },
  isUserInRoleOwner () {
    let owners = Template.instance().owner.get();
    if (_.contains(owners, this._id)) {
      return true;
    }
  },
  getName () {
    return getFullName(this);
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
  'click .edit-organisation-submit': function(event, tmpl) {
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
  'click .abort-editing': function(){
    Router.go('myorganisations');
  },
  'click .remove-from-organisation-users': function(event, tmpl){
    event.preventDefault();
    let selectedUser = event.target.value;
    let usersInOrganisation = tmpl.organisationUsers.get();
    usersInOrganisation = _.without(usersInOrganisation, selectedUser);
    tmpl.organisationUsers.set(usersInOrganisation);
  },
  'click .add-user-to-owners': function(event, tmpl) {
    event.preventDefault();
    console.log(tmpl.organisationUsers.get())
    let selectedUser = event.target.value;
    let owners = tmpl.owner.get();
    owners.push(selectedUser);
    tmpl.owner.set(owners);
  },
  'click .remove-user-from-owners': function(event, tmpl) {
    event.preventDefault();
    let selectedUser = event.target.value;
    let owners = tmpl.owner.get();
    owners = _.without(owners, selectedUser);
    tmpl.owner.set(owners);
  }
});