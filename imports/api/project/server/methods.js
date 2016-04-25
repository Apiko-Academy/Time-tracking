import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.methods({
  projectCreate: function(projectAttributes) {
    check(projectAttributes, {
      name: String,
      clientId: String,
      color: String,
      public: Boolean
    });

    let project = Project.findOne({name: projectAttributes.name, managers: this.userId});

    if(!project && this.userId){
      return Project.insert({
        name: projectAttributes.name,
        clientId: projectAttributes.clientId,
        createdAt: new Date(),
        managers: [this.userId],
        workers: [],
        color: projectAttributes.color
      });
    } else if(project){
      return project._id;
    }
  },

});