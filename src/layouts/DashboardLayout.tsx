import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Menu } from 'lucide-react';

export default function DashboardLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Determine Page Title based on URL
  const getPageTitle = () => {
    const path = location.pathname;

    if (path.includes('/dashboard/admin/')) return 'Platform';
    if (path.includes('/dashboard/ta/')) return 'Tenant';
    if (path.includes('/dashboard/wm/tasks')) return 'Tasks';
    if (path.includes('/dashboard/wm/')) return 'Warehouse';
    if (path.includes('/dashboard/wo/')) return 'My Work';
    if (path.includes('/dashboard/merchant/')) return 'Merchant';
    if (path.includes('/dashboard/settings')) return 'Settings';
    if (path.includes('/dashboard/orders')) return 'Orders';
    if (path.includes('/dashboard/inventory')) return 'Inventory';
    return 'Dashboard';
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-800 overflow-hidden">
      {/* Sidebar Component */}
      <Sidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Common Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-8 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              <Menu size={24} />
            </button>
            <h2 className="text-lg font-semibold text-slate-800 truncate">
              {getPageTitle()}
            </h2>
          </div>
          {/* Header Actions can be injected here or per page */}
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-1 overflow-auto p-4 sm:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}