import './project-sharing.html';
import './member-list/member-list-item.js';
import './users-modal/users-add.js';
import '../../../users-select/users-select.js';
import '../../../permissions-page/permissions.html';

import 'meteor/trsdln:modals';
import { Template } from 'meteor/templating';

Template.Project_sharing.helpers({
  projectMembers(){
    let project = Template.instance().data.project;
    return _.union(project.managers, project.workers);
  }
});
  