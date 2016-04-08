// Meteor.publish('roles', function (){
// 	return Meteor.roles.find({});
// });

Meteor.publish('userData', function() {
  if(!this.userId) return null;
  
  console.log(Meteor.users.find(this.userId, 
  	{
  		fields: {emails: 1, profile: 1, roles: 1}
  	}
  ).fetch());

  return Meteor.users.find(this.userId, 
  	{
  		fields: {emails: 1, profile: 1}
  	}
  );
});