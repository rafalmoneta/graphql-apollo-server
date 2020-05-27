import { gql } from 'apollo-server-express';
 
export default gql`
  extend type Query {
    users: [User!]
    user(id: ID!): User
    me: User
  }

  input SignUpInput {
    username: String!
    email: String!
    password: String!
  }

  input SignInInput {
    login: String!
    password: String!
  }

  extend type Mutation {
    signUp(input: SignUpInput!): Token!
    signIn(input: SignInInput!): Token!
    deleteUser(id: ID!): Boolean!
  }
 
  type Token {
    token: String!
  }
 
  type User {
    id: ID!
    username: String!
    messages: [Message!]
    email: String!
    role: String
  }
`;