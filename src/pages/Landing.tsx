import { Link } from 'react-router-dom'

// Simple public landing page (MVP) with hero, value props, and calls to action.
export default function LandingPage() {
  const features = [
    {
      title: 'Multi-tenant ready',
      desc: 'Run many warehouses and merchants on one platform with clean isolation.',
    },
    {
      title: 'Inbound → Outbound',
      desc: 'Receive, store, pick, pack, and ship with real-time tracking.',
    },
    {
      title: 'Marketplace built-in',
      desc: 'Publish merchant products and sell directly from your network.',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white">
      <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center font-bold shadow-lg shadow-indigo-500/30">S</div>
          <span className="text-xl font-semibold">Shipfex Platform</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Link to="/login" className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 transition">
            Log in
          </Link>
          <Link to="/store" className="px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 transition shadow-lg shadow-indigo-500/30">
            Marketplace
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-16">
        <section className="grid md:grid-cols-2 gap-10 items-center py-10">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.3em] text-indigo-200/80">Fulfillment OS</p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              One platform for <span className="text-indigo-300">multi-tenant</span> warehouse, fulfillment, and marketplace operations.
            </h1>
            <p className="text-slate-200/80 text-lg">
              Run your warehouses, merchants, and storefront in one place. Built for inbound, outbound, kitting, and billing with real-time visibility.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/login" className="px-5 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 transition font-semibold shadow-lg shadow-indigo-500/30">
                Go to App
              </Link>
              <Link to="/store" className="px-5 py-3 rounded-xl border border-white/20 hover:border-white/40 transition font-semibold">
                View Marketplace
              </Link>
              <Link to="/tenant/demo" className="px-5 py-3 rounded-xl border border-indigo-400/60 text-indigo-200 hover:bg-indigo-500/10 transition font-semibold">
                Tenant Demo
              </Link>
            </div>
            <div className="flex gap-6 text-sm text-slate-200/70">
              <div>
                <p className="text-2xl font-bold text-white"><span className="align-middle">99.9%</span></p>
                <p>API uptime target</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">Multi-warehouse</p>
                <p>Native routing & tasks</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">RBAC</p>
                <p>Roles for ops & merchants</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-8 bg-indigo-500/10 blur-3xl" aria-hidden></div>
            <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-indigo-900/30">
              <div className="flex items-center justify-between mb-4 text-sm text-slate-200">
                <span>Live Snapshot</span>
                <span className="text-emerald-300">Synced</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-slate-100">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-slate-300">Orders today</p>
                  <p className="text-2xl font-bold">284</p>
                  <p className="text-xs text-emerald-300">+12% vs yesterday</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-slate-300">Units in SLAs</p>
                  <p className="text-2xl font-bold">97.4%</p>
                  <p className="text-xs text-emerald-300">SLA: 24h pick/pack</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-slate-300">Inbound in queue</p>
                  <p className="text-2xl font-bold">18</p>
                  <p className="text-xs text-amber-300">Receiving SLAs pending</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-slate-300">Merchants live</p>
                  <p className="text-2xl font-bold">42</p>
                  <p className="text-xs text-indigo-200">White-labeled portals</p>
                </div>
              </div>
              <div className="mt-4 text-xs text-slate-300">
                Tenant-aware, role-based, API-first. Built for inbound → storage → pick/pack → ship and billing.
              </div>
            </div>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-4 pt-6">
          {features.map((f) => (
            <div key={f.title} className="p-4 rounded-xl bg-white/5 border border-white/10 text-slate-100 shadow-sm">
              <p className="text-sm font-semibold text-white">{f.title}</p>
              <p className="text-sm text-slate-200/80 mt-2">{f.desc}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  )
}
