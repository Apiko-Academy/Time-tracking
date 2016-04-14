import { Namespace } from 'meteor/zephraph:namespace';
import { sAlert } from 'meteor/juliancwirko:s-alert';
import '../../../startup/client/sAlert-config.js';

Namespace('AntiToggl', {
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
    if(sAlert[type]){
      sAlert[type](messageText);
    }
  }
});