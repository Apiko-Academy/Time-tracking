import './projects-find.html';

Template.projectsFind.helpers({
  clients: function(){
    return Clients.find();
  }
});

Template.projectsFind.onRendered(function(){
  $('.filter_active').selectpicker();
  $('.filter_client').selectpicker({
    liveSearchPlaceholder: 'Find client'
  });
  $('.filter_team').selectpicker({
    liveSearchPlaceholder: 'Find team'
  });
});