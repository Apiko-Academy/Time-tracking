import './select-dropdown.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

Template.Select_dropdown.onRendered(function(){
  let tmpl = this;
  this.isRendered = true;

  tmpl.$(this.className).selectpicker().on('changed.bs.select', function(e){
    if(_.isFunction(tmpl.data.onChanged)){
      tmpl.data.onChanged(e);
    }
  });
});

Template.Select_dropdown.onCreated(function(){
  this.isRendered = false;
  this.className = '.' + this.data.class;
});

Template.Select_dropdown.helpers({
  'refresh': function(){
    let tmpl = Template.instance();
  	if(tmpl.isRendered){
      Meteor.setTimeout(function() {
        tmpl.$(tmpl.className).selectpicker('refresh');
      }, 1500);
  	}
  }
});