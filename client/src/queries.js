import { gql } from "apollo-server-core";

export const getQuotes = gql`
  query getQuotes {
    quotes {
      name
      by
      userName {
        firstName
        lastName
      }
    }
  }
`;

export const signup = gql`
  mutation ($NewUser: NewUser!) {
    signupUser(userInput: $NewUser) {
      firstName
      lastName
      email
    }
  }
`;

export const login = gql`
  mutation ($OldUser: OldUser!) {
    signinUser(userCredInput: $OldUser) {
      token
    }
  }
`;

export const getProfile = gql`
  query getUserProfile($_id: ID) {
    user(_id: $_id){
      email
      firstName
      lastName
      quotes {
        name
      }
    }
  }
`;

export const createQuote = gql`
  mutation ($quote: String!) {
    addQuote(name: $quote)
  }
`;
