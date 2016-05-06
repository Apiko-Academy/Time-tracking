import './create-organisation.html';

import { Template } from 'meteor/templating';
import { loadFilePicker } from 'meteor/natestrauser:filepicker-plus';
import { ReactiveVar } from 'meteor/reactive-var';
import { handleMethodResult } from '../../../modules/handle-method-result.js';
import { outputHandler } from '../../../modules/output-handler.js';
import { noImage } from '../../../modules/images.js';
import { changeIcon } from '../../../modules/filepicker.js';


Template.createOrganisation.onCreated(function () {
  this.iconUrl = new ReactiveVar();
});

Template.createOrganisation.events({
  'submit form': function(event, template) {
    event.preventDefault();

    let name = event.target['organisation-name'].value.trim();
    let description = event.target['organisation-description'].value.trim();
    let companySite = event.target['company-site'].value.trim();
    let iconUrl = template.iconUrl.get() || noImage;

    if (!name || !description) {
      outputHandler('Name or description are empty');
      return;
    }

    let organisation = {
      name: name,
      description: description,
      profile: {
        iconUrl: iconUrl,
        companySite: companySite
      },
      users: [Meteor.userId()]
    };

    event.target.reset();
    template.iconUrl.set();
    
    Meteor.call('organisationInsert', organisation, handleMethodResult(()=>{
      Router.go('myorganisations');
    }));
  },

  'click #organisation-icon': function (event, tmpl) {
    //old
    //changeIcon( (result) => {
    //  tmpl.iconUrl.set(result);
    //});

    //new
    //handleMethodResult( changeIcon((result) => {
    //  tmpl.iconUrl.set(result);
    //}));

    //V recommended
    //changeIcon( outputHandler((result) => {
    //  tmpl.iconUrl.set(result);
    //}));

    //my option
    changeIcon({
      onsuccess: (result) => tmpl.iconUrl.set(result),
      onerror: outputHandler
    });
  }
});

Template.createOrganisation.helpers({
  iconUrl: function () {
    let iconUrl = Template.instance().iconUrl.get();

    return iconUrl || noImage;
  }
});
