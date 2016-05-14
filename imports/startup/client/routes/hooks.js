import { Router } from 'meteor/iron:router';
// loading
import '/imports/ui/pages/loading.html';
// permissions
import '/imports/ui/components/permissions-page/permissions.html';

Router.onBeforeAction(function(){
  this.render('loading');
  if(!Meteor.userId()){
  	this.render('permissions');
  } else {
    this.next();
  }
}, {except: ['home', 'signin', 'signup']});