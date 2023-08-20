import React from 'react';
import { OrderItemProps } from '../interfaces/Order';

const OrderItemCard: React.FC<OrderItemProps> = ({ item }) => {
  return (
    <div className="border p-2 mb-2 rounded-md shadow-sm" key={item.item_id}>
      <h4 className="text-md font-semibold">{item.product.name}</h4>
      <p>Quantity: {item.quantity}</p>
      <p>Subtotal: {item.subtotal}</p>
    </div>
  );
};

export default OrderItemCard;
