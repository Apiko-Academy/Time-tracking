import './projects.html';
import './projects-find.js';
import './projects-list.js';
import './project-create.js';

import 'meteor/trsdln:modals';

Template.projects.events({
  'click .project-create': function(event, inst){
    event.preventDefault();

    ModalManager.open('projectCreate');
  }
});

Template.projects.helpers({
  projects: function(){
    return Project.find(Template.instance().filter.get());
  }
});

Template.projects.onCreated(function(){
  this.filter = new ReactiveVar( {} );
});