import './modal.html';
import '../organisation-settings.html';
import '../users-table/users-table.html';


Template.modalOrganisationEdit.helpers({
  onUserSelectHandler () {
    return (itemId) => {
      this.changeOrganisationMembers(itemId);
    }
  }
});