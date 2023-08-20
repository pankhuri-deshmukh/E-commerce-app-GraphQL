import React, { useState } from 'react';
import { OrderProps } from '../interfaces/Order';
import OrderItemCard from './OrderItemCard'; 
import { useMutation, useQuery } from '@apollo/client'; 
import { VIEW_ORDER_DETAILS } from '../graphql/queries/Order'; 
import { useNavigate } from 'react-router-dom';
import { CANCEL_ORDER } from '../graphql/mutations/Order';

const OrderCard: React.FC<OrderProps> = ({ order }) => {
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate()

  const [cancelOrder] = useMutation(CANCEL_ORDER);

  const { loading, error, data } = useQuery(VIEW_ORDER_DETAILS, {
    variables: { order_id: Number(order.order_id), token: sessionStorage.getItem('token') || ''},
  });

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  if (loading) {
    return <p>Loading order details...</p>;
  }

  if (error) {
    return <p>Error fetching order details.</p>;
  }

  const handleCancel = async () => {

    const token = sessionStorage.getItem('token');
    if (!token) {
      navigate("/")  
    }
  
    try {
      const id = Number(order.order_id)
  
      const { data } = await cancelOrder({
        variables: {order_id: id , token },
      });
      if (data) {
        console.log("Successfully cancelled")
      }
    } 
    catch (error) {
      console.error("Order cancellation error:", error);
    }
  
    }

  return (
    <div className="border p-4 rounded-md shadow-md">
      <h3 className="text-lg font-semibold">Order ID: {order.order_id}</h3>
      <p>Total Amount: {order.total_amount}</p>
      <button
        onClick={toggleDetails}
        className="text-blue-500 hover:underline focus:outline-none"
      >
        {showDetails ? 'Minimize' : 'Details'}
      </button>
      {showDetails && (
        <div className="mt-2">
          <h4 className="text-md font-semibold">Order Items:</h4>
          <ul className="list-disc ml-6">
            {data.viewOrderDetails.map((item: any) => (
              <OrderItemCard key={item.item_id} item={item} />
            ))}
          </ul>
        </div>
      )}
      <div onClick={handleCancel}>
        X
      </div>
    </div>
  );
};

export default OrderCard;
