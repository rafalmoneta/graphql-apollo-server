import { ForbiddenError } from 'apollo-server';
import { combineResolvers, skip } from 'graphql-resolvers';
 
export const isAuthenticated = (_, __, { userToken }) =>
  userToken ? skip : new ForbiddenError('Not authenticated as user.');
 
export const isAdmin = combineResolvers(
  isAuthenticated,
  (_, __, { userToken: { role } }) =>
    role === 'ADMIN'
      ? skip
      : new ForbiddenError('Not authorized as admin.'),
);

export const isMessageOwner = async (_, { id }, { models, userToken }) => {
  const message = await models.Message.findByPk(id, { raw: true });
  
  if (message.userId !== userToken.id) {
    throw new ForbiddenError('Not authenticated as owner.');
  }
  
  return skip;
};