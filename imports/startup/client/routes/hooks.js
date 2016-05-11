Router.onBeforeAction(function(){
  this.render('loading');
  if(!Meteor.userId()){
  	this.render('permissions');
  } else {
    this.next();
  }
}, {except: ['home']});