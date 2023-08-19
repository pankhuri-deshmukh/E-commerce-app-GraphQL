import React, { useState } from 'react';
import { OrderProps } from '../interfaces/Order';
import OrderItemCard from './OrderItemCard'; // Import your OrderItemCard component
import { useQuery } from '@apollo/client'; // Import useQuery
import { VIEW_ORDER_DETAILS } from '../graphql/queries/Order'; // Import your GraphQL query

const OrderCard: React.FC<OrderProps> = ({ order }) => {
  const [showDetails, setShowDetails] = useState(false);

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
    </div>
  );
};

export default OrderCard;
