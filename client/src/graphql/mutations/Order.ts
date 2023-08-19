import { gql } from "@apollo/client";

export const CREATE_ORDER = gql`
  mutation createOrder($payment_status: String!, $token: String!) {
    createOrder(payment_status: $payment_status, token: $token) {
      order_id
      payment_status
      total_amount
      user {
        user_id
        email
        role
      }
    }
  }
`;
