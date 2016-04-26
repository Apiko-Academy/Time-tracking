import './projects-list.html';
import {getFullName} from '../../../modules/users.js';

Template.projectsList.helpers({
  client: function() {
    let client = Clients.findOne(this.clientId);
    if(client){
      return client.name;
    } else {
      return 'Without client';
    }
  },
  workers: function(){
    let names = [];
    
    this.workers.forEach(function(id){
      names.push(getFullName(id));
    });

    return names;
  },
  managers: function(){
    let names = [];
    
    this.managers.forEach(function(id){
      names.push(getFullName(id));
    });

    return names;
  }
});