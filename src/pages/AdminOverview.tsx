import { Link } from 'react-router-dom'
import PageShell from '../components/PageShell'

const kpis = [
  { label: 'Active tenants', value: '18', meta: '+2 this week' },
  { label: 'Platform revenue (MRR)', value: '$82.4k', meta: '+4.8% MoM' },
  { label: 'Avg uptime', value: '99.96%', meta: 'past 30 days' },
  { label: 'Incidents (7d)', value: '0', meta: 'All clear' },
]

export default function AdminOverview() {
  return (
    <PageShell
      title="Platform Overview"
      subtitle="Monitor tenants, revenue, and platform health."
      breadcrumbs={[{ label: 'Admin', href: '/dashboard/admin/overview' }, { label: 'Overview' }]}
      actions={(
        <Link to="/dashboard/admin/warehouses#create" className="sf-btn sf-btn-primary">
          Add warehouse
        </Link>
      )}
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="card p-4">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-[0.2em]">{kpi.label}</p>
            <p className="text-2xl font-bold text-slate-900 mt-2">{kpi.value}</p>
            <p className="text-xs text-slate-500 mt-1">{kpi.meta}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="card p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-slate-800">Tenant health</h3>
            <span className="sf-badge bg-emerald-100 text-emerald-800">Healthy</span>
          </div>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>• 3 tenants in trial ending this week</li>
            <li>• No overdue invoices today</li>
            <li>• All regions operating normally</li>
          </ul>
        </div>
        <div className="card p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-slate-800">Incidents</h3>
            <span className="text-xs text-slate-500">Last 30 days</span>
          </div>
          <div className="text-sm text-slate-600">No incidents reported. Keep monitoring logs and alerting.</div>
        </div>
      </div>
    </PageShell>
  )
}
