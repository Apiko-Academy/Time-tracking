import './modal.html';
import './organisation-settings.html';
import '../../../../lib/organisation.js';

Template.modalOrganisationEdit.onCreated(function(){
  let others = Meteor.users.find({_id: {$nin: this.data.users}}).map(function(item){ return item._id; } );
  this.otherUsers = new ReactiveVar(others);
  this.usersInOrganisation = new ReactiveVar(this.data.users);
});
Template.modalOrganisationEdit.helpers({
  itemUser() {
    let usersInOrganisation = Template.instance().usersInOrganisation.get();
    return Meteor.users.find({_id: {$in: usersInOrganisation}});
  },
  onUserSelectHandler () {
    let tmpl = Template.instance();
    return function (itemId) {
      let selected = tmpl.usersInOrganisation.get();
      selected.push(itemId)
      tmpl.usersInOrganisation.set(selected);
      console.log(tmpl.usersInOrganisation.get())
      Template.parentData(1).users = tmpl.usersInOrganisation.get();
      return Meteor.users.find({_id: {$in: tmpl.otherUsers.get()}});
    }
  }
});