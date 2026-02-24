import { Routes, Route, Navigate } from 'react-router-dom'
import ProductPage from './pages/ProductPage'
import OrdersPage from './pages/OrdersPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/products/iphone-17-pro" replace />} />
      <Route path="/products/:slug" element={<ProductPage />} />
      <Route path="/orders" element={<OrdersPage />} />
    </Routes>
  )
}
