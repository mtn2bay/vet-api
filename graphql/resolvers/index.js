const _ = require('lodash');

const ownerResolver = require('./owner');
const animalResolver = require('./animal');
const appointmentResolver = require('./appointment');

const resolvers = _.merge(
  ownerResolver,
  animalResolver,
  appointmentResolver
);

module.exports = resolvers;