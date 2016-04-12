import './create-organisation.html';

Template.createOrganisation.events({

  'submit form': function(e) {
    e.preventDefault();

    let name = $(e.target).find('[name=organisation-name]').val().trim(),
        descript = $(e.target).find('[name=organisation-description]').val().trim();

    if (!name || !descript) return;

    let organisation = {
        name: name,
        descript: descript
    };

    antitoggl.resetForm(e);

    Meteor.call('organisationInsert', organisation, function(error, result) {

        if (error) {
            throwError(error.reason);
            return;
        }

        if (result.organisationExists) {
            alert('This organisation has created');
            //Router.go('organisationItem', { _id: result._id });
        }

    });

  }


});