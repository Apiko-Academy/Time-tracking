import './modal.html';
import './organisation-settings.html';
import './users-table.html';


Template.modalOrganisationEdit.helpers({
  onUserSelectHandler () {
    let tmpl = Template.instance();
    return (itemId) => {
      this.changeOrganisationUsers(itemId);
    }
  }
});