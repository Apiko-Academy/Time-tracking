import './projects-list.html';

Template.projectsList.helpers({
  client: function() {
  	let client = Clients.findOne(this.clientId);
  	if(client){
  	  return client.name;
    } else {
      return 'Without client';
    }
  }
});