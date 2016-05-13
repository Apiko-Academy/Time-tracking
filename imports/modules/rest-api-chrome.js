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
