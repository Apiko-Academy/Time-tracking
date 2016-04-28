import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.methods({
  'client.create': function(clientName) {
    check(clientName, String);

    let client = Clients.findOne({name: clientName, createdBy: this.userId});

    if(!client && this.userId){
      return Clients.insert({name: clientName, createdBy: this.userId});
    } else if(client){
      return client._id;
    }
  },

});
