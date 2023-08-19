import React from 'react';
import { CartItemProps } from '../interfaces/Cart';

const CartItemCard: React.FC<CartItemProps> = ({ item }) => {
  return (
    <div className="border p-4 rounded-lg mb-4 shadow-md">
      <h2 className="text-xl font-semibold mb-2">{item.product.name}</h2>
      <p className="text-gray-700">Price: Rs. {item.product.price}</p>
      <p className="text-gray-700">Quantity: {item.quantity}</p>
      <p className="text-gray-700">Subtotal: Rs. {item.subtotal}</p>
      {/* You can add more details here as needed */}
    </div>
  );
};

export default CartItemCard;
