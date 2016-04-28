import './projects.html';
import './projects-find.js';
import './projects-list.js';
import './project-create.js';

import 'meteor/trsdln:modals';

Template.Projects_page.onCreated(function(){
  this.filter = new ReactiveVar( {} );
});

Template.Projects_page.helpers({
  setFilter: function(){
    let filter = Template.instance().filter;
    return function(value = {}){
      filter.set(value);
    }
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