import 'meteor/jesperwe:bootstrap-select';
import './project-create.html';
import '../../../lib/anti-toggl/client/anti-toggl.js';
import 'meteor/trsdln:modals';

Template.projectCreate.events({
  'click .client-add': function(event, inst){
    event.preventDefault();

    let clientName = inst.$('.client_name');

    Meteor.call('clientCreate', clientName.val(), AntiToggl.handleMethodResult((res) =>{
      clientName.val("");
      inst.$('.select_client')
        .selectpicker('refresh')
        .selectpicker('val', res);
      })
    );
  },
  'submit .project-create-form': function(event, inst){
    event.preventDefault();
    let target = event.target;

    let projectAttributes = {
      name: target.name.value,
      clientId: target.client.value,
      public: target.public.checked,
      color: ''
    }

    target.reset();
    
    Meteor.call('projectCreate', projectAttributes, AntiToggl.handleMethodResult(()=>{
      ModalManager.getInstanceByElement(event.target).close();
    }));
  }
});

Template.projectCreate.onRendered(function(){
  $('.select_client').selectpicker({
    liveSearchPlaceholder: 'Find client'
  });
});

Template.projectCreate.helpers({
  clients: function(){
  	return Clients.find();
  }
});