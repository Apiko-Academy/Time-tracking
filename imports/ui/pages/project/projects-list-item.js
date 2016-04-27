import './projects-list-item.html';
import {getFullName} from '../../../modules/users.js';

Template.Project_list_item.helpers({
  client: function() {
    let client = Clients.findOne({_id: this.clientId});
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