import './projects.html';
import './projects-find.js';
import './projects-list.js';
import './project-create.js';

import 'meteor/trsdln:modals';

Template.Projects.events({
  'click .project-create': function(event, tmpl){
    event.preventDefault();

    ModalManager.open('Project_create');
  }
});

Template.Projects.helpers({
  setFilter: function(){
    let filter = Template.instance().filter;
    return function(value){
      filter.set(value);
    }
  },
/*  clients: function(){
    console.log('clients helpers run in projects.js');
  	let clients = Clients.find().fetch(); 
    clients.unshift({
    	_id: '',
    	name: 'Without client'
    });
    return clients;
  },*/
  projects: function(){
    return Project.find(Template.instance().filter.get());
  }
});

Template.Projects.onCreated(function(){
  this.filter = new ReactiveVar( {} );
});