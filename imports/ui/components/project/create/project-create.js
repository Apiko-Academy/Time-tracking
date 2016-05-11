import 'meteor/trsdln:modals';
import './project-create.html';
import '../../select-dropdown/select-dropdown.js';

import { Clients } from '/imports/api/collections.js';
import { handleMethodResult } from '../../../../modules/handle-method-result';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

Template.Project_create.helpers({
  clients: function(){
    let clients = Clients.find().fetch();

    clients.unshift({
      _id: 'without client',
      name: 'Without client'
    });

    return clients;
  }
});

Template.Project_create.events({
  'click .client-add': function(event, tmpl){
    event.preventDefault();

    let clientNameInput = tmpl.$('.client-name');

    Meteor.call('client.create', clientNameInput.val(), handleMethodResult((res) =>{
      clientNameInput.val("");
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