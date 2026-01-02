import PageShell from '../components/PageShell'

const metrics = [
  { title: 'Orders in queue', value: '182', meta: '64 picking, 48 packing, 70 ready' },
  { title: 'Inbound shipments', value: '23', meta: '5 arriving today' },
  { title: 'Tasks open', value: '41', meta: '12 high priority' },
  { title: 'SLA (pick/pack)', value: '96.8%', meta: 'Goal 97%' },
]

export default function WMOverview() {
  return (
    <PageShell
      title="Warehouse Manager"
      subtitle="Operational snapshot across orders, inbound, and tasks."
      breadcrumbs={[{ label: 'WM', href: '/dashboard/wm/overview' }, { label: 'Overview' }]}
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.title} className="card p-4">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-[0.2em]">{m.title}</p>
            <p className="text-2xl font-bold text-slate-900 mt-2">{m.value}</p>
            <p className="text-xs text-slate-500 mt-1">{m.meta}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="card p-4">
          <h3 className="text-sm font-semibold text-slate-800 mb-3">Queues</h3>
          <ul className="text-sm text-slate-600 space-y-2">
            <li>• Picking: 64 orders</li>
            <li>• Packing: 48 orders</li>
            <li>• Ready to ship: 70 orders</li>
          </ul>
        </div>
        <div className="card p-4">
          <h3 className="text-sm font-semibold text-slate-800 mb-3">Attention</h3>
          <ul className="text-sm text-slate-600 space-y-2">
            <li>• 5 high-priority tasks overdue</li>
            <li>• 12 SKUs at critical stock</li>
            <li>• 3 carriers reporting delays</li>
          </ul>
        </div>
      </div>
    </PageShell>
  )
}
