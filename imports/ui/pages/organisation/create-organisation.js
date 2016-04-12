import './create-organisation.html';

Template.createOrganisation.events({

  'submit form': function(event) {
    event.preventDefault();

    let name = event.target['organisation-name'].value.trim();
    let descript = event.target['organisation-description'].value.trim();

    if (!name || !descript) {
      return;
    }

    let organisation = {
      name: name,
      descript: descript
    };

    antitoggl.resetForm(event);

    Meteor.call('organisationInsert', organisation, function(error, result) {

      if (error) {
        throwError(error.reason);
        return;
      }

      if (result) {
        //Router.go('organisationItem', { _id: result._id });
      }

    });

  }


});