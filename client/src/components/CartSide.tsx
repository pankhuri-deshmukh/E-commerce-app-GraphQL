import React, { useEffect, useState } from 'react';
import CartItemCard from './CartItemCard';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { CartItem } from '../interfaces/Cart';
import { VIEW_CART } from '../graphql/queries';

const CartSide = () => {
  const navigate = useNavigate();
  const [allCartItems, setAllCartItems] = useState<CartItem[]>([]);

  const { loading, error, data } = useQuery(VIEW_CART); 

  useEffect(() => {
    if (data) {
      setAllCartItems(data.getAllProducts); 
    }
  }, [data]);

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
  
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching items.</p>;
  }

  // If user is successfully logged in, show cart items and "View All Orders" button
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">All Cart Items</h1>
      <div>
      {allCartItems.map((item) => (
        <CartItemCard key={item.cart_item_id} item={item} />
      ))}
      </div>
      <button onClick={() => navigate('/myorders')}>View All Orders</button>
    </div>
  );
};

export default CartSide;
