import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PageShell from '../components/PageShell'
import { useAuth } from '../contexts/AuthContext'
import { api } from '../services/api'

interface DashboardStats {
  totalOrders: number
  totalProducts: number
  totalAvailableUnits: number
  warehousesWithStock: number
  recentOrders: Array<{ id: number; status: string; customer: string }>
  warehouses: Array<{ warehouse_id: string; available: number }>
}

export default function MerchantOverview() {
  const { user } = useAuth()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [isNewMerchant, setIsNewMerchant] = useState(false)

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      const [products, orders, inv] = await Promise.all([
        api.merchantListProducts(),
        api.merchantListOrders(),
        api.merchantInventorySummary(),
      ])

      const warehouses = inv.warehouses || []
      const totalAvailableUnits = warehouses.reduce((acc, w) => acc + (w.available ?? 0), 0)

      const next: DashboardStats = {
        totalOrders: orders.length,
        totalProducts: products.length,
        totalAvailableUnits,
        warehousesWithStock: warehouses.length,
        recentOrders: orders.slice(0, 5).map((o) => ({ id: o.id, status: o.status, customer: o.customer })),
        warehouses: warehouses.map((w) => ({ warehouse_id: w.warehouse_id, available: w.available ?? 0 })),
      }

      setStats(next)
      setIsNewMerchant(next.totalProducts === 0 && next.totalOrders === 0)
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <PageShell
        title="Merchant Overview"
        subtitle="Loading your dashboard..."
        breadcrumbs={[{ label: 'Merchant', href: '/dashboard/merchant/overview' }, { label: 'Overview' }]}
      >
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </PageShell>
    )
  }

  // Welcome screen for new merchants
  if (isNewMerchant) {
    return (
      <PageShell
        title="Welcome to Shipfex!"
        subtitle="Let's get your logistics operations up and running."
        breadcrumbs={[{ label: 'Merchant', href: '/dashboard/merchant/overview' }, { label: 'Overview' }]}
      >
        <div className="max-w-4xl">
          {/* Welcome Banner */}
          <div className="card p-8 mb-6 bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-200">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white text-2xl">
                👋
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-slate-900 mb-2">
                  Welcome, {user?.email?.split('@')[0]}!
                </h2>
                <p className="text-slate-700 mb-4">
                  You're all set to start managing your logistics operations. Follow these steps to get started quickly.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Start Steps */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900">Quick Start Guide</h3>
            
            <Link to="/dashboard/inventory" className="block group">
              <div className="card p-6 hover:shadow-lg transition-shadow border-2 border-transparent hover:border-indigo-200">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 font-bold group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    1
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900 mb-1 group-hover:text-indigo-600">
                      Add Your First Product
                    </h4>
                    <p className="text-sm text-slate-600">
                      Start by adding products to your inventory. Include SKUs, descriptions, and stock levels.
                    </p>
                  </div>
                  <svg className="w-5 h-5 text-slate-400 group-hover:text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>

            <Link to="/dashboard/orders" className="block group">
              <div className="card p-6 hover:shadow-lg transition-shadow border-2 border-transparent hover:border-indigo-200">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 font-bold group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    2
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900 mb-1 group-hover:text-indigo-600">
                      Create Your First Order
                    </h4>
                    <p className="text-sm text-slate-600">
                      Once you have products, you can start creating and tracking orders through the system.
                    </p>
                  </div>
                  <svg className="w-5 h-5 text-slate-400 group-hover:text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>

            <Link to="/dashboard/settings" className="block group">
              <div className="card p-6 hover:shadow-lg transition-shadow border-2 border-transparent hover:border-indigo-200">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 font-bold group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    3
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900 mb-1 group-hover:text-indigo-600">
                      Connect Your Sales Channels
                    </h4>
                    <p className="text-sm text-slate-600">
                      Import orders from Amazon (FBA/FBM), Shopify, and other marketplaces automatically.
                    </p>
                  </div>
                  <svg className="w-5 h-5 text-slate-400 group-hover:text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>

            <div className="card p-6 bg-slate-50">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-slate-200 rounded-lg flex items-center justify-center text-slate-600 font-bold">
                  4
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-900 mb-1">
                    Monitor Operations
                  </h4>
                  <p className="text-sm text-slate-600">
                    Track your orders, monitor inventory levels, and view real-time analytics from this dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Help Resources */}
          <div className="card p-6 mt-6 bg-slate-50">
            <h3 className="font-semibold text-slate-900 mb-3">Need Help?</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <Link to="/services" className="text-left px-4 py-3 bg-white rounded-lg hover:shadow-sm transition-shadow">
                <div className="text-sm font-medium text-slate-900">📚 Documentation</div>
                <div className="text-xs text-slate-500 mt-1">Learn how to use Shipfex</div>
              </Link>
              <Link to="/contact" className="text-left px-4 py-3 bg-white rounded-lg hover:shadow-sm transition-shadow">
                <div className="text-sm font-medium text-slate-900">💬 Contact Support</div>
                <div className="text-xs text-slate-500 mt-1">Get help from our team</div>
              </Link>
            </div>
          </div>

          {/* Quick Stats Preview */}
          <div className="card p-6 mt-6 bg-gradient-to-br from-slate-50 to-indigo-50 border-indigo-100">
            <h3 className="font-semibold text-slate-900 mb-3">Why Merchants Choose Shipfex</h3>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600">99.5%</div>
                <div className="text-xs text-slate-600 mt-1">Order Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600">&lt;24h</div>
                <div className="text-xs text-slate-600 mt-1">Avg. Fulfillment</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600">15+</div>
                <div className="text-xs text-slate-600 mt-1">Integrations</div>
              </div>
            </div>
          </div>
        </div>
      </PageShell>
    )
  }

  // Active merchant dashboard with real data
  const kpis = [
    { 
      title: 'Total Orders', 
      value: stats?.totalOrders.toString() || '0', 
      meta: 'All time'
    },
    { 
      title: 'Total Products', 
      value: stats?.totalProducts.toString() || '0', 
      meta: 'Active SKUs' 
    },
    { 
      title: 'Available Units', 
      value: stats?.totalAvailableUnits.toString() || '0', 
      meta: 'Across warehouses' 
    },
    { 
      title: 'Warehouses',
      value: stats?.warehousesWithStock.toString() || '0',
      meta: 'With inventory'
    },
  ]

  return (
    <PageShell
      title="Merchant Overview"
      subtitle="Performance and operational health for your business."
      breadcrumbs={[{ label: 'Merchant', href: '/dashboard/merchant/overview' }, { label: 'Overview' }]}
      actions={
        <Link to="/dashboard/orders">
          <button className="sf-btn sf-btn-primary">
            Create order
          </button>
        </Link>
      }
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.title} className="card p-4">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-[0.2em]">{k.title}</p>
            <p className="text-2xl font-bold text-slate-900 mt-2">{k.value}</p>
            <p className="text-xs text-slate-500 mt-1">{k.meta}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="card p-4">
          <h3 className="text-sm font-semibold text-slate-800 mb-3">Latest orders</h3>
          {stats?.recentOrders && stats.recentOrders.length > 0 ? (
            <ul className="text-sm text-slate-600 space-y-2">
              {stats.recentOrders.map((order) => (
                <li key={order.id}>• #{order.id} — {order.status} — {order.customer}</li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-8">
              <p className="text-sm text-slate-500 mb-3">No orders yet</p>
              <Link to="/dashboard/orders">
                <button className="sf-btn sf-btn-soft text-sm px-3 py-1.5">
                  Create your first order →
                </button>
              </Link>
            </div>
          )}
        </div>
        <div className="card p-4">
          <h3 className="text-sm font-semibold text-slate-800 mb-3">Inventory by warehouse</h3>
          {stats?.warehouses && stats.warehouses.length > 0 ? (
            <ul className="text-sm text-slate-600 space-y-2">
              {stats.warehouses.map((w) => (
                <li key={w.warehouse_id}>• {w.warehouse_id} — {w.available} available</li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-8">
              <p className="text-sm text-slate-500 mb-3">No inventory yet</p>
              <Link to="/dashboard/inventory">
                <button className="sf-btn sf-btn-soft text-sm px-3 py-1.5">
                  View inventory →
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </PageShell>
  )
}
