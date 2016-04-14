Namespace('antitoggl', {
  alert: function(message, type = "error") {
  	console.log(message);
    if(typeof message === "object"){
      if(message.reason){
      	alert(`Error: ${message.reason}`);
      } else if(message.error){
      	alert(`Error: ${message.error}`);
      }
    } else {
      alert(`${type}: ${message}`);
    }
  }
});