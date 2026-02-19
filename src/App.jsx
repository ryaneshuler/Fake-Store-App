import './App.css'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import NavBar from './components/NavBar'
import ProductListing from './components/ProductListingPage'

function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/productlisting" element={<ProductListing />} />
      </Routes>
    </>
  )
}

export default App
