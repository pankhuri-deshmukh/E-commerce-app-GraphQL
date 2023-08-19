import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { GET_PRODUCT_BY_ID } from '../graphql/queries/Product';
import { ADD_ITEM_TO_CART } from '../graphql/mutations/Cart';
import { Product } from '../interfaces/Product';

type IDParams = {
  id: string;
};

function invariant(value: unknown): asserts value {
  if (value) return;
  throw new Error("Invariant violation");
}

const ViewProduct: React.FC = () => {

  const [addItemToCart] = useMutation(ADD_ITEM_TO_CART);

  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)

  const { id } = useParams<IDParams>();
  invariant(id)

  const parsedId = parseInt(id);

  const { loading, error, data } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { id: parsedId },
  });


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const product: Product = data.getProductById;
  const product_id = Number(product.product_id)

  
  const handleAddToCart = async () => {
    //if user is authenticated, add to cart
    //else, redirect to login page 

    const token = sessionStorage.getItem('token');
    

  if (!token) {
    navigate("/login")  
  }

  try {
    const { data } = await addItemToCart({
      variables: {product_id, quantity , token },
    });
    if (data) {
      console.log("Successfully added to cart")
    }
  } 
  catch (error) {
    console.error("Add to cart error:", error);
  }
  }

  return (
    <div className="border p-4 rounded-lg shadow-md">
      {/* <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover mb-2 rounded-md"
      /> */}
      <h1 className="text-xl font-bold text-blue-700">{product.name}</h1>
      <p className="text-gray-700 mb-2">{product.description}</p>
      <p className="text-gray-900 font-semibold">Price: Rs. {product.price}</p>
      <p className="text-gray-900">Category: {product.category}</p>
      {/* <p className="text-gray-900">Quantity: {product.quantity}</p> */}
      <label className="block mb-2">
          Quantity:
          <input
            type="number"
            name="quantity"
            value={quantity}
            onChange={(event) => {
              setQuantity(parseInt(event.target.value));
            }}
            placeholder=""
            className="block w-full mt-1 p-2 border rounded-md"
          />
        </label>

      <button onClick={handleAddToCart}>Add to cart</button>
    </div>
  );
};

export default ViewProduct;
