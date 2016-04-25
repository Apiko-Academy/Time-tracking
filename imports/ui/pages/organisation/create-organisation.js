import './create-organisation.html';

import { Template } from 'meteor/templating';
import { loadFilePicker } from 'meteor/natestrauser:filepicker-plus';
import { ReactiveVar } from 'meteor/reactive-var';
import { handleMethodResult } from '../../../modules/handle-method-result.js';
import { outputErrorHandler } from '../../../modules/output-errors-handler.js';
import { noImage } from '../../../modules/images.js';

Template.createOrganisation.onCreated(function () {
  loadFilePicker('AMxXlNUEKQ1OgRo47XtKSz');
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
      outputErrorHandler('Name or description are empty');
      return;
    }

    let organisation = {
      name: name,
      description: description,
      profile: {
        iconUrl: iconUrl,
        companySite: companySite
      }
    };

    event.target.reset();
    template.iconUrl.set();
    
    Meteor.call('organisationInsert', organisation, handleMethodResult(()=>{
      Router.go('myorganisations');
    }));

  },
  'click #organisation-icon': function (event, tmpl) {
    filepicker.pick({
        mimetypes: ['image/gif','image/jpeg','image/png'],
        multiple: false
      },
      function(InkBlobs){
        tmpl.iconUrl.set(InkBlobs.url);
      },
      function(FPError){
        outputErrorHandler(FPError.toString());
    });
  }

});

Template.createOrganisation.helpers({
  iconUrl: function () {
    let noImage = noImage;
    let iconUrl = Template.instance().iconUrl.get();

    return iconUrl || noImage;
  }
});