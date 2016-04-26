import './projects-find.html';

Template.projectsFind.helpers({
  clients: function(){
    return Clients.find();
  }
});

Template.projectsFind.events({
  'click .apply-filter': function (event, inst) {
    event.preventDefault();
    let name = inst.$(".project-name").val();
    if(name){
      inst.filter.name = {$regex: name + ".*"};
    } else {
      delete inst.filter.name;
    }
    inst.view.parentView._templateInstance.filter.set(inst.filter); 
  },
  'click .reset-filters': function(event, inst){
    event.preventDefault();
    inst.view.parentView._templateInstance.filter.set({});
  }
});

Template.projectsFind.onRendered(function(){
  let filter = this.filter;

  $('.filter_client').selectpicker({
    liveSearchPlaceholder: 'Find client'
  }).on('changed.bs.select', function (e) {
    if($(this).val()){
      filter.clientId = {$in: $(this).val()};
    } else {
      delete filter.clientId;
    }
  });

  $('.filter_team').selectpicker({
    liveSearchPlaceholder: 'Find team'
  }).on('changed.bs.select', function (e) {
    filter.team = {$in: $(this).val()};
  });

});

Template.projectsFind.onCreated(function(){
  this.filter = {};
});