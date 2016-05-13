// all collections definitions

import { Mongo } from 'meteor/mongo';

const Clients = new Mongo.Collection('clients');

const Organisations = new Mongo.Collection('organisation');

const Projects = new Mongo.Collection('project');

const Timers = new Mongo.Collection("timers");

const Tasks = new Mongo.Collection("tasks");

export {Clients, Organisations, Projects, Timers, Tasks};
