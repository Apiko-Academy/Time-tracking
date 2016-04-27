import 'meteor/jesperwe:bootstrap-select';
import './project-create.html';
import {  handleMethodResult } from '../../../modules/handle-method-result';
import 'meteor/trsdln:modals';

Template.Project_create.events({
  'click .client-add': function(event, tmpl){
    event.preventDefault();

    let clientName = tmpl.$('.client_name');

    Meteor.call('clientCreate', clientName.val(), handleMethodResult((res) =>{
      clientName.val("");
      tmpl.$('.select_client')
        .selectpicker('refresh')
        .selectpicker('val', res);
      })
    );
  },
  'submit .project-create-form': function(event, tmpl){
    event.preventDefault();
    let target = event.target;

    let projectAttributes = {
      name: target.name.value,
      clientId: target.client.value,
      public: target.public.checked,
      color: ''
    }

    target.reset();
    
    Meteor.call('Project_create', projectAttributes, handleMethodResult(()=>{
      ModalManager.getInstanceByElement(event.target).close();
    }));
  }
});

Template.Project_create.onRendered(function(){
  this.$('.select_client').selectpicker({
    liveSearchPlaceholder: 'Find client'
  });
});

Template.Project_create.helpers({
  clients: function(){
  	return Clients.find();
  }
});