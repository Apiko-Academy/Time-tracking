import './modal.html';
import './organisation-settings.html';

Template.modalOrganisationEdit.onCreated(function(){
  let parentView = Blaze.currentView.parentView;
  let parentInstance = parentView.templateInstance();
  let others = Meteor.users.find({_id: {$nin: this.data.users}}).map(function(item){ return item._id; } );
  this.otherUsers = new ReactiveVar(others);
  this.usersInOrganisation = parentInstance.organisationUsers;
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
      return Meteor.users.find({_id: {$in: tmpl.otherUsers.get()}});
    }
  }
});