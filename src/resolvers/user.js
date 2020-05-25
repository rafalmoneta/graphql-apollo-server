export default {
  Query: {
    users: (parent, args, { models }) => {
      ...
    },
    user: (parent, { id }, { models }) => {
      ...
    },
    me: (parent, args, { me }) => {
      ...
    },
  },
 
  User: {
    messages: (user, args, { models }) => {
      ...
    },
  },
};