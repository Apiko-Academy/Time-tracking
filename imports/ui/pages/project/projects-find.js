import './projects-find.html';

Template.projectsFind.helpers({
  clients: function(){
    return Clients.find();
  }
});

Template.projectsFind.events({
  'click .apply-filter': function (event, inst) {
      
    }
});

Template.projectsFind.onRendered(function(){
  let filter = this.view.parentView._templateInstance.filter;
  console.log(filter);
  $('.filter_active').selectpicker();
  $('.filter_client').selectpicker({
    liveSearchPlaceholder: 'Find client'
  });
  $('.filter_team').selectpicker({
    liveSearchPlaceholder: 'Find team'
  });
});