// all collections definitions

import { Mongo } from 'meteor/mongo';

const Clients = new Mongo.Collection('clients');

const Organisations = new Mongo.Collection('organisation');

const Projects = new Mongo.Collection('project');

export {Clients, Organisations, Projects};
