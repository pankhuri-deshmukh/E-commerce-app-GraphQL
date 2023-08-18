import React from 'react';
import CartItemCard from './CartItemCard';
import { useNavigate } from 'react-router-dom';

const CartSide = () => {
  const navigate = useNavigate();

  const token = sessionStorage.getItem('token');

  if (!token) {
    // If no token is present, user is not logged in
    return (
      <div>
        <p>Please log in to view your cart</p>
        <button onClick={() => navigate('/login')}>Login</button>
      </div>
    );
  }

  // If user is logged in, show cart items and "View All Orders" button
  
  return (
    <div>
      <CartItemCard />
      <button onClick={() => navigate('/myorders')}>View All Orders</button>
    </div>
  );
};

export default CartSide;
