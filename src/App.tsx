import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Suspense } from 'react'
import Layout from './components/layout/Layout'
import Loading from './components/common/Loading'
import ErrorBoundary from './components/common/ErrorBoundary'

// Pages
import Home from './pages/Home'
import ProductCatalog from './pages/ProductCatalog'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'
import AdminDashboard from './pages/admin/Dashboard'

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <Suspense fallback={<Loading />}>
                  <Home />
                </Suspense>
              }
            />
            <Route
              path="products"
              element={
                <Suspense fallback={<Loading />}>
                  <ProductCatalog />
                </Suspense>
              }
            />
            <Route
              path="products/:id"
              element={
                <Suspense fallback={<Loading />}>
                  <ProductDetail />
                </Suspense>
              }
            />
            <Route
              path="cart"
              element={
                <Suspense fallback={<Loading />}>
                  <Cart />
                </Suspense>
              }
            />
            <Route
              path="checkout"
              element={
                <Suspense fallback={<Loading />}>
                  <Checkout />
                </Suspense>
              }
            />
            <Route
              path="profile"
              element={
                <Suspense fallback={<Loading />}>
                  <Profile />
                </Suspense>
              }
            />
          </Route>

          {/* Auth Routes */}
          <Route
            path="/login"
            element={
              <Suspense fallback={<Loading />}>
                <Login />
              </Suspense>
            }
          />
          <Route
            path="/register"
            element={
              <Suspense fallback={<Loading />}>
                <Register />
              </Suspense>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <Suspense fallback={<Loading />}>
                <AdminDashboard />
              </Suspense>
            }
          />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  )
}

export default App
