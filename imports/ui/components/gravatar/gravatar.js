import './gravatar.html';

import { outputHandler } from '../../../modules/output-handler.js';
import { useGravatar } from '../../../modules/gravatar.js';
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
      let email = Meteor.user().emails[0].address;
      let imageUrl = useGravatar(email, Meteor.userId())
      Meteor.users.update({_id: Meteor.userId()}, {$set: {'profile.profileImage': imageUrl}});
  }
});