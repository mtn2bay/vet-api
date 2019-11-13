const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/schema/index');
const resolvers = require('./graphql/resolvers/index');

const PORT = process.env.PORT || 4000;
const DB_PATH = `mongodb+srv://${process.env.MONGO_USER}:${
  process.env.MONGO_PASSWORD}@vetservice-ijcbg.mongodb.net/${
  process.env.MONGO_DB}?retryWrites=true&w=majority`;

const app = express();

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

mongoose.connect(DB_PATH, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('Connected to database');
  app.listen({ port: PORT }, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Access the GraphQL playground at http://localhost:${PORT}${server.graphqlPath}`);
  });
}).catch((err) => console.log(err));
