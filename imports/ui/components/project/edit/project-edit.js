import './project-edit.html';
import '../../users-select/users-select.js';
import './users-add.js';

import 'meteor/trsdln:modals';

import { Meteor } from 'meteor/meteor';
import { ReactiveArray } from 'meteor/manuel:reactivearray';
import { Template } from 'meteor/templating';

Template.Project_edit.helpers({
  projectMembers(){
    let project = Template.instance().data.project;
    return [...project.workers, ...project.managers];
  }
});

