import { sAlert } from 'meteor/juliancwirko:s-alert';

let alert = (message, type = 'error') => {
    let messageText;
    if (_.isObject(message)) {
      if (message.reason) {
        messageText = message.reason;
      } else if (message.error) {
        messageText = message.error;
      } else if (message.message) {
        messageText = message.message;
      }
    }
    if (sAlert[type]) {
      sAlert[type](messageText);
    }
  };
let handleMethodResult = (func) => {
    return (error, result) => {
      if (error) {
        alert(error);
      } else if (_.isFunction(func)) {
        func(result);
      }
    }
  };
export { alert, handleMethodResult };