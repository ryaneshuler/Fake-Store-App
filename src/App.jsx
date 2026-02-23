import './App.css'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import NavBar from './components/NavBar'
import ProductListing from './components/ProductListingPage'
import ProductDetailsPage from './components/ProductDetailsPage'
import AddProductPage from './components/AddProductPage'
import EditProductPage from './components/EditProductPage'

function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/productlisting" element={<ProductListing />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
        <Route path="/addproduct" element={<AddProductPage />} />
        <Route path="/products/:id/edit" element={<EditProductPage />} />
      </Routes>
    </>
  )
}

export default App
