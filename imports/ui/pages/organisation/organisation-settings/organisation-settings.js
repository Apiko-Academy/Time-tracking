import './organisation-settings.html';
import '/imports/ui/components/permissions-page/permissions.html';

import './modal/modal.js';
import './users-table/users-table.js';

import { handleMethodResult } from '/imports/modules/handle-method-result.js';
import { Mongo } from 'meteor/mongo';
import { Organisation } from '/imports/api/collections.js';
import { outputHandler } from '/imports/modules/output-handler.js';
import { ReactiveArray } from 'meteor/manuel:reactivearray';
import { ReactiveVar } from 'meteor/reactive-var';
import { changeIcon } from '/imports/modules/filepicker.js';
import { getOrganisationIcon } from '/imports/modules/organisation.js';

Template.organisationSettings.onCreated(function () {
  let organizationIcon = getOrganisationIcon(this.data._id);

  this.organisationMembers = new ReactiveArray(this.data.members);
  this.iconUrl = new ReactiveVar(organizationIcon);
  this.organisationOwners = new ReactiveArray(this.data.owners);

});

Template.organisationSettings.helpers({
  iconUrl(){
    let tmpl = Template.instance();
    return tmpl.iconUrl.get();
  },
  users () {
    let tmpl = Template.instance();
    return Meteor.users.find({_id: {$in: tmpl.organisationMembers.array()}});
  },
  changeOrganisationMembers () {
    let tmpl = Template.instance();
    return function(userId, eventPressed) {
      if (eventPressed === 'remove') {
        tmpl.organisationOwners.remove(userId);
        tmpl.organisationMembers.remove(userId);
      } else {
        tmpl.organisationMembers.push(userId);
      }
    };
  },
  toggleOwner () {
    let tmpl = Template.instance();
    return function(userId, eventPressed) {
      let methodName = eventPressed === 'add-user-to-owners' ? 'push' : 'remove';
      tmpl.organisationOwners[methodName](userId);
    }
  },
  currentOrganisation () {
    return this;
  },
  organisationOwners() {
    let tmpl = Template.instance();
    return tmpl.organisationOwners.array();
  },
  organisationMembers () {
    let tmpl = Template.instance();
    return tmpl.organisationMembers.array();
  },
  isOwner(){
    return this.owners.indexOf(Meteor.userId()) !== -1;
  }
});

Template.organisationSettings.events({
  'click #organisation-icon': function (event, tmpl) {
    changeIcon({
      onsuccess: (result) => tmpl.iconUrl.set(result),
      onerror: outputHandler
    })
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
      members: tmpl.organisationMembers.array(),
      owners: tmpl.organisationOwners.array()
    };

    Meteor.call('editOrganisation', data, handleMethodResult(() => {
       Router.go('myorganisations');
    }));
  }
});