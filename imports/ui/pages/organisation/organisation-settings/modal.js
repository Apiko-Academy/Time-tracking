import './modal.html';
import './organisation-settings.html';

Template.modalOrganisationEdit.onCreated(function(){
  this.usersInOrganisation = new ReactiveVar(this.data.reactiveVar);
  this.setUsersInOrganisation = this.data.changeReactiveVarValue;
  console.log(this)
});
Template.modalOrganisationEdit.helpers({
  onUserSelectHandler () {
    let tmpl = Template.instance();
    return function (itemId) {
      let selected = tmpl.usersInOrganisation.get();
      selected.push(itemId)
      tmpl.usersInOrganisation.set(_.uniq(selected));
      tmpl.setUsersInOrganisation(tmpl.usersInOrganisation.get());
      return Meteor.users.find({_id: {$nin: tmpl.usersInOrganisation.get()}}).fetch();
    }
  },
  itemUser () {
    let tmpl = Template.instance();
    setInterval(function () {
      console.log(tmpl.usersInOrganisation.get())
    }, 10000)
    return Meteor.users.find({_id: {$in: tmpl.usersInOrganisation.get()}}).fetch();
  }
});