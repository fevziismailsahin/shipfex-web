import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageShell from '../components/PageShell'
import { useAuth } from '../contexts/AuthContext'
import { 
  ShoppingBag, 
  Package, 
  Truck, 
  Store,
  ExternalLink,
  Check,
  AlertCircle,
  Settings as SettingsIcon
} from 'lucide-react'

interface Integration {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  status: 'connected' | 'available' | 'coming-soon'
  category: 'marketplace' | 'shipping' | 'ecommerce'
}

export default function Settings() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'profile' | 'integrations' | 'notifications'>('integrations')

  const integrations: Integration[] = [
    {
      id: 'amazon-seller',
      name: 'Amazon Seller Central',
      description: 'Import FBA and FBM orders automatically. Sync inventory across all Amazon marketplaces.',
      icon: <ShoppingBag className="w-6 h-6" />,
      status: 'available',
      category: 'marketplace'
    },
    {
      id: 'shopify',
      name: 'Shopify',
      description: 'Connect your Shopify store to automatically import orders and sync inventory in real-time.',
      icon: <Store className="w-6 h-6" />,
      status: 'available',
      category: 'ecommerce'
    },
    {
      id: 'amazon-fba',
      name: 'Amazon FBA',
      description: 'Manage Fulfilled by Amazon orders. Track inventory in Amazon warehouses.',
      icon: <Package className="w-6 h-6" />,
      status: 'available',
      category: 'marketplace'
    },
    {
      id: 'amazon-fbm',
      name: 'Amazon FBM',
      description: 'Handle Fulfilled by Merchant orders. Ship from your own warehouse.',
      icon: <Truck className="w-6 h-6" />,
      status: 'available',
      category: 'marketplace'
    },
    {
      id: 'ebay',
      name: 'eBay',
      description: 'Sync orders and inventory with your eBay seller account.',
      icon: <ShoppingBag className="w-6 h-6" />,
      status: 'coming-soon',
      category: 'marketplace'
    },
    {
      id: 'walmart',
      name: 'Walmart Marketplace',
      description: 'Connect to Walmart Seller Center for order and inventory management.',
      icon: <Store className="w-6 h-6" />,
      status: 'coming-soon',
      category: 'marketplace'
    },
    {
      id: 'woocommerce',
      name: 'WooCommerce',
      description: 'Integrate with your WordPress WooCommerce store.',
      icon: <Store className="w-6 h-6" />,
      status: 'coming-soon',
      category: 'ecommerce'
    },
    {
      id: 'bigcommerce',
      name: 'BigCommerce',
      description: 'Sync orders and products from BigCommerce.',
      icon: <Store className="w-6 h-6" />,
      status: 'coming-soon',
      category: 'ecommerce'
    },
  ]

  const tabs = [
    { id: 'profile' as const, label: 'Profile', icon: <SettingsIcon className="w-4 h-4" /> },
    { id: 'integrations' as const, label: 'Integrations', icon: <Package className="w-4 h-4" /> },
    { id: 'notifications' as const, label: 'Notifications', icon: <AlertCircle className="w-4 h-4" /> },
  ]

  return (
    <PageShell
      title="Settings"
      subtitle="Manage your account, integrations, and preferences."
      breadcrumbs={[
        { label: 'Merchant', href: '/merchant/overview' },
        { label: 'Settings' }
      ]}
    >
      {/* Tabs */}
      <div className="card mb-6">
        <div className="border-b border-slate-200">
          <nav className="flex gap-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors
                  ${activeTab === tab.id
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                  }
                `}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Account Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
                <input
                  type="text"
                  value={user?.role || ''}
                  disabled
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Merchant ID</label>
                <input
                  type="text"
                  value={user?.merchant_id || 'Not assigned'}
                  disabled
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-500"
                />
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Change Password</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Current Password</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  placeholder="Enter current password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">New Password</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  placeholder="Enter new password"
                />
              </div>
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium"
                onClick={() => navigate('/contact')}
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Integrations Tab */}
      {activeTab === 'integrations' && (
        <div className="space-y-6">
          {/* Header */}
          <div className="card p-6 bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-200">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Connect Your Sales Channels</h3>
            <p className="text-sm text-slate-600">
              Import orders automatically from Amazon, Shopify, and other marketplaces. Sync inventory in real-time across all platforms.
            </p>
          </div>

          {/* Marketplace Integrations */}
          <div>
            <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-4">
              Marketplaces
            </h4>
            <div className="grid gap-4 md:grid-cols-2">
              {integrations
                .filter(i => i.category === 'marketplace')
                .map((integration) => (
                  <IntegrationCard key={integration.id} integration={integration} />
                ))}
            </div>
          </div>

          {/* E-commerce Platforms */}
          <div>
            <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-4">
              E-commerce Platforms
            </h4>
            <div className="grid gap-4 md:grid-cols-2">
              {integrations
                .filter(i => i.category === 'ecommerce')
                .map((integration) => (
                  <IntegrationCard key={integration.id} integration={integration} />
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Notification Preferences</h3>
          <div className="space-y-4">
            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="rounded border-slate-300" />
              <span className="text-sm text-slate-700">Email notifications for new orders</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="rounded border-slate-300" />
              <span className="text-sm text-slate-700">Low stock alerts</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" className="rounded border-slate-300" />
              <span className="text-sm text-slate-700">Weekly performance reports</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" className="rounded border-slate-300" />
              <span className="text-sm text-slate-700">Integration sync notifications</span>
            </label>
          </div>
        </div>
      )}
    </PageShell>
  )
}

function IntegrationCard({ integration }: { integration: Integration }) {
  const navigate = useNavigate()

  const getStatusBadge = () => {
    switch (integration.status) {
      case 'connected':
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
            <Check className="w-3 h-3" />
            Connected
          </span>
        )
      case 'coming-soon':
        return (
          <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded">
            Coming Soon
          </span>
        )
      default:
        return null
    }
  }

  return (
    <div className="card p-5 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
            {integration.icon}
          </div>
          <div>
            <h4 className="font-semibold text-slate-900">{integration.name}</h4>
            {getStatusBadge()}
          </div>
        </div>
      </div>
      
      <p className="text-sm text-slate-600 mb-4">
        {integration.description}
      </p>

      {integration.status === 'available' ? (
        <button
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium text-sm flex items-center justify-center gap-2"
          onClick={() => navigate('/contact')}
        >
          Connect
          <ExternalLink className="w-4 h-4" />
        </button>
      ) : integration.status === 'connected' ? (
        <div className="flex gap-2">
          <button
            className="flex-1 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 font-medium text-sm"
            onClick={() => navigate('/contact')}
          >
            Settings
          </button>
          <button
            className="flex-1 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 font-medium text-sm"
            onClick={() => navigate('/contact')}
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button 
          disabled 
          className="w-full px-4 py-2 bg-slate-100 text-slate-400 rounded-lg font-medium text-sm cursor-not-allowed"
        >
          Coming Soon
        </button>
      )}
    </div>
  )
}
