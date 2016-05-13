import { Meteor } from 'meteor/meteor';
import { Restivus } from "meteor/nimble:restivus";

import { Timers, Tasks, Project } from "../api/collections.js";

const chromeExtApi = new Restivus({useDefaultAuth: true});

// GET single project as JSON by id
chromeExtApi.addRoute("project/:id", {
  get() {
    const id = this.urlParams.id;
    return {status: "success", data: Project.findOne({_id: id})};
  }
});

// add and start new timer via POST
chromeExtApi.addRoute("timers/start", {
  post() {
    try {
      const startedTimerId = Meteor.call("timers.start", this.bodyParams);
      return {status: "success", data: startedTimerId};
    } catch (err) {
      return {status: "error", data: err.message};
    }
  }
});

// stop timer by id
chromeExtApi.addRoute("timers/stop/:id", {
  post() {
    try {
      Meteor.call("timers.stop", this.urlParams.id);
      return {status: "success", data: this.urlParams.id};
    } catch(err) {
      return {status: "error", data: err.message};
    }
  }
});

// get total time for a task
chromeExtApi.addRoute("taskTime/:id", {
  get(){
    if (Tasks.find({_id: this.urlParams.id}).count() === 0) {
      return {status: "error", data: "no task with id " + this.urlParams.id};
    }

    let totalTimeElapsed = 0;
    const currentTime = new Date();
    const timers = Timers.find({taskId: this.urlParams.id});
    timers.forEach((timer) => {
      let elapsedByTimer;
      // if there're ticking timers for task take their currently elapsed time
      if(timer.ticking){
        elapsedByTimer = currentTime - timer.startedAt;
      } else {
        elapsedByTimer = timer.elapsed;
      }
      totalTimeElapsed +=elapsedByTimer;
    });
    return {status: "success", data: totalTimeElapsed};
  }
});