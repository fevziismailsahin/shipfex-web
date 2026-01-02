import { DollarSign, CreditCard, TrendingUp, Download, Calendar, AlertCircle, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function MerchantBilling() {
  // Mock data - will be replaced with API call
  const billing = {
    wallet: {
      balance: 1247.50,
      lowBalanceThreshold: 100,
      autoRecharge: true,
      autoRechargeAmount: 500
    },
    currentMonth: {
      charges: 1853.42,
      fulfillment: 892.35,
      storage: 450.00,
      inbound: 285.50,
      materials: 175.32,
      shipping: 50.25
    },
    lastMonth: {
      charges: 2104.78
    },
    avgMonthly: 1967.23,
    invoices: [
      {
        id: 'inv_2025_01',
        number: 'INV-2025-0001',
        date: '2026-01-01',
        dueDate: '2026-01-16',
        amount: 2104.78,
        status: 'paid',
        paidDate: '2026-01-05'
      },
      {
        id: 'inv_2025_12',
        number: 'INV-2025-0012',
        date: '2025-12-01',
        dueDate: '2025-12-16',
        amount: 1967.89,
        status: 'paid',
        paidDate: '2025-12-08'
      },
      {
        id: 'inv_2025_11',
        number: 'INV-2025-0011',
        date: '2025-11-01',
        dueDate: '2025-11-16',
        amount: 1829.12,
        status: 'paid',
        paidDate: '2025-11-12'
      }
    ],
    paymentMethod: {
      type: 'card',
      last4: '4242',
      brand: 'Visa',
      expiry: '12/27'
    }
  }

  const costBreakdown = [
    { label: 'Fulfillment', amount: billing.currentMonth.fulfillment, percent: 48, color: 'bg-blue-600' },
    { label: 'Storage', amount: billing.currentMonth.storage, percent: 24, color: 'bg-purple-600' },
    { label: 'Inbound', amount: billing.currentMonth.inbound, percent: 15, color: 'bg-green-600' },
    { label: 'Materials', amount: billing.currentMonth.materials, percent: 10, color: 'bg-amber-600' },
    { label: 'Shipping', amount: billing.currentMonth.shipping, percent: 3, color: 'bg-slate-600' }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Billing & Wallet</h1>
        <p className="text-slate-600 mt-1">Manage your account balance, invoices, and payment methods</p>
      </div>

      {/* Wallet Balance */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-xl p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-blue-200 text-sm mb-1">Wallet Balance</p>
            <p className="text-4xl font-bold">${billing.wallet.balance.toFixed(2)}</p>
          </div>
          <button className="px-4 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 flex items-center gap-2">
            <Plus size={16} />
            Add Funds
          </button>
        </div>

        {billing.wallet.balance < billing.wallet.lowBalanceThreshold && (
          <div className="bg-amber-500/20 border border-amber-400 rounded-lg p-4 mb-4 flex items-start gap-3">
            <AlertCircle className="flex-shrink-0 mt-0.5" size={20} />
            <div>
              <p className="font-semibold">Low Balance Alert</p>
              <p className="text-sm text-blue-100">
                Your balance is below ${billing.wallet.lowBalanceThreshold}. Add funds to avoid service interruptions.
              </p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-blue-400">
          <div>
            <p className="text-blue-200 text-sm">Auto-Recharge</p>
            <p className="text-sm">Recharge ${billing.wallet.autoRechargeAmount} when balance &lt; ${billing.wallet.lowBalanceThreshold}</p>
          </div>
          <div className={`w-12 h-6 rounded-full ${billing.wallet.autoRecharge ? 'bg-white' : 'bg-blue-400'} relative`}>
            <div className={`w-5 h-5 rounded-full absolute top-0.5 transition-all ${billing.wallet.autoRecharge ? 'bg-blue-600 right-0.5' : 'bg-white left-0.5'}`}></div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <Calendar className="text-blue-600" size={24} />
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">CURRENT MONTH</span>
          </div>
          <div className="text-3xl font-bold text-slate-900">${billing.currentMonth.charges.toFixed(2)}</div>
          <div className="text-sm text-slate-600 mt-1">Charges to date</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="text-purple-600" size={24} />
            <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-1 rounded">LAST MONTH</span>
          </div>
          <div className="text-3xl font-bold text-slate-900">${billing.lastMonth.charges.toFixed(2)}</div>
          <div className="text-sm text-slate-600 mt-1">Previous billing period</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="text-green-600" size={24} />
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">AVERAGE</span>
          </div>
          <div className="text-3xl font-bold text-slate-900">${billing.avgMonthly.toFixed(2)}</div>
          <div className="text-sm text-slate-600 mt-1">3-month average</div>
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-6">Current Month Cost Breakdown</h2>
        
        {/* Visual Bar Chart */}
        <div className="mb-6">
          <div className="flex h-12 rounded-lg overflow-hidden">
            {costBreakdown.map((item) => (
              <div
                key={item.label}
                className={`${item.color} flex items-center justify-center text-white text-xs font-semibold`}
                style={{ width: `${item.percent}%` }}
              >
                {item.percent}%
              </div>
            ))}
          </div>
        </div>

        {/* Legend & Amounts */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
          {costBreakdown.map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <div className={`w-4 h-4 ${item.color} rounded`}></div>
              <div>
                <p className="text-sm font-semibold text-slate-900">${item.amount.toFixed(2)}</p>
                <p className="text-xs text-slate-600">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Invoices */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">Recent Invoices</h2>
          <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Invoice</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Due Date</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-slate-900">Amount</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {billing.invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-slate-900">{invoice.number}</p>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{invoice.date}</td>
                  <td className="px-4 py-3 text-slate-600">{invoice.dueDate}</td>
                  <td className="px-4 py-3 text-right font-semibold text-slate-900">
                    ${invoice.amount.toFixed(2)}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      invoice.status === 'paid' ? 'bg-green-100 text-green-700' :
                      invoice.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {invoice.status === 'paid' ? `Paid ${invoice.paidDate}` : invoice.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm">
                      <Download size={14} />
                      PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <CreditCard size={20} className="text-blue-600" />
            Payment Method
          </h2>
          <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
            Update
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-16 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center text-white font-bold text-xs">
            {billing.paymentMethod.brand}
          </div>
          <div>
            <p className="font-semibold text-slate-900">
              {billing.paymentMethod.brand} ending in {billing.paymentMethod.last4}
            </p>
            <p className="text-sm text-slate-600">Expires {billing.paymentMethod.expiry}</p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-200">
          <button className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 text-sm">
            Add Payment Method
          </button>
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-bold text-blue-900 mb-2">Need Help with Billing?</h3>
        <p className="text-sm text-blue-800 mb-4">
          Have questions about charges or need to dispute an invoice? Our billing team is here to help.
        </p>
        <div className="flex gap-3">
          <Link to="/merchant/support" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
            Contact Support
          </Link>
          <button className="px-4 py-2 bg-white text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 text-sm">
            Export Transactions
          </button>
        </div>
      </div>
    </div>
  )
}
