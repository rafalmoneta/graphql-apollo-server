import { v4 as uuidv4 } from 'uuid';
 
export default {
  Query: {
    messages: (parent, args, { models }) => {
      ...
    },
    message: (parent, { id }, { models }) => {
      ...
    },
  },
 
  Mutation: {
    createMessage: (parent, { text }, { me, models }) => {
      ...
    },
 
    deleteMessage: (parent, { id }, { models }) => {
      ...
    },
  },
 
  Message: {
    user: (message, args, { models }) => {
      ...
    },
  },
};