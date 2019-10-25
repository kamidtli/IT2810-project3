const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');
const schema = require('./schema/schema');

// Express application
const app = express();

// Connects Mongoose to the MongoDB database
mongoose.connect('mongodb://gruppe16:Hemmelig@it2810-16.idi.ntnu.no:27017/movies', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
mongoose.connection.once('open', () => {
  console.log('connected to database');
});

app.use(cors());


// Initializing the GraphQL schema
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(4000, () => {
  console.log('Now listening for request on port 4000');
});
