import './modal.html';
import './organisation-settings.html';

Template.modalOrganisationEdit.onCreated(function(){
  this.usersInOrganisation = this.data.reactiveVar;
  this.setUsersInOrganisation = this.data.changeReactiveVarValue;
});
Template.modalOrganisationEdit.helpers({
  onUserSelectHandler () {
    let tmpl = Template.instance();
    return function (itemId) {
      let selected = tmpl.usersInOrganisation;
      selected.push(itemId);
      tmpl.setUsersInOrganisation(_.uniq(selected));
      return Meteor.users.find({_id: {$nin: tmpl.usersInOrganisation}}).fetch();
    }
  },
  itemUser () {
    let tmpl = Template.instance();
    return Meteor.users.find({_id: {$in: tmpl.usersInOrganisation}}).fetch();
  }
});