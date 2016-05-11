import { Meteor } from 'meteor/meteor';
import { Project } from '../../../api/project/project.js';

import '../../../ui/pages/projects-page.js';
import '../../../ui/components/project/edit/project-edit.js';

Router.route('/projects', {
  name: 'projects',
  template: 'Projects_page',
  waitOn: function(){
    return [
      this.subscribe('projects'),
      this.subscribe('clients'),
      this.subscribe('users')
    ]
  }
});

Router.route('/project/:_id', {
  name: 'projectSettings',
  template: 'Project_edit',
  waitOn: function(){
    return [
      this.subscribe('current.project', this.params._id),
      this.subscribe('users')
    ]
  },
  data: function(){
    return {
      project: Project.findOne()
    }
  }
});