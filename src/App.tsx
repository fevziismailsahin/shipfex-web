import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Inventory from './pages/Inventory';
import Orders from './pages/Orders';
import Login from './pages/Login';
import Tracking from './pages/Tracking'; // <--- YENİ: Sayfayı import ediyoruz

// --- PROTECTED ROUTE COMPONENT ---
const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes (Requires Login) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Navigate to="/inventory" replace />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="orders" element={<Orders />} />
            
            {/* YENİ: Dinamik ID alan Kargo Takip Rotası */}
            <Route path="orders/:id/tracking" element={<Tracking />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;