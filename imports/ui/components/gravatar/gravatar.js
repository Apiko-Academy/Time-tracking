import './gravatar.html';

import { outputHandler } from '../../../modules/output-handler.js';
import { handleMethodResult } from '../../../modules/handle-method-result.js';


Template.change_image.onCreated(function(){
  //loadFilePicker('AMxXlNUEKQ1OgRo47XtKSz');
  console.log(this)
});
Template.change_image.events({
  'click #uploadImage': function(event, tmpl) {
      filepicker.pick({
          mimetypes: ['image/gif','image/jpeg','image/png'],
          multiple: false
        },
        function(InkBlobs){
          //updateUserProfile('profile.profileImage')('', InkBlobs.url);
          Meteor.call('user.image.update', Meteor.userId(), InkBlobs.url, handleMethodResult());
        },
        function(FPError){
          outputHandler(FPError.toString());
      });
  }
})