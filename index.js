const { Keystone } = require('@keystonejs/keystone');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const initialiseData = require('./initial-data');
const fs = require('fs');

// Remove the adapter you don't need before running
const { KnexAdapter: Adapter } = require('@keystonejs/adapter-knex');
const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose');

const PROJECT_NAME = 'Project Name';
// Remove the config you don't need before running
const adapterConfig = { mongoUri: 'mongodb://app:password@localhost/db_name' };
const adapterConfig = { knexOptions: { connection: 'postgres://app:password@localhost/db_name', dropDatabase: true } };


const keystone = new Keystone({
  name: PROJECT_NAME,
  adapter: new Adapter(adapterConfig),
  onConnect: process.env.CREATE_TABLES !== 'true' && initialiseData,
});

const pathToLists = require("path").join(__dirname, "./lists");
fs.readdirSync(pathToLists).forEach(function(file) {
  const list = require('./lists/' + file);
  keystone.createList(list.name, list.schema);
});

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'User',
});

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new AdminUIApp({
      enableDefaultRoute: true,
      authStrategy,
    }),
  ],
};
