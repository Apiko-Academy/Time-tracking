import './create-organisation.html';

import { Template } from 'meteor/templating';
import { loadFilePicker } from 'meteor/natestrauser:filepicker-plus';
import { ReactiveVar } from 'meteor/reactive-var';

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
    let iconUrl = template.iconUrl.get() || AntiToggl.img.noImg;

    if (!name || !description) {
      alert('Name or description are empty');
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
    
    Meteor.call('organisationInsert', organisation, function(error, result) {

      if (result) {
        //Router.go('organisationItem', { _id: result._id });
      } else {
        throwError(error.reason);
      }
    });

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
        console.log(FPError.toString());
    });
  }

});

Template.createOrganisation.helpers({
  iconUrl: function () {
    let noImg = AntiToggl.img.noImg;
    let iconUrl = Template.instance().iconUrl.get();

    return iconUrl || noImg;
  }
});