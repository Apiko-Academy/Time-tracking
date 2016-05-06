import './projects-list-item.html';

import { Clients } from '../../../../api/clients/clients.js';
import {getFullName} from '../../../../modules/users.js';
import { Template } from 'meteor/templating';

Template.Project_list_item.helpers({
  client: function() {
    let client = Clients.findOne({_id: this.clientId});
     
    return !!client && client.name || 'Without client';
  },
  workers: function(){
    return this.workers.map(function(id){
      return getFullName(id);
    });
  },
  managers: function(){
    return this.managers.map(function(id){
      return getFullName(id);
    });
  }
});