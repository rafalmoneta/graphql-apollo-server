import cors from 'cors';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
 
import schema from './schema';
import resolvers from './resolvers';
import models from './models';

const app = express();
app.use(cors()); 

const schema = gql`
  type Query {
    users: [User!]
    user(id: ID!): User
    me: User
 
    messages: [Message!]!
    message(id: ID!): Message!
  }
 
  type User {
    id: ID!
    username: String!
  }
 
  type Message {
    id: ID!
    text: String!
  }
`;

let messages = {
  1: {
    id: '1',
    text: 'Hello World',
  },
  2: {
    id: '2',
    text: 'By World',
  },
};

let users = {
  1: {
    id: '1',
    username: 'Rafał Moneta',
  },
  2: {
    id: '2',
    username: 'Leo Messi',
  },
};
 
const me = users[1];
 
const resolvers = {
  Query: {
    users: () => {
      return Object.values(users);
    },
    user: (parent, { id }) => {
      return users[id];
    },
    me: () => {
      return me;
    },
    messages: () => {
      return Object.values(messages);
    },
    message: (parent, { id }) => {
      return messages[id];
    },
  },
 
  User: {
    username: user => {
      return user.username;
    }
  },
};


const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    models,
    me: models.users[1],
  }
});
 
server.applyMiddleware({ app, path: '/graphql' });
 
app.listen({ port: 8000 }, () => {
  console.log('Apollo Server on http://localhost:8000/graphql');
});