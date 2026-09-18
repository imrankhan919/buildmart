import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import { ToastProvider } from './components/common/Toast.jsx';
import ProtectedRoute from './components/common/ProtectedRoute.jsx';
import { AdminOnly } from './components/common/RoleRoute.jsx';
import ErrorBoundary from './components/common/ErrorBoundary.jsx';
import AuthBootstrap from './components/common/AuthBootstrap.jsx';
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
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthBootstrap>
          <ErrorBoundary>
            <div className="flex flex-col min-h-screen bg-slate-50">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/marketplace" element={<Marketplace />} />
                  <Route path="/marketplace/:id" element={<ProductDetail />} />
                  <Route path="/vendors" element={<Vendors />} />
                  <Route path="/vendors/:id" element={<VendorProfile />} />
                  <Route path="/floor-plan" element={<FloorPlanGenerator />} />
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <UserProfile />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin"
                    element={
                      <AdminOnly>
                        <AdminDashboard />
                      </AdminOnly>
                    }
                  />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </ErrorBoundary>
        </AuthBootstrap>
      </ToastProvider>
    </BrowserRouter>
  );
}
