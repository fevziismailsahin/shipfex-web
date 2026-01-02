import { Link } from 'react-router-dom'
import PageShell from '../components/PageShell'

const cards = [
  { title: 'Warehouses', value: '4', meta: '2 US • 2 EU' },
  { title: 'Merchants', value: '42', meta: '+3 this week' },
  { title: 'Orders today', value: '1,284', meta: '+12% vs yesterday' },
  { title: 'SLAs', value: '97.4%', meta: 'Pick/pack < 24h' },
]

export default function TenantOverview() {
  return (
    <PageShell
      title="Tenant Overview"
      subtitle="At-a-glance metrics for this tenant."
      breadcrumbs={[{ label: 'Tenant', href: '/dashboard/ta/overview' }, { label: 'Overview' }]}
      actions={(
        <Link to="/contact" className="sf-btn sf-btn-primary">
          Invite user
        </Link>
      )}
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((c) => (
          <div key={c.title} className="card p-4">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-[0.2em]">{c.title}</p>
            <p className="text-2xl font-bold text-slate-900 mt-2">{c.value}</p>
            <p className="text-xs text-slate-500 mt-1">{c.meta}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="card p-4">
          <h3 className="text-sm font-semibold text-slate-800 mb-3">Warehouses</h3>
          <ul className="text-sm text-slate-600 space-y-2">
            <li>• NYC-01 — utilization 78%</li>
            <li>• LAX-02 — utilization 64%</li>
            <li>• FRA-01 — utilization 71%</li>
            <li>• AMS-01 — utilization 69%</li>
          </ul>
        </div>
        <div className="card p-4">
          <h3 className="text-sm font-semibold text-slate-800 mb-3">Merchant activity</h3>
          <ul className="text-sm text-slate-600 space-y-2">
            <li>• Top seller: NovaGear (312 orders today)</li>
            <li>• Inbound pending: 18 shipments</li>
            <li>• Low-stock alerts: 12 SKUs across 3 merchants</li>
          </ul>
        </div>
      </div>
    </PageShell>
  )
}
