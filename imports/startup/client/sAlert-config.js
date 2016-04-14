import { Meteor } from 'meteor/meteor';
import { sAlert } from 'meteor/juliancwirko:s-alert';

sAlert.config({
  effect: 'scale',
  position: 'bottom-right',
  timeout: 5000,
  html: false,
  onRouteClose: true,
  stack: true,
  offset: 0, 
  beep: false,
  onClose: _.noop
});
  