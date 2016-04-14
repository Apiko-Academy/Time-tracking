Namespace('antitoggl', {
  alert: function(message, type = "error") {
    if(_.isObject(message)){
      if(message.reason){
      	alert(`${message.reason}`);
      } else if(message.error){
      	alert(`${message.error}`);
      }
    } else {
      alert(`${message}`);
    }
  }
});