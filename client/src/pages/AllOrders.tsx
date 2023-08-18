import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ALL_PRODUCTS } from '../graphql/queries'; 
import { Order } from '../interfaces/Order';
import OrderCard from '../components/OrderCard';

const AllOrders: React.FC = () => {
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  // const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS); 
  useEffect(() => {
    if (data) {
      setAllOrders(data.getAllProducts); 
    }
  }, [data]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching products.</p>;
  }

  //initially, display Order[]
  //OnClick OrderCard - display OrderItem[] inside that order
  return (
    <>
    <h1 className="text-2xl font-semibold mb-4">All Products</h1>
      <div className="grid grid-cols-2 gap-4">
      {allOrders.map((order) => (
        <OrderCard key={order.order_id} order={order} />
      ))}
    </div>
      
    </>
  );
};

export default AllOrders;
