import './users-add.html';

import { handleMethodResult } from '../../../../../../modules/handle-method-result.js';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

Template.Users_add.helpers({
  onUserSelectHandler () {
    let tmpl = Template.instance();  
    return (userId) => {
      Meteor.call('project.member.set', tmpl.data.projectId, userId, handleMethodResult());
    }
  }
});