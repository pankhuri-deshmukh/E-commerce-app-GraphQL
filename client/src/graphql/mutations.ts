import { gql } from "@apollo/client";

export const ADD_PRODUCT = gql`
  mutation addProduct(
    $name: String!
    $description: String!
    $price: Float!
    $category: String!
    $quantity: Int!
    $image: String!
  ) {
    addProduct(
      name: $name
      description: $description
      price: $price
      category: $category
      quantity: $quantity
      image: $image
    ) {
      name
      price
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      email
      token
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser($name: String!, $username: String!, $password: String!, $email: String!) {
    addUser(name: $name, username: $username, password: $password, email: $email) {
      email
      token
    }
  }
`;
