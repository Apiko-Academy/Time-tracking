import './gravatar.html';

import { outputHandler } from '../../../modules/output-handler.js';
import { useGravatar } from '../../../modules/users.js';
import { handleMethodResult } from '../../../modules/handle-method-result.js';

Template.change_image.events({
  'click #uploadImage': function(event, tmpl) {
      filepicker.pick({
          mimetypes: ['image/gif','image/jpeg','image/png'],
          multiple: false
        },
        function(InkBlobs){
          Meteor.call('user.image.update', Meteor.userId(), InkBlobs.url, handleMethodResult());
        },
        function(FPError){
          outputHandler(FPError.toString());
      });
  },
  'click #useGravatar': function (event, tmpl) {
    //console.log(Meteor.user().emails[0].address)
    let email = Meteor.user().emails[0].address;
    useGravatar(email, Meteor.userId())
  }
})