import jwt from 'jsonwebtoken';
import { AuthenticationError, UserInputError } from 'apollo-server';
import { isAdmin } from './authorization';
import { combineResolvers } from 'graphql-resolvers';


const createToken = async (user, secret, expiresIn) => {
  const { id, email, username, role } = user;
  return await jwt.sign({ id, email, username, role }, secret, {expiresIn});
};

export default {
  Query: {
    users: async (_, args, { models }) => {
      return await models.User.findAll();
    },
    user: async (_, { id }, { models }) => {
      return await models.User.findByPk(id);
    },
    me: async (_, args, { models, userToken }) => {
      return await models.User.findByPk(userToken.id);
    },
  },

  Mutation: {
    signUp: async (_, { input }, { models, secret }) => {
      const user = await models.User.create(input);
      return { 
        token: createToken(user, secret, "30m") // passing user, secret, and time "30m" - means expires after 30 minutes 
      };
    },
    signIn: async (_, { input }, { models, secret }) => {
      const user = await models.User.findByLogin(input.login);
 
      if (!user) {
        throw new UserInputError(
          'No user found with this login credentials.',
        );
      }
 
      const isValid = await user.validatePassword(input.password);
 
      if (!isValid) {
        throw new AuthenticationError('Invalid password.');
      }
 
      return { token: createToken(user, secret, '30m') };
    },
    deleteUser: combineResolvers(
      isAdmin,
      async (_, { id }, { models }) => {
        return await models.User.destroy({
          where: { id },
        });
      },
    ),
  },
 
  User: {
    messages: async (user, args, { models }) => {
      return await models.Message.findAll({
        where: {
          userId: user.id,
        },
      });
    },
  },
};