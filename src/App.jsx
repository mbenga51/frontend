import { useState } from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/dashboard'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Adminlayout from './components/layout/adminLayout'
import Products from './pages/Products'
import StockIn from './pages/Stockin'
import StockOut from './pages/Stockout'
import LowStockAlerts from './pages/LowStockAlerts'
import Reports from './pages/Reports'
import Categories from './pages/Catergories'

import './App.css'

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/dashboard" element={<Adminlayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<Products />} /> {/* dashboard/products*/}
            <Route path="stock-out" element={<StockOut />} /> {/* dashboard/stockout*/}
            <Route path="stock-in" element={<StockIn />} /> {/* dashboard/stockin*/}
            <Route path="low-stock-alerts" element={<LowStockAlerts />} /> {/* dashboard/low-stock-alerts*/}
            <Route path="reports" element={<Reports />} /> {/* dashboard/reports*/}
            <Route path="categories" element={<Categories />} /> {/* dashboard/categories*/}
            
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
