import './modal.html';
import './organisation-settings.html';

Template.modalOrganisationEdit.onCreated(function(){
  this.setUsersInOrganisation = this.data.changeReactiveVarValue;
});
Template.modalOrganisationEdit.helpers({
  onUserSelectHandler () {
    let tmpl = Template.instance();
    return function (itemId) {
      let selected = tmpl.data.reactiveVar;
      selected.push(itemId);
      tmpl.setUsersInOrganisation(_.uniq(selected));
      return Meteor.users.find({_id: {$nin: tmpl.data.reactiveVar}}).fetch();
    }
  },
  itemUser () {
    let tmpl = Template.instance();
    return Meteor.users.find({_id: {$in: this.reactiveVar}}).fetch();
  }
});