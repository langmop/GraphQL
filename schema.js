import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Query {
    users: [User]
    user(_id: ID): User
    quotes: [Quote]
    byQuotes(by: ID): [Quote]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    quotes: [Quote]
  }

  type Quote {
    name: String
    by: ID!
    userName: UserName
  }

  type UserName {
    firstName: String
    lastName: String
  }

  type Mutation {
    signupUser(userInput: NewUser!): User
    signinUser(userCredInput: OldUser!): Token
    addQuote(name: String!): String
  }

  type Token {
    token: ID
  }

  input OldUser {
    email: String!
    password: String!
  }

  input NewUser {
    email: String!
    firstName: String!
    lastName: String!
    password: String!
  }
`;

export default typeDefs;
