import React, { useContext, useEffect, useState } from 'react';
import CartItemCard from './CartItemCard';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { CartItem } from '../interfaces/Cart';
import { VIEW_CART } from '../graphql/queries/Cart'; 
import { CREATE_ORDER } from '../graphql/mutations/Order';
import { ContextTypeCart } from '../interfaces/Context';
import { ContextCart } from './Navbar';

const CartSide = () => {
  const navigate = useNavigate();
  const [allCartItems, setAllCartItems] = useState<CartItem[]>([]);
  const { viewCart, setViewCart } = useContext<ContextTypeCart>(ContextCart);
  const token = sessionStorage.getItem('token');
  const [createOrderMutation] = useMutation(CREATE_ORDER);
  
  const { loading, error, data } = useQuery(VIEW_CART, {
    variables: { token: token },
  }); 

  useEffect(() => {
    if (data) {
      setAllCartItems(data.viewCart); 
    }
  }, [data]);

  
  

  if (!token) {
    // If no token is present, user is not logged in
    return (
      <div>
        <p>Please log in to view your cart</p>
        <button onClick={() => {
          setViewCart(!viewCart)
          navigate('/login')
        }
          }>Login</button>
      </div>
    );
  }
  
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching items.</p>;
  }

  const handleCheckout = async () => {
    try {
      const { data } = await createOrderMutation({
        variables: {
          payment_status: 'successful', //set to 'successful' by default for now
          token: token,
        },
      });

      const newOrder = data.createOrder;
      // Handle the newly created order as needed

      console.log('New order:', newOrder);
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };

  // If user is successfully logged in, show cart items and "View All Orders" button
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">All Cart Items</h1>
      <div>
        {allCartItems.map((item) => (
          <CartItemCard key={item.cart_item_id} item={item} />
        ))}
      </div>
      <button onClick={handleCheckout}>CheckOut</button>
      <button onClick={() => navigate('/myorders')}>View All Orders</button>
    </div>
  );
};

export default CartSide;
