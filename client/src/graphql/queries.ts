import { gql } from "@apollo/client";

// PRODUCT //////////////////////////////

export const GET_ALL_PRODUCTS = gql`
  query GetAllProducts {
    getAllProducts {
      product_id
      name
      description
      price
      category
      quantity
      image
    }
  }
`;

export const GET_PRODUCT_BY_ID = gql`
  query GetProductById($id: Int!) {
    getProductById(id: $id) {
      product_id
      name
      description
      price
      category
      quantity
      image
    }
  }
`;

// CART ////////////////////////////////

export const VIEW_CART = gql`
  query ViewCart($token: String!) {
    viewCart(token: $token) {
      cart_item_id
      quantity
      subtotal
      cart {
        cart_id
      }
      product {
        name
      }
    }
  }
  `;

// ORDER ////////////////////////////

export const VIEW_ALL_ORDERS = gql`
query ViewAllOrders($token: String!) {
  viewAllOrders(token: $token) {
    order_id
    user {
      user_id
    }
  }
}
`;

export const VIEW_ORDER_DETAILS = gql`
`;