import './modal.html';
import '/imports/ui/pages/organisation/organisation-settings/organisation-settings.html';
import '../users-table/users-table.html';


Template.modalOrganisationEdit.helpers({
  onUserSelectHandler () {
    return (itemId) => {
      this.changeOrganisationMembers(itemId);
    }
  }
});