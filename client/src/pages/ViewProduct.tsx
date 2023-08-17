import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_PRODUCT_BY_ID } from '../graphql/queries';

interface Product {
  product_id: number;
  name: string;
  description: string;
  price: string;
  category: string;
  quantity: number;
  image: string;
}

type IDParams = {
  id: string;
};

function invariant(value: unknown): asserts value {
  if (value) return;
  throw new Error("Invariant violation");
}

const ViewProduct: React.FC = () => {
  const { id } = useParams<IDParams>();
  invariant(id)

  const parsedId = parseInt(id);

  const { loading, error, data } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { id: parsedId },
  });


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const product: Product = data.getProductById;

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
      <button>Add to cart</button>
    </div>
  );
};

export default ViewProduct;
