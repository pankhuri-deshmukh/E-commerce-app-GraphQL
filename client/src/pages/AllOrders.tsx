import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Order } from '../interfaces/Order';
import OrderCard from '../components/OrderCard';
import { VIEW_ALL_ORDERS } from '../graphql/queries';

const AllOrders: React.FC = () => {
  const [allOrders, setAllOrders] = useState<Order[]>([]);

  const { loading, error, data } = useQuery(VIEW_ALL_ORDERS); 
  useEffect(() => {
    if (data) {
      setAllOrders(data.viewOrders); 
    }
  }, [data]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching orders.</p>;
  }

  //initially, display Order[]
  //OnClick 'details' button on OrderCard - expand div, display OrderItem[] inside that order, replace 'details' button with a minimize icon and a cancel button
  return (
    <>
    <h1 className="text-2xl font-semibold mb-4">All Orders</h1>
      <div className="grid grid-cols-2 gap-4">
      {allOrders.map((order) => (
        <OrderCard key={order.order_id} order={order} />
      ))}
    </div>
      
    </>
  );
};

export default AllOrders;
