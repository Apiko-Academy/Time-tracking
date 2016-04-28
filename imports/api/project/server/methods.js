import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.methods({
  'project.create': function(projectAttributes) {
    check(projectAttributes, {
      name: String,
      clientId: String,
      color: String,
      public: Boolean
    });

    let project = Project.findOne({name: projectAttributes.name, managers: this.userId});

    if(!project && this.userId){
      projectAttributes = _.extend(projectAttributes, {
        createdAt: new Date(),
        managers: [this.userId],
        workers: []
      });

      return Project.insert(projectAttributes);
    } else if(project){
      throw new Meteor.Error('Project is already exists');
    }
  },

});