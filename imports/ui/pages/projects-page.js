import './projects-page.html';
import '../components/project/find/projects-find.js';
import '../components/project/list/projects-list.js';
import '../components/project/create/project-create.js';

import 'meteor/trsdln:modals';

import { Template } from 'meteor/templating';
import { Project } from '../../api/project/project.js';

Template.Projects_page.onCreated(function(){
  this.clientFilter = new ReactiveVar( null );
  this.teamFilter = new ReactiveVar( null );
  this.nameFilter = new ReactiveVar( null );
});

Template.Projects_page.helpers({
  onFilterChange: function(){
    let inst = Template.instance();
    return function(filterType, filterValue){
      inst[filterType].set(filterValue);
    }
  },
  projects: function(){
    let inst = Template.instance();
    let query = {};
    let selectedClientsId = inst.clientFilter.get();
    let selectedTeamId = inst.teamFilter.get();
    let selectedName = inst.nameFilter.get();

    if(selectedClientsId){
      query.clientId = {$in: selectedClientsId};
    }
    if(selectedTeamId){
      query.$or = [{workers: {$all: selectedTeamId}}, {managers: {$all: selectedTeamId}}];
    }
    if(selectedName){
      query.name = new RegExp(selectedName, 'gi');
    }

    return Project.find(query);
  }
});

Template.Projects_page.events({
  'click .project-create': function(event, tmpl){
    event.preventDefault();

    ModalManager.open('Project_create');
  }
});