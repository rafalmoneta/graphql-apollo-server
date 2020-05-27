import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated, isMessageOwner } from './authorization';
 
export default {
  Query: {
    messages: async (_, args, { models }) => {
      return await models.Message.findAll();
    },
    message: async (_, { id }, { models }) => {
      return await models.Message.findByPk(id);
    },
  },
 
  Mutation: {
    createMessage: combineResolvers(
      isAuthenticated,
      async (_, { text }, { models, userToken }) => {
        return await models.Message.create({
          text,
          userId: userToken.id,
        });
      },
    ),
 
    deleteMessage: combineResolvers(
      isAuthenticated,
      isMessageOwner,
      async (_, { id }, { models }) => {
        return await models.Message.destroy({ where: { id } });
      },
    ),
  },
 
  Message: {
    user: async (message, args, { models }) => {
      return await models.User.findByPk(message.userId);
    },
  },
};