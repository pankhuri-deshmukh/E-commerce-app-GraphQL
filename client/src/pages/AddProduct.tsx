import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_PRODUCT } from '../graphql/mutations';

interface Product {
  name: string;
  description: string;
  price: string;
  category: string;
  quantity: number;
  image: string;
}

const AddProduct: React.FC = () => {
  const initialValues: Product = {
    name: '',
    description: '',
    price: '',
    category: '',
    quantity: 0,
    image: '',
  };

  const [formData, setFormData] = useState<Product>(initialValues);

  const [addProduct] = useMutation(ADD_PRODUCT);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const { name, description, price, category, quantity, image } = formData;

      await addProduct({
        variables: {
          input: {
            name,
            description,
            price: parseFloat(price),
            category,
            quantity,
            image,
          },
        },
      });

      console.log('Product added successfully!');
      // You can perform any additional actions after the mutation here.

      // Reset the form after successful submission
      setFormData(initialValues);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Add a New Product</h1>
      <form onSubmit={handleSubmit}>
      <label className="block mb-2">
          Product Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter product name"
            className="block w-full mt-1 p-2 border rounded-md"
          />
        </label>

        <label className="block mb-2">
          Description:
          <input
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Describe product here..."
            className="block w-full mt-1 p-2 border rounded-md"
          />
        </label>

        <label className="block mb-2">
          Price per unit:
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder=""
            className="block w-full mt-1 p-2 border rounded-md"
          />
        </label>

        <label className="block mb-2">
          Product Category:
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            placeholder=""
            className="block w-full mt-1 p-2 border rounded-md"
          />
        </label>

        <label className="block mb-2">
          Quantity:
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            placeholder=""
            className="block w-full mt-1 p-2 border rounded-md"
          />
        </label>

        <label className="block mb-2">
          Image URL:
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            placeholder=""
            className="block w-full mt-1 p-2 border rounded-md"
          />
        </label>

        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 mt-4"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
