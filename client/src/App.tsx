import React from 'react';
import {ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { Routes, Route } from "react-router-dom"
import ProductPage from './pages/ProductPage';
import AddProduct from './pages/AddProduct';
import ViewProduct from './pages/ViewProduct';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';



function App() {

  const client = new ApolloClient({
    uri: "http://localhost:4001/graphql",
    cache: new InMemoryCache(),
  })

  return (
    <ApolloProvider client={client}>
    <div>
      <Navbar/>
    <Routes>
      <Route path='/' element={<ProductPage />} />
      <Route path='/products/add' element={<AddProduct />} />
      <Route path='/products/:id' element={<ViewProduct />} />
      <Route path='/user' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
    </Routes>
    </div>
  </ApolloProvider>
  )
  
}

export default App;
