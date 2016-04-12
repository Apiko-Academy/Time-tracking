import './create-organisation.html';

Template.createOrganisation.events({

  'submit form': function(event) {
    event.preventDefault();

    let name = event.target['organisation-name'].value.trim();
    let description = event.target['organisation-description'].value.trim();

    if (!name || !description) {
      alert('Name or description are empty');
      return;
    }

    let organisation = {
      name: name,
      description: description
    };

    event.target.reset();

    Meteor.call('organisationInsert', organisation, function(error, result) {

      if (result) {
        //Router.go('organisationItem', { _id: result._id });
      } else {
        throwError(error.reason);
      }
    });

  }

});