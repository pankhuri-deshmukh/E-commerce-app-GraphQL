import React from 'react';
import { CartItemProps } from '../interfaces/Cart';
import { useMutation } from '@apollo/client';
import { REMOVE_ITEM_FROM_CART } from '../graphql/mutations/Cart';
import { useNavigate } from 'react-router-dom';
import { AiOutlineDelete } from 'react-icons/ai';
import { VIEW_CART } from '../graphql/queries/Cart';

const CartItemCard: React.FC<CartItemProps> = ({ item }) => {

  const [removeItemFromCart] = useMutation(REMOVE_ITEM_FROM_CART);
  const navigate = useNavigate()

  const handleDelete = async () => {

  const token = sessionStorage.getItem('token');
  if (!token) {
    navigate("/")  
  }

  try {
    const id = Number(item.cart_item_id)
    
    const { data } = await removeItemFromCart({
      variables: {cart_item_id: id , token },
      refetchQueries:[{ query: VIEW_CART, variables:{ token }}]
    });
    console.log(data)
    if (data) {
      console.log("Successfully removed from cart")
    }
  } 
  catch (error) {
    console.error("Remove from cart error:", error);
  }

  }
  return (
    <div className="border p-4 rounded-lg mb-4 shadow-md">
      <h2 className="text-xl font-semibold mb-2">{item.product.name}</h2>
      <p className="text-gray-700">Price: Rs. {item.product.price}</p>
      <p className="text-gray-700">Quantity: {item.quantity}</p>
      <p className="text-gray-700">Subtotal: Rs. {item.subtotal}</p>
      {/* You can add more details here as needed */}
      <div onClick={handleDelete}>
        <AiOutlineDelete />
      </div>
    </div>
  );
};

export default CartItemCard;
