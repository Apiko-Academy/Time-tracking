import './gravatar.html';


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
          updateUserProfile('profile.profileImage')('', InkBlobs.url);
        },
        function(FPError){
          outputHandler(FPError.toString());
      });
  }
})