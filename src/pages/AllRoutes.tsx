import { Link } from 'react-router-dom'

// Handy index page to navigate all planned routes during MVP
const publicRoutes = [
  '/landing',
  '/login',
  '/store',
  '/store/:id',
  '/store/cart',
  '/store/checkout',
  '/store/orders/:id',
  '/tenant/:slug',
]

const coreRoutes = [
  '/inventory',
  '/orders',
  '/orders/:id/tracking',
]

const superAdminRoutes = [
  '/admin/overview',
  '/admin/tenants',
  '/admin/tenants/:id',
  '/admin/users',
  '/admin/billing',
  '/admin/audit-logs',
  '/admin/system-health',
]

const tenantAdminRoutes = [
  '/ta/overview',
  '/ta/warehouses',
  '/ta/warehouses/:id',
  '/ta/staff',
  '/ta/staff/:id',
  '/ta/merchants',
  '/ta/merchants/:id',
  '/ta/pricing',
  '/ta/invoices',
  '/ta/expenses',
  '/ta/integrations',
  '/ta/reports',
]

const wmRoutes = [
  '/wm/overview',
  '/wm/orders',
  '/wm/orders/:id',
  '/wm/inventory',
  '/wm/inbound',
  '/wm/tasks',
  '/wm/shipments',
  '/wm/reports',
  '/wm/team',
]

const woRoutes = [
  '/wo/my-tasks',
  '/wo/tasks/:id',
  '/wo/orders/assigned',
  '/wo/orders/:id',
  '/wo/performance',
]

const merchantRoutes = [
  '/merchant/overview',
  '/merchant/products',
  '/merchant/products/:id',
  '/merchant/inventory',
  '/merchant/orders',
  '/merchant/orders/:id',
  '/merchant/inbound',
  '/merchant/billing',
  '/merchant/invoices/:id',
  '/merchant/service-requests',
  '/merchant/integrations',
  '/merchant/marketplace/listings',
]

function RouteGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
        <span className="text-xs text-slate-400">{items.length} routes</span>
      </div>
      <div className="divide-y divide-slate-100">
        {items.map((path) => (
          <Link
            key={path}
            to={path.replace(':id', '123').replace(':slug', 'demo')}
            className="block px-4 py-2 text-sm text-indigo-700 hover:bg-indigo-50"
          >
            {path}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default function AllRoutesPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Navigation</p>
        <h1 className="text-2xl font-bold text-slate-900">All Routes (MVP)</h1>
        <p className="text-slate-600">Quick links to every planned page so you can jump around while building UI.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <RouteGroup title="Public" items={publicRoutes} />
        <RouteGroup title="Core App" items={coreRoutes} />
        <RouteGroup title="Super Admin" items={superAdminRoutes} />
        <RouteGroup title="Tenant Admin" items={tenantAdminRoutes} />
        <RouteGroup title="Warehouse Manager" items={wmRoutes} />
        <RouteGroup title="Warehouse Operator" items={woRoutes} />
        <RouteGroup title="Merchant" items={merchantRoutes} />
      </div>
    </div>
  )
}
