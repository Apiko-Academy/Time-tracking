import { Meteor } from 'meteor/meteor';
import Clients from '../../../api/clients/clients.js';


Meteor.publish('clients', function() {
  if(this.userId){
    return Clients.find({ createdBy: this.userId });
  } else {
  	this.ready();
  }
});
