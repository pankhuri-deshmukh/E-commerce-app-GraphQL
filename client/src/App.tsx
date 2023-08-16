import React from 'react';
import { Routes, Route } from "react-router-dom"
import ProductPage from './pages/ProductPage';
import AddProduct from './pages/AddProduct';
import ViewProduct from './pages/ViewProduct';


function App() {
  return (
    <Routes>
      <Route path='/products' element={<ProductPage />} />
      <Route path='/products/add' element={<AddProduct />} />
      <Route path='/products/:id' element={<ViewProduct />} />
    </Routes>
  );
}

export default App;
