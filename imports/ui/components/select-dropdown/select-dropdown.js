import './select-dropdown.html';
import 'meteor/natestrauser:select2';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

Template.Select_dropdown.onRendered(function(){
  let className = '.' + this.data.class;
  let eventCallback = (e)=>{
    if(_.isFunction(this.data.onChanged)){  
      this.data.onChanged(e);
    }
  }

  this.$(className).select2({
    dropdownAutoWidth : true,
    placeholder: this.data.title
  }).on("select2:select", eventCallback)
    .on("select2:unselect", eventCallback);
});
