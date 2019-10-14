const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schemaV2');
const { graphql, buildSchema } = require('graphql');

const app = express();

mongoose.connect('mongodb://gruppe16:Hemmelig@it2810-16.idi.ntnu.no:27017/movies', {useNewUrlParser: true});
mongoose.connection.once('open', () => {
  console.log('connected to database');
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(4000, () => {
  console.log('Now listening for request on port 4000');
});
