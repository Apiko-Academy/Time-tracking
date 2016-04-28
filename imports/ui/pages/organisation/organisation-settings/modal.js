import './modal.html';
import './organisation-settings.html';
import './users-table.html';

Template.modalOrganisationEdit.onCreated(function () {
  console.log(this)
})

Template.modalOrganisationEdit.helpers({
  onUserSelectHandler () {
    return (itemId) => {
      this.changeOrganisationUsers(itemId);
    }
  }
});