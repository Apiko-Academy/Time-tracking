import './modal.html';
import './organisation-settings.html';

Template.modalOrganisationEdit.helpers({
  onUserSelectHandler () {
    let tmpl = Template.instance();
    let self = this;
    return function (itemId) {
      self.changeOrganisationUsers(itemId);
      return Meteor.users.find({_id: {$nin: tmpl.data.reactiveVar}}).fetch();
    }
  },
  arrayOfUsersIdsInOrganisation () {
    return Meteor.users.find({_id: {$in: this.reactiveVar}}).map((item) => { return item._id;});
  }
});