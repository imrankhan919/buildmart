import React from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import ProductDetail from './pages/ProductDetail';
import Vendors from './pages/Vendors';
import VendorProfile from './pages/VendorProfile';
import FloorPlanGenerator from './pages/FloorPlanGenerator';
import Dashboard from './pages/Dashboard';
import UserProfile from './pages/UserProfile';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-slate-50">
          {/* Navigation Bar at the top of every page */}
          <Navbar />

          {/* Main Content Area */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/marketplace/:id" element={<ProductDetail />} />
              <Route path="/vendors" element={<Vendors />} />
              <Route path="/vendors/:id" element={<VendorProfile />} />
              <Route path="/floor-plan" element={<FloorPlanGenerator />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>

          {/* Footer at the bottom of every page */}
          <Footer />
          {/* <Toaster /> */}
        </div>
      </BrowserRouter>
    </>
  );
}
