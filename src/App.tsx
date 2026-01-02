import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import MarketingLayout from './layouts/MarketingLayout';
import Inventory from './pages/Inventory';
import Orders from './pages/Orders';
import Tracking from './pages/Tracking';
import PlaceholderPage from './pages/Placeholder';
import AdminOverview from './pages/AdminOverview';
import AdminWebsite from './pages/AdminWebsite';
import AdminWarehouses from './pages/AdminWarehouses';
import TenantOverview from './pages/TenantOverview';
import WMOverview from './pages/WMOverview';
import WMTasks from './pages/WMTasks';
import MerchantOverview from './pages/MerchantOverview';
import Settings from './pages/Settings';
// Marketing Pages
import HomePage from './pages/marketing/Home';
import AboutPage from './pages/marketing/About';
import ServicesPage from './pages/marketing/Services';
import AmazonFBAPage from './pages/marketing/services/AmazonFBA';
import AmazonFBMPage from './pages/marketing/services/AmazonFBM';
import DropshippingPage from './pages/marketing/services/Dropshipping';
import LogisticsPage from './pages/marketing/services/Logistics';
import CustomsPage from './pages/marketing/services/Customs';
import WarehousesPage from './pages/marketing/Warehouses';
import WarehouseDetailPage from './pages/marketing/WarehouseDetail';
import PricingPage from './pages/marketing/Pricing';
import BlogPage from './pages/marketing/Blog';
import ContactPage from './pages/marketing/Contact';
import MarketingLoginPage from './pages/marketing/MarketingLogin';
import MarketingSignupPage from './pages/marketing/MarketingSignup';
import WarehouseLoginPage from './pages/warehouse/WarehouseLogin';
// Legal Pages
import PrivacyPage from './pages/legal/Privacy';
import TermsPage from './pages/legal/Terms';
import PricingTransparencyPage from './pages/legal/PricingTransparency';
import OrderDetailPage from './pages/merchant/OrderDetail';
import { Component, type ReactNode } from 'react';
import { useAuth } from './contexts/AuthContext';

// Error Boundary
class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean; error: Error | null }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    console.error('❌ Error caught by boundary:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
          <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
            <h1 className="text-lg font-semibold text-slate-900">Something went wrong</h1>
            <p className="text-sm text-slate-600 mt-2">{this.state.error?.message}</p>
            {this.state.error?.stack && (
              <details className="mt-4">
                <summary className="text-sm font-medium text-slate-700 cursor-pointer">Details</summary>
                <pre className="mt-2 text-xs text-slate-600 whitespace-pre-wrap bg-slate-50 border border-slate-200 rounded-xl p-3 overflow-auto">
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// --- PROTECTED ROUTE COMPONENT (with optional role filter) ---
const ProtectedRoute = ({ roles }: { roles?: string[] }) => {
  const { user, isAuthenticated, loading, getRedirectPath } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-600 text-sm">
          <div className="h-4 w-4 rounded-full border-2 border-slate-300 border-t-transparent animate-spin" />
          Checking access…
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (roles && user && !roles.includes(user.role)) {
    return <Navigate to={getRedirectPath(user.role)} replace />;
  }

  return <Outlet />;
};

const DashboardIndexRedirect = () => {
  const { user, getRedirectPath } = useAuth();
  const role = user?.role || 'MERCHANT';
  return <Navigate to={getRedirectPath(role)} replace />;
};

function App() {
  const dashboardRoles = ['SUPERADMIN', 'TENANT', 'WM', 'WO', 'MERCHANT'];

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          {/* Marketing Website Routes (Public) */}
          <Route path="/" element={<MarketingLayout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="services/amazon-fba" element={<AmazonFBAPage />} />
            <Route path="services/amazon-fbm" element={<AmazonFBMPage />} />
            <Route path="services/dropshipping" element={<DropshippingPage />} />
            <Route path="services/logistics" element={<LogisticsPage />} />
            <Route path="services/customs" element={<CustomsPage />} />
            <Route path="warehouses" element={<WarehousesPage />} />
            <Route path="warehouses/:id" element={<WarehouseDetailPage />} />
            <Route path="pricing" element={<PricingPage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="blog/:slug" element={<PlaceholderPage title="Blog Post" description="This article page is coming soon" />} />
            <Route path="contact" element={<ContactPage />} />
            {/* Legal Pages */}
            <Route path="legal/privacy" element={<PrivacyPage />} />
            <Route path="legal/terms" element={<TermsPage />} />
            <Route path="legal/pricing-transparency" element={<PricingTransparencyPage />} />
          </Route>

          {/* Legacy Legal Routes */}
          <Route path="/privacy" element={<Navigate to="/legal/privacy" replace />} />
          <Route path="/terms" element={<Navigate to="/legal/terms" replace />} />

          {/* Marketing Auth Pages (Full Screen, No Layout) */}
          <Route path="/login" element={<MarketingLoginPage />} />
          <Route path="/signup" element={<MarketingSignupPage />} />

          {/* Warehouse Auth Page (WM/WO only) */}
          <Route path="/warehouse/login" element={<WarehouseLoginPage />} />

          {/* Protected Routes (Requires Login) */}
          <Route element={<ProtectedRoute roles={dashboardRoles} />}>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardIndexRedirect />} />
              <Route path="inventory" element={<Inventory />} />
              <Route path="orders" element={<Orders />} />
              <Route path="orders/:id/tracking" element={<Tracking />} />

              {/* Super Admin */}
              <Route path="admin/overview" element={<AdminOverview />} />
              <Route path="admin/website" element={<AdminWebsite />} />
              <Route path="admin/warehouses" element={<AdminWarehouses />} />

              {/* Tenant Admin */}
              <Route path="ta/overview" element={<TenantOverview />} />

              {/* Warehouse Manager */}
              <Route path="wm/overview" element={<WMOverview />} />
              <Route path="wm/tasks" element={<WMTasks />} />

              {/* Merchant */}
              <Route path="merchant/overview" element={<MerchantOverview />} />
              <Route path="merchant/inventory" element={<Inventory />} />
              <Route path="merchant/orders" element={<Orders />} />
              <Route path="merchant/orders/:id" element={<OrderDetailPage />} />

              {/* Settings - Available to all roles */}
              <Route path="settings" element={<Settings />} />

              {/* Fallback inside dashboard */}
              <Route path="*" element={<PlaceholderPage title="Not Found" description="This dashboard route is not mapped" />} />
            </Route>
          </Route>

          {/* Global fallback */}
          <Route path="*" element={<PlaceholderPage title="Not Found" description="Route does not exist" />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;