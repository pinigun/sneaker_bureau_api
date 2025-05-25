import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import '@tabler/core/dist/css/tabler.min.css';
import Layout from './components/layout.jsx'
import Sidebar from './components/sidebar.jsx';
import Dashboard from './pages/dashboard.jsx';
import Stock from './pages/stock.jsx';
import Sell from './pages/sell-offline.jsx';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/stock" element={<Stock />} />
        <Route path="/sell" element={<Sell />} />
      </Routes>
    </Layout>
  </BrowserRouter>
)
