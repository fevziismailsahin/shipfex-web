import { useEffect, useMemo, useState } from 'react'
import PageShell from '../components/PageShell'
import { useAuth } from '../contexts/AuthContext'
import { api, type WarehouseTask } from '../services/api'

function formatDate(value: unknown) {
  if (!value) return '-'
  if (typeof value === 'string') {
    const date = new Date(value)
    if (!Number.isNaN(date.getTime())) {
      return new Intl.DateTimeFormat(undefined, {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }).format(date)
    }
    return value
  }
  return JSON.stringify(value)
}

export default function WMTasks() {
  const { user } = useAuth()
  const warehouseId = user?.warehouse_id || null

  const [tasks, setTasks] = useState<WarehouseTask[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const canAssign = user?.role === 'WM' || user?.role === 'SUPERADMIN'

  const refresh = async () => {
    if (!warehouseId) return
    setError(null)
    setLoading(true)
    try {
      const data = await api.warehouseListTasks(warehouseId)
      setTasks(data)
    } catch (e: any) {
      setError(e?.message || 'Failed to load tasks')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [warehouseId])

  const counts = useMemo(() => {
    const total = tasks.length
    const open = tasks.filter((t) => t.status !== 'DONE').length
    const assigned = tasks.filter((t) => Boolean(t.assigned_to)).length
    return { total, open, assigned }
  }, [tasks])

  const assignToMe = async (taskId: string) => {
    if (!warehouseId || !user?.id) return
    try {
      await api.warehouseAssignTask(warehouseId, taskId, user.id)
      await refresh()
    } catch (e: any) {
      setError(e?.message || 'Failed to assign task')
    }
  }

  const complete = async (taskId: string) => {
    if (!warehouseId) return
    try {
      await api.warehouseCompleteTask(warehouseId, taskId)
      await refresh()
    } catch (e: any) {
      setError(e?.message || 'Failed to complete task')
    }
  }

  if (!warehouseId) {
    return (
      <PageShell
        title="Tasks"
        subtitle="Your account is missing a warehouse scope."
        breadcrumbs={[{ label: 'Warehouse', href: '/dashboard/wm/overview' }, { label: 'Tasks' }]}
      >
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <p className="text-slate-700 text-sm">
            No warehouse is attached to this user. Log in as a WM/WO user that has a `warehouse_id`.
          </p>
        </div>
      </PageShell>
    )
  }

  return (
    <PageShell
      title="Tasks"
      subtitle="Pick, pack, replenish and other warehouse work."
      breadcrumbs={[{ label: 'Warehouse', href: '/dashboard/wm/overview' }, { label: 'Tasks' }]}
      actions={
        <button
          onClick={refresh}
          className="sf-btn sf-btn-secondary"
        >
          Refresh
        </button>
      }
    >
      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 rounded-lg px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase">Total</p>
          <p className="text-2xl font-bold text-slate-800 mt-2">{counts.total}</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase">Open</p>
          <p className="text-2xl font-bold text-slate-800 mt-2">{counts.open}</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase">Assigned</p>
          <p className="text-2xl font-bold text-slate-800 mt-2">{counts.assigned}</p>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="sf-table min-w-[900px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="sf-th">Task</th>
                <th className="sf-th">Type</th>
                <th className="sf-th">Status</th>
                <th className="sf-th">Priority</th>
                <th className="sf-th">Assigned To</th>
                <th className="sf-th">Order</th>
                <th className="sf-th">Created</th>
                <th className="sf-th">Completed</th>
                <th className="sf-th text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={9} className="px-6 py-8 text-sm text-slate-500">
                    Loading…
                  </td>
                </tr>
              ) : tasks.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-6 py-8 text-sm text-slate-500">
                    No tasks yet.
                  </td>
                </tr>
              ) : (
                tasks.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50 transition">
                    <td className="sf-td font-mono text-xs text-slate-600">{t.id}</td>
                    <td className="sf-td text-sm text-slate-800 font-medium">{t.task_type}</td>
                    <td className="sf-td">
                      <span className="sf-badge sf-badge-indigo">
                        {t.status}
                      </span>
                    </td>
                    <td className="sf-td text-sm text-slate-700 font-semibold">{t.priority}</td>
                    <td className="sf-td font-mono text-xs text-slate-500">{t.assigned_to || '-'}</td>
                    <td className="sf-td text-sm text-slate-700">{t.related_order_id ?? '-'}</td>
                    <td className="sf-td text-xs text-slate-600">{formatDate(t.created_at)}</td>
                    <td className="sf-td text-xs text-slate-600">{formatDate(t.completed_at)}</td>
                    <td className="sf-td text-center">
                      <div className="flex items-center justify-center gap-2">
                        {canAssign && !t.assigned_to && t.status !== 'DONE' && (
                          <button
                            onClick={() => assignToMe(t.id)}
                            className="sf-btn sf-btn-soft px-3 py-1.5 text-xs"
                          >
                            Assign to me
                          </button>
                        )}
                        {t.status !== 'DONE' && (
                          <button
                            onClick={() => complete(t.id)}
                            className="sf-btn sf-btn-success-soft px-3 py-1.5 text-xs"
                          >
                            Complete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </PageShell>
  )
}
