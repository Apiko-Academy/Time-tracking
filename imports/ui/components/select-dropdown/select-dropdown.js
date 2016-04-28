import './select-dropdown.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

Template.Select_dropdown.onRendered(function(){
  let className = '.' + this.data.class;
  
  this.autorun(()=>{
    Template.currentData();
    console.log("rerun", this.className);
    this.$(className).selectpicker('refresh');
  });

  this.$(this.className).selectpicker().on('changed.bs.select', (e)=>{
    if(_.isFunction(this.data.onChanged)){
      this.data.onChanged(e);
    }
  });
});
