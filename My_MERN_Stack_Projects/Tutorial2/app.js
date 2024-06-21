const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');

const graphiqlSchema = require('./graphql/schema/index.js');
const graphiqlResolvers = require('./graphql/resolvers/index.js');
const isAuth = require('./middleware/is-auth');

const app = express();

app.use(bodyParser.json());

app.use(isAuth);

app.use('/graphql', graphqlHTTP({
  schema: graphiqlSchema,
  rootValue: graphiqlResolvers,
  graphiql: true
}));

// Print environment variables for debugging
console.log('MONGO_USER:', process.env.MONGO_USER);
console.log('MONGO_PASSWORD:', process.env.MONGO_PASSWORD);
console.log('MONGO_DB:', process.env.MONGO_DB);

const connectionString = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@mern.lr0r4rq.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority&appName=MERN`;
console.log('Connecting to MongoDB with URI:', connectionString);

mongoose.connect(connectionString)
  .then(() => {
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch(err => {
    console.log('Database connection error:', err);
  });
