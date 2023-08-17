import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ALL_PRODUCTS } from '../graphql/queries'; 
import ProductCard from '../components/ProductCard';

interface Product {
  product_id: number; 
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
    <h1 className="text-2xl font-semibold mb-4">All Products</h1>
      <div className="grid grid-cols-2 gap-4">
      {allProducts.map((product) => (
        <ProductCard key={product.product_id} product={product} />
      ))}
    </div>
      
    </>
  );
};

export default ProductPage;
