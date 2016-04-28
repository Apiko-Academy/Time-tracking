import './projects-list-item.html';
import {getFullName} from '../../../modules/users.js';

Template.Project_list_item.helpers({
  client: function() {
    let client = Clients.findOne({_id: this.clientId});
     
    return !!client && client.name || 'Without client';
  },
  workers: function(){
    let names = this.workers.map(function(id){
      return getFullName(id);
    });

    return names;
  },
  managers: function(){
    let names = this.managers.map(function(id){
      return getFullName(id);
    });

    return names;
  }
});