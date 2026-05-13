import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Collections from './pages/Collections';
import Trending from './pages/Trending';
import BragYourOwn from './pages/BragYourOwn';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

// Layout wrapper for public pages (includes Navbar + Footer)
function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes with Navbar + Footer */}
        <Route
          path="/"
          element={
            <PublicLayout>
              <Home />
            </PublicLayout>
          }
        />
        <Route
          path="/collections"
          element={
            <PublicLayout>
              <Collections />
            </PublicLayout>
          }
        />
        <Route
          path="/trending"
          element={
            <PublicLayout>
              <Trending />
            </PublicLayout>
          }
        />
        <Route
          path="/brag-your-own"
          element={
            <PublicLayout>
              <BragYourOwn />
            </PublicLayout>
          }
        />
        <Route
          path="/about"
          element={
            <PublicLayout>
              <About />
            </PublicLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <PublicLayout>
              <Contact />
            </PublicLayout>
          }
        />
        <Route
          path="/cart"
          element={
            <PublicLayout>
              <Cart />
            </PublicLayout>
          }
        />
        <Route
          path="/checkout"
          element={
            <PublicLayout>
              <Checkout />
            </PublicLayout>
          }
        />

        {/* Admin routes — no Navbar/Footer */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route
          path="*"
          element={
            <PublicLayout>
              <div className="max-w-xl mx-auto text-center py-40">
                <p className="font-serif text-8xl text-charcoal/10 mb-4">404</p>
                <h1 className="font-serif text-4xl text-charcoal mb-4">Page Not Found</h1>
                <a href="/" className="text-forest hover:underline font-medium">← Back to Home</a>
              </div>
            </PublicLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
