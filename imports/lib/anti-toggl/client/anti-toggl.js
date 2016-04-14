Namespace('antitoggl', {
  alert: function(message, type = "error") {
    let messageText = message;
    if(_.isObject(message)){
      if(message.reason){
      	messageText = message.reason;
      } else if(message.error){
      	message = message.error;
      } else if(message.message){
        message = message.message;
      }
    }
    alert(messageText);
  }
});