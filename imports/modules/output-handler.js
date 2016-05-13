import 'meteor/underscore';

import { sAlert } from 'meteor/juliancwirko:s-alert';

let outputHandler = (message, type = 'error') => {
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

export { outputHandler };