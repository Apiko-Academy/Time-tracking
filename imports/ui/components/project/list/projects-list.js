import './projects-list.html';
import './projects-list-item.js';

import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';

Template.Projects_list.events({
   'click .table-row': function(){
     Router.go('projectSettings', {_id: this._id});
   }
});
