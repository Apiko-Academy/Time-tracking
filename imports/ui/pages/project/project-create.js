import 'meteor/trsdln:modals';
import './project-create.html';
import '../../components/select-dropdown/select-dropdown.js';

import {  handleMethodResult } from '../../../modules/handle-method-result';


Template.Project_create.events({
  'click .client-add': function(event, tmpl){
    event.preventDefault();

    let clientName = tmpl.$('.client-name');

    Meteor.call('client.create', clientName.val(), handleMethodResult((res) =>{
      clientName.val("");
      tmpl.$('.select-client')
        .val(res)
        .trigger("change");
      })
    );
  },
  'submit .project-create-form': function(event, tmpl){
    event.preventDefault();
    let target = event.target;

    let projectAttributes = {
      name: target.name.value,
      clientId: target.clients.value,
      public: target.public.checked,
      color: ''
    }

    target.reset();
    
    Meteor.call('project.create', projectAttributes, handleMethodResult(()=>{
      ModalManager.getInstanceByElement(event.target).close();
    }));
  }
});

Template.Project_create.helpers({
  clients: function(){
  	return Clients.find();
  }
});