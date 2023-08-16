import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ALL_PRODUCTS } from '../graphql/queries'; // Import your GraphQL query
import ProductCard from '../components/ProductCard';

interface Product {
  product_id: number; // Assuming your product has an 'id' field
  name: string;
  description: string;
  price: string;
  category: string;
  quantity: number;
  image: string;
}

const ProductPage: React.FC = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  // const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS); 
  useEffect(() => {
    if (data) {
      setAllProducts(data.getAllProducts); 
    }
  }, [data]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching products.</p>;
  }

  return (
    <>
      <Link to="/products/add">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Product
        </button>
      </Link>
      <div className="grid grid-cols-2 gap-4">
      {allProducts.map((product) => (
        <ProductCard key={product.product_id} product={product} />
      ))}
    </div>
      
    </>
  );
};

export default ProductPage;
