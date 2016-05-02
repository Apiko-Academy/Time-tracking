import '../components/project/projects-page.html';
import '../components/project/find/projects-find.js';
import '../components/project/list/projects-list.js';
import '../components/project/create/project-create.js';

import 'meteor/trsdln:modals';

import Projects from '../../api/project/project.js';
import Clients from '../../api/clients/clients.js';

Template.Projects_page.onCreated(function(){
  this.filter = new ReactiveVar( {} );
});

Template.Projects_page.helpers({
  filter: function(){
    return Template.instance().filter;
  },
  projects: function(){
    return Project.find(Template.instance().filter.get());
  }
});

Template.Projects_page.events({
  'click .project-create': function(event, tmpl){
    event.preventDefault();

    ModalManager.open('Project_create');
  }
});