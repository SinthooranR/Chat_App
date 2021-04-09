import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String) {
    login(email: $email, password: $password) {
      user_id
      name
      email
      token
    }
  }
`;

export const SIGNUP = gql`
  mutation signup(
    $name: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    signup(
      name: $name
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    ) {
      user_id
      name
      email
      token
    }
  }
`;
