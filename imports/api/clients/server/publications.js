import { Meteor } from 'meteor/meteor';
import '../../../lib/clients.js';


Meteor.publish('clients', function() {
  //if(this.userId){
    return Clients.find(/*{ createdBy: this.userId }*/);
  //}
});
