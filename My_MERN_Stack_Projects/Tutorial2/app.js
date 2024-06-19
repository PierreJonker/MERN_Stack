const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Event = require('./models/event.js'); // Ensure this path is correct and the Event model is defined properly
const User = require('./models/user.js');

const app = express();

app.use(bodyParser.json());

app.use('/graphql', graphqlHTTP({
  schema: buildSchema(`
    type Event {
      _id: ID!
      title: String!
      description: String!
      price: Float!
      date: String!
      creator: User!
    }

    type User {
      _id: ID!
      email: String!
      password: String
      createdEvents: [Event!]
    }

    input EventInput {
      title: String!
      description: String!
      price: Float!
      date: String!
    }

    input UserInput {
      email: String!
      password: String!
    }

    type RootQuery {
      events: [Event!]!
    }

    type RootMutation {
      createEvent(eventInput: EventInput): Event
      createUser(userInput: UserInput): User
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `),
  rootValue: {
    events: () => {
      return Event.find()
        .then(events => {
          return events.map(event => {
            return { ...event._doc, _id: event.id };
          });
        }).catch(err => {
          throw err;
        });
    },
    createEvent: (args) => {
      const event = new Event({
        title: args.eventInput.title,
        description: args.eventInput.description,
        price: args.eventInput.price,
        date: new Date(args.eventInput.date),
        creator: '66729cf0263ff64f6498fc53' // Static ID for testing; replace with dynamic ID
      });

      let createdEvent;
      return event
        .save()
        .then(result => {
          createdEvent = { ...result._doc, _id: result.id };
          return User.findById('66729cf0263ff64f6498fc53'); // Static ID for testing; replace with dynamic ID
        })
        .then(user => {
          if (!user) {
            throw new Error('User not found.');
          }
          user.createdEvents.push(event);
          return user.save();
        })
        .then(() => {
          return createdEvent;
        })
        .catch(err => {
          console.log(err);
          throw err;
        });
    },
    createUser: (args) => {
      return User.findOne({ email: args.userInput.email }).then(user => {
        if (user) {
          throw new Error('User exists already.');
        }
        return bcrypt
          .hash(args.userInput.password, 12)
          .then(hashedPassword => {
            const newUser = new User({
              email: args.userInput.email,
              password: hashedPassword
            });
            return newUser.save();
          })
          .then(result => {
            return { ...result._doc, password: null, _id: result.id };
          });
      }).catch(err => {
        throw err;
      });
    }
  },
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
