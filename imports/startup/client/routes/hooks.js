import './config.js';
import '../../../ui/components/permissions-page/permissions.html';

import { Meteor } from 'meteor/meteor';

Router.onBeforeAction(function(){
  this.render('loading');
  if(!Meteor.userId()){
  	this.render('permissions');
  } else {
    this.next();
  }
}, {except: ['home']});