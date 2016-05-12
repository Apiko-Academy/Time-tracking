// all collections definitions

import { Mongo } from 'meteor/mongo';

const Clients = new Mongo.Collection('clients');

const Organisation = new Mongo.Collection('organisation');

const Project = new Mongo.Collection('project');

export {Clients, Organisation, Project};
