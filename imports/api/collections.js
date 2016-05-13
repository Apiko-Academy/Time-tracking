// all collections definitions

import { Mongo } from 'meteor/mongo';

const Clients = new Mongo.Collection('clients');

const Organisation = new Mongo.Collection('organisation');

const Project = new Mongo.Collection('project');

const Timers = new Mongo.Collection("timers");

const Tasks = new Mongo.Collection("tasks");

export {Clients, Organisation, Project, Timers, Tasks};
