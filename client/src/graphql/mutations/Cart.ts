import { gql } from "@apollo/client";

// CART //////////////////////////////

export const ADD_ITEM_TO_CART = gql`
  mutation AddItemToCart(
    $product_id: Int
    $quantity: Int
        $token: String
    ) {
      addItemToCart(
        product_id: $product_id
        quantity: $quantity
        token: $token
      ) {
      product {
        name
        price
      }
      subtotal
      cart_item_id
    }
  }
`;


