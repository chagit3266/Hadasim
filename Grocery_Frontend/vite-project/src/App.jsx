import { useState } from 'react'
import './App.css'
import { Routes, Route, Link } from "react-router-dom";
import AuthPage from './Components/AuthPage';
import Home from './Components/Home';
import CreateOrder from './Components/CreateOrder';
import Orders from './Components/Orders';

function App() {
  
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/create-order" element={<CreateOrder />} />
      <Route path="/orders" element={<Orders />} />
    </Routes>
  )
}

export default App
