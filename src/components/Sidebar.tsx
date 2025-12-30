import { NavLink, useNavigate } from 'react-router-dom';
import { Package, ShoppingCart, Settings, X, LogOut } from 'lucide-react';

interface SidebarProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ isMobileMenuOpen, setIsMobileMenuOpen }: SidebarProps) {
  const navigate = useNavigate();

  // --- LOGOUT LOGIC ---
  const handleLogout = () => {
    // Kullanıcıya onay soruyoruz
    if (confirm("Are you sure you want to sign out?")) {
      // Kimlik doğrulama anahtarını siliyoruz
      localStorage.removeItem('isAuthenticated');
      // Kullanıcıyı giriş ekranına yönlendiriyoruz
      navigate('/login');
    }
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
      isActive
        ? 'bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-100'
        : 'text-slate-600 hover:bg-slate-50'
    }`;

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <aside
        className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 ease-in-out
        lg:static lg:translate-x-0 
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
      >
        {/* LOGO AREA */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold mr-3 shadow-indigo-200 shadow-lg">
              S
            </div>
            <span className="text-xl font-bold text-slate-800 tracking-tight">
              Shipfex
            </span>
          </div>
          <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden text-slate-400">
            <X />
          </button>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="flex-1 p-4 space-y-1">
          <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 mt-4">
            Operations
          </p>
          
          <NavLink to="/inventory" className={linkClass} onClick={() => setIsMobileMenuOpen(false)}>
            <Package size={18} /> Inventory
          </NavLink>
          
          <NavLink to="/orders" className={linkClass} onClick={() => setIsMobileMenuOpen(false)}>
            <ShoppingCart size={18} /> Orders
          </NavLink>
        </nav>

        {/* FOOTER AREA (Settings & Logout) */}
        <div className="p-4 border-t border-slate-100 space-y-2">
          <button className="flex items-center gap-3 w-full px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-800 transition">
            <Settings size={18} /> Settings
          </button>
          
          {/* Sign Out Button - Kırmızı vurgulu */}
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg transition"
          >
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}