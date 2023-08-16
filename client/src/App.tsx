import React from 'react';
import {ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { Routes, Route } from "react-router-dom"
import ProductPage from './pages/ProductPage';
import AddProduct from './pages/AddProduct';
import ViewProduct from './pages/ViewProduct';



function App() {

  const client = new ApolloClient({
    uri: "http://localhost:4001/graphql",
    cache: new InMemoryCache(),
  })

  return (
    <ApolloProvider client={client}>
    <div>
    <Routes>
      <Route path='/' element={<ProductPage />} />
      <Route path='/products/add' element={<AddProduct />} />
      <Route path='/products/:id' element={<ViewProduct />} />
    </Routes>
    </div>
  </ApolloProvider>
  )
  
}

export default App;
