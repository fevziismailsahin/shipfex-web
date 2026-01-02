import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import PageShell from '../components/PageShell'
import {
  api,
  type AdminCreateWarehouseInput,
  type AdminCreateWarehouseStaffInput,
  type AdminWarehouse,
  type AdminWarehouseStaff,
} from '../services/api'
import { useAuth } from '../contexts/AuthContext'

const SQFT_PER_M2 = 10.7639

const warehouseMetadataTemplate = {
  warehouse_identity: {
    warehouse_id: null,
    warehouse_code: null,
    warehouse_name: null,
    warehouse_type: null,
    owner_company_id: null,
    operator_company_id: null,
    status: 'active',
  },
  location_geography: {
    country: null,
    state_province: null,
    city: null,
    postal_code: null,
    address_line_1: null,
    address_line_2: null,
    latitude: null,
    longitude: null,
    time_zone: null,
  },
  environmental_capabilities: {
    temperature_zones: [],
    humidity_control: false,
    cold_chain_supported: false,
    freezer_supported: false,
    hazmat_supported: false,
    battery_storage_certified: false,
  },
  physical_structure: {
    zones: [],
    aisles: [],
    racks: [],
    shelves: [],
    bins: [],
    floor_levels: null,
    max_capacity_volume: null,
    max_capacity_weight: null,
  },
  workforce_access_control: {
    allowed_roles: [],
    shift_definitions: [],
    labor_tracking_enabled: false,
    access_control_zones: [],
    safety_training_required: false,
  },
}

const emptyDraft: AdminCreateWarehouseInput = {
  name: '',
  code: '',
  country: '',
  city: '',
  region: '',
  address_line_1: '',
  address_line_2: '',
  postal_code: '',
  lat: undefined,
  lng: undefined,
  area_m2: undefined,
  workers_count: undefined,
  cold_chain_supported: false,
  metadata: warehouseMetadataTemplate,
}

export default function AdminWarehouses() {
  const { user } = useAuth()
  const role = user?.role

  const [rows, setRows] = useState<AdminWarehouse[]>([])
  const [draft, setDraft] = useState<AdminCreateWarehouseInput>(emptyDraft)
  const [metadataText, setMetadataText] = useState<string>(() => JSON.stringify(warehouseMetadataTemplate, null, 2))
  const [metadataError, setMetadataError] = useState<string | null>(null)

  const [selectedWarehouseId, setSelectedWarehouseId] = useState<string>('')
  const [staffRows, setStaffRows] = useState<AdminWarehouseStaff[]>([])
  const [staffLoading, setStaffLoading] = useState(false)
  const [staffSaving, setStaffSaving] = useState(false)
  const [staffActionBusyUserId, setStaffActionBusyUserId] = useState<string | null>(null)
  const [staffError, setStaffError] = useState<string | null>(null)
  const [staffSuccess, setStaffSuccess] = useState<string | null>(null)
  const [staffDraft, setStaffDraft] = useState<AdminCreateWarehouseStaffInput>({
    email: '',
    password: '',
    role: 'WO',
    job_title: '',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const canAccess = role === 'SUPERADMIN'

  const toErrorMessage = (e: unknown) => {
    if (e instanceof Error) return e.message
    if (typeof e === 'object' && e && 'message' in e) return String((e as { message: unknown }).message)
    return String(e)
  }

  const load = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await api.adminListWarehouses()
      setRows(data)
    } catch (e) {
      setError(toErrorMessage(e))
    } finally {
      setLoading(false)
    }
  }

  const loadStaff = async (warehouseId: string) => {
    setStaffLoading(true)
    setStaffError(null)
    try {
      const data = await api.adminListWarehouseStaff(warehouseId)
      setStaffRows(data)
    } catch (e) {
      setStaffError(toErrorMessage(e))
    } finally {
      setStaffLoading(false)
    }
  }

  useEffect(() => {
    if (!canAccess) return
    void load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canAccess])

  useEffect(() => {
    if (!rows.length) return
    if (!selectedWarehouseId) {
      setSelectedWarehouseId(rows[0].id)
    }
  }, [rows, selectedWarehouseId])

  useEffect(() => {
    if (!selectedWarehouseId) return
    void loadStaff(selectedWarehouseId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedWarehouseId])

  useEffect(() => {
    // Keep the JSON editor in sync after successful create/reset.
    setMetadataText(JSON.stringify(draft.metadata ?? warehouseMetadataTemplate, null, 2))
    setMetadataError(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draft.metadata])

  const cleanedDraft = useMemo((): AdminCreateWarehouseInput => {
    const trimOrUndefined = (v?: string) => {
      const t = (v ?? '').trim()
      return t ? t : undefined
    }

    const numOrUndefined = (v: unknown) => {
      if (v === null || v === undefined) return undefined
      if (typeof v === 'number') return Number.isFinite(v) ? v : undefined
      const parsed = Number(String(v))
      return Number.isFinite(parsed) ? parsed : undefined
    }

    let parsedMetadata: unknown = undefined
    try {
      parsedMetadata = metadataText.trim() ? JSON.parse(metadataText) : undefined
    } catch {
      parsedMetadata = undefined
    }

    return {
      name: (draft.name ?? '').trim(),
      code: trimOrUndefined(draft.code),
      address_line_1: trimOrUndefined(draft.address_line_1),
      address_line_2: trimOrUndefined(draft.address_line_2),
      city: trimOrUndefined(draft.city),
      region: trimOrUndefined(draft.region),
      country: trimOrUndefined(draft.country),
      postal_code: trimOrUndefined(draft.postal_code),
      lat: numOrUndefined(draft.lat),
      lng: numOrUndefined(draft.lng),
      area_m2: numOrUndefined(draft.area_m2),
      workers_count: numOrUndefined(draft.workers_count),
      cold_chain_supported: Boolean(draft.cold_chain_supported),
      metadata: parsedMetadata,
    }
  }, [draft, metadataText])

  if (!canAccess) {
    return <Navigate to="/dashboard" replace />
  }

  const onCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setSuccess(null)
    setError(null)

    // Validate metadata JSON before sending.
    if (metadataText.trim()) {
      try {
        JSON.parse(metadataText)
        setMetadataError(null)
      } catch {
        setMetadataError('Metadata must be valid JSON.')
        return
      }
    }

    if (!cleanedDraft.name) {
      setError('Warehouse name is required.')
      return
    }

    setSaving(true)
    try {
      const created = await api.adminCreateWarehouse(cleanedDraft)
      setRows((prev) => [created, ...prev])
      setDraft(emptyDraft)
      setMetadataText(JSON.stringify(warehouseMetadataTemplate, null, 2))
      setSuccess('Warehouse created.')
    } catch (err) {
      setError(toErrorMessage(err))
    } finally {
      setSaving(false)
    }
  }

  const onCreateStaff = async (e: React.FormEvent) => {
    e.preventDefault()
    setStaffSuccess(null)
    setStaffError(null)

    if (!selectedWarehouseId) {
      setStaffError('Select a warehouse first.')
      return
    }

    if (!staffDraft.email.trim() || !staffDraft.email.includes('@')) {
      setStaffError('Valid staff email is required.')
      return
    }

    if (!staffDraft.password || staffDraft.password.length < 6) {
      setStaffError('Password must be at least 6 characters.')
      return
    }

    setStaffSaving(true)
    try {
      await api.adminCreateWarehouseStaff(selectedWarehouseId, {
        email: staffDraft.email.trim(),
        password: staffDraft.password,
        role: staffDraft.role,
        job_title: (staffDraft.job_title ?? '').trim() || undefined,
      })
      setStaffDraft({ email: '', password: '', role: 'WO', job_title: '' })
      setStaffSuccess('Warehouse staff user created.')
      await loadStaff(selectedWarehouseId)
    } catch (err) {
      setStaffError(toErrorMessage(err))
    } finally {
      setStaffSaving(false)
    }
  }

  const onToggleStaffActive = async (s: AdminWarehouseStaff) => {
    setStaffSuccess(null)
    setStaffError(null)

    if (!selectedWarehouseId) {
      setStaffError('Select a warehouse first.')
      return
    }

    setStaffActionBusyUserId(s.user_id)
    try {
      await api.adminUpdateWarehouseStaff(selectedWarehouseId, s.user_id, {
        active: !s.active,
        job_title: s.job_title ?? undefined,
      })
      setStaffSuccess(!s.active ? 'Staff activated.' : 'Staff deactivated.')
      await loadStaff(selectedWarehouseId)
    } catch (err) {
      setStaffError(toErrorMessage(err))
    } finally {
      setStaffActionBusyUserId(null)
    }
  }

  const onResetStaffPassword = async (s: AdminWarehouseStaff) => {
    setStaffSuccess(null)
    setStaffError(null)

    if (!selectedWarehouseId) {
      setStaffError('Select a warehouse first.')
      return
    }

    const nextPassword = window.prompt(`New password for ${s.email} (min 6 chars):`)
    if (nextPassword === null) return
    if (!nextPassword || nextPassword.length < 6) {
      setStaffError('Password must be at least 6 characters.')
      return
    }

    setStaffActionBusyUserId(s.user_id)
    try {
      await api.adminResetWarehouseStaffPassword(selectedWarehouseId, s.user_id, { password: nextPassword })
      setStaffSuccess('Password reset. User must sign in again.')
    } catch (err) {
      setStaffError(toErrorMessage(err))
    } finally {
      setStaffActionBusyUserId(null)
    }
  }

  const [deleteBusyId, setDeleteBusyId] = useState<string | null>(null)
  const onDeleteWarehouse = async (warehouseId: string) => {
    setSuccess(null)
    setError(null)
    const ok = window.confirm('Delete this warehouse? This may also delete related warehouse data (tasks, inventory, etc.).')
    if (!ok) return
    setDeleteBusyId(warehouseId)
    try {
      await api.adminDeleteWarehouse(warehouseId)
      setRows((prev) => prev.filter((w) => w.id !== warehouseId))
      if (selectedWarehouseId === warehouseId) {
        setSelectedWarehouseId('')
        setStaffRows([])
      }
      setSuccess('Warehouse deleted.')
    } catch (e) {
      setError(toErrorMessage(e))
    } finally {
      setDeleteBusyId(null)
    }
  }

  return (
    <PageShell
      title="Warehouses"
      subtitle="Create and manage platform warehouses (location, capacity, and cold-chain capability)."
      breadcrumbs={[{ label: 'Admin', href: '/dashboard/admin/overview' }, { label: 'Warehouses' }]}
    >
      {error && <div className="sf-alert sf-alert-error">{error}</div>}
      {success && <div className="sf-alert sf-alert-success">{success}</div>}

      <div className="card p-4" id="create">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-sm font-semibold text-slate-900">Add warehouse</h3>
          <div className="text-xs text-slate-500">Required: name</div>
        </div>

        <form onSubmit={onCreate} className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <div className="sf-label">Name</div>
            <input className="sf-input" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} placeholder="e.g. Dallas Fulfillment Center" />
          </div>

          <div>
            <div className="sf-label">Code</div>
            <input className="sf-input" value={draft.code ?? ''} onChange={(e) => setDraft({ ...draft, code: e.target.value })} placeholder="e.g. DAL-01" />
          </div>

          <div>
            <div className="sf-label">Country</div>
            <input className="sf-input" value={draft.country ?? ''} onChange={(e) => setDraft({ ...draft, country: e.target.value })} placeholder="USA" />
          </div>

          <div>
            <div className="sf-label">City</div>
            <input className="sf-input" value={draft.city ?? ''} onChange={(e) => setDraft({ ...draft, city: e.target.value })} placeholder="Dallas" />
          </div>

          <div>
            <div className="sf-label">Region / State</div>
            <input className="sf-input" value={draft.region ?? ''} onChange={(e) => setDraft({ ...draft, region: e.target.value })} placeholder="TX" />
          </div>

          <div>
            <div className="sf-label">Postal code</div>
            <input className="sf-input" value={draft.postal_code ?? ''} onChange={(e) => setDraft({ ...draft, postal_code: e.target.value })} placeholder="75001" />
          </div>

          <div className="md:col-span-2">
            <div className="sf-label">Address line 1</div>
            <input className="sf-input" value={draft.address_line_1 ?? ''} onChange={(e) => setDraft({ ...draft, address_line_1: e.target.value })} placeholder="Street and number" />
          </div>

          <div className="md:col-span-2">
            <div className="sf-label">Address line 2</div>
            <input className="sf-input" value={draft.address_line_2 ?? ''} onChange={(e) => setDraft({ ...draft, address_line_2: e.target.value })} placeholder="Suite, unit, etc (optional)" />
          </div>

          <div>
            <div className="sf-label">Latitude</div>
            <input
              className="sf-input"
              inputMode="decimal"
              value={draft.lat ?? ''}
              onChange={(e) => setDraft({ ...draft, lat: e.target.value === '' ? undefined : Number(e.target.value) })}
              placeholder="32.7767"
            />
          </div>

          <div>
            <div className="sf-label">Longitude</div>
            <input
              className="sf-input"
              inputMode="decimal"
              value={draft.lng ?? ''}
              onChange={(e) => setDraft({ ...draft, lng: e.target.value === '' ? undefined : Number(e.target.value) })}
              placeholder="-96.7970"
            />
          </div>

          <div>
            <div className="sf-label">Area (m²)</div>
            <input
              className="sf-input"
              inputMode="numeric"
              value={draft.area_m2 ?? ''}
              onChange={(e) => setDraft({ ...draft, area_m2: e.target.value === '' ? undefined : Number(e.target.value) })}
              placeholder="e.g. 10000"
            />
          </div>

          <div>
            <div className="sf-label">Workers (count)</div>
            <input
              className="sf-input"
              inputMode="numeric"
              value={draft.workers_count ?? ''}
              onChange={(e) => setDraft({ ...draft, workers_count: e.target.value === '' ? undefined : Number(e.target.value) })}
              placeholder="e.g. 120"
            />
          </div>

          <div className="md:col-span-2">
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={Boolean(draft.cold_chain_supported)}
                onChange={(e) => setDraft({ ...draft, cold_chain_supported: e.target.checked })}
              />
              Cold chain supported
            </label>
          </div>

          <div className="md:col-span-2">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="sf-label">Advanced metadata (JSON)</div>
                <div className="text-xs text-slate-500 mt-1">
                  Store your full canonical warehouse model here (zones, compliance, integrations, workforce, etc.).
                </div>
              </div>
              <button
                type="button"
                className="sf-btn"
                onClick={() => {
                  setMetadataText(JSON.stringify(warehouseMetadataTemplate, null, 2))
                  setMetadataError(null)
                }}
                disabled={saving}
              >
                Load template
              </button>
            </div>
            <textarea
              className="sf-input mt-2 font-mono text-xs"
              rows={12}
              value={metadataText}
              onChange={(e) => {
                setMetadataText(e.target.value)
                setMetadataError(null)
              }}
              placeholder='{"example": true}'
            />
            {metadataError && <div className="sf-alert sf-alert-error mt-2">{metadataError}</div>}
          </div>

          <div className="md:col-span-2 flex items-center justify-between gap-3">
            <button type="button" className="sf-btn" onClick={() => setDraft(emptyDraft)} disabled={saving}>
              Reset
            </button>
            <button type="submit" className="sf-btn sf-btn-primary" disabled={saving}>
              {saving ? 'Saving…' : 'Create warehouse'}
            </button>
          </div>
        </form>
      </div>

      <div className="card p-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-sm font-semibold text-slate-900">All warehouses</h3>
          <button className="sf-btn" onClick={() => void load()} disabled={loading}>
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="text-sm text-slate-600 mt-3">Loading…</div>
        ) : rows.length === 0 ? (
          <div className="text-sm text-slate-600 mt-3">No warehouses yet.</div>
        ) : (
          <div className="sf-table-wrap mt-4">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-slate-500">
                  <th className="py-2 pr-3 font-semibold">Name</th>
                  <th className="py-2 pr-3 font-semibold">Code</th>
                  <th className="py-2 pr-3 font-semibold">City</th>
                  <th className="py-2 pr-3 font-semibold">Country</th>
                  <th className="py-2 pr-3 font-semibold">Area (m²)</th>
                  <th className="py-2 pr-3 font-semibold">Area (ft²)</th>
                  <th className="py-2 pr-3 font-semibold">Workers</th>
                  <th className="py-2 pr-3 font-semibold">Cold</th>
                  <th className="py-2 pr-3 font-semibold">Actions</th>
                  <th className="py-2 pr-3 font-semibold">Created</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((w) => (
                  <tr key={w.id} className="border-t border-slate-100">
                    <td className="py-2 pr-3 font-medium text-slate-900">{w.name}</td>
                    <td className="py-2 pr-3 text-slate-700">{w.code || '—'}</td>
                    <td className="py-2 pr-3 text-slate-700">{w.city || '—'}</td>
                    <td className="py-2 pr-3 text-slate-700">{w.country || '—'}</td>
                    <td className="py-2 pr-3 text-slate-700">{typeof w.area_m2 === 'number' ? w.area_m2 : '—'}</td>
                    <td className="py-2 pr-3 text-slate-700">
                      {typeof w.area_m2 === 'number' ? Math.round(w.area_m2 * SQFT_PER_M2).toLocaleString() : '—'}
                    </td>
                    <td className="py-2 pr-3 text-slate-700">{typeof w.workers_count === 'number' ? w.workers_count : '—'}</td>
                    <td className="py-2 pr-3 text-slate-700">
                      {w.cold_chain_supported ? <span className="sf-badge bg-indigo-100 text-indigo-800">Yes</span> : 'No'}
                    </td>
                    <td className="py-2 pr-3 text-slate-700">
                      <button
                        type="button"
                        className="sf-btn"
                        onClick={() => void onDeleteWarehouse(w.id)}
                        disabled={deleteBusyId === w.id}
                      >
                        Delete
                      </button>
                    </td>
                    <td className="py-2 pr-3 text-slate-600">{new Date(w.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="card p-4" id="staff">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Warehouse staff</h3>
            <div className="text-xs text-slate-500 mt-1">
              Create WM/WO users and assign them to a warehouse. Staff sign in at{' '}
              <Link className="text-indigo-600 hover:text-indigo-700 font-semibold" to="/warehouse/login">
                /warehouse/login
              </Link>
              .
            </div>
          </div>
          <button
            className="sf-btn"
            onClick={() => selectedWarehouseId && void loadStaff(selectedWarehouseId)}
            disabled={staffLoading || !selectedWarehouseId}
          >
            Refresh
          </button>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <div className="sf-label">Warehouse</div>
            <select
              className="sf-input"
              value={selectedWarehouseId}
              onChange={(e) => setSelectedWarehouseId(e.target.value)}
              disabled={!rows.length}
            >
              {rows.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.name} {w.code ? `(${w.code})` : ''}
                </option>
              ))}
            </select>
          </div>
        </div>

        {staffError && <div className="sf-alert sf-alert-error mt-4">{staffError}</div>}
        {staffSuccess && <div className="sf-alert sf-alert-success mt-4">{staffSuccess}</div>}

        <form onSubmit={onCreateStaff} className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <div className="sf-label">Staff email</div>
            <input
              className="sf-input"
              value={staffDraft.email}
              onChange={(e) => setStaffDraft({ ...staffDraft, email: e.target.value })}
              placeholder="wo.dallas@shipfex.com"
            />
          </div>

          <div>
            <div className="sf-label">Password</div>
            <input
              className="sf-input"
              type="password"
              value={staffDraft.password}
              onChange={(e) => setStaffDraft({ ...staffDraft, password: e.target.value })}
              placeholder="min 6 chars"
            />
          </div>

          <div>
            <div className="sf-label">Role</div>
            <select
              className="sf-input"
              value={staffDraft.role}
              onChange={(e) => setStaffDraft({ ...staffDraft, role: e.target.value as 'WM' | 'WO' })}
            >
              <option value="WO">WO (Worker)</option>
              <option value="WM">WM (Manager)</option>
            </select>
          </div>

          <div>
            <div className="sf-label">Job title (optional)</div>
            <input
              className="sf-input"
              value={staffDraft.job_title ?? ''}
              onChange={(e) => setStaffDraft({ ...staffDraft, job_title: e.target.value })}
              placeholder="Picker / Packer / Supervisor"
            />
          </div>

          <div className="md:col-span-2 flex items-center justify-end gap-3">
            <button type="submit" className="sf-btn sf-btn-primary" disabled={staffSaving || !selectedWarehouseId}>
              {staffSaving ? 'Saving…' : 'Create staff user'}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-[0.2em]">Assigned staff</div>
          {staffLoading ? (
            <div className="text-sm text-slate-600 mt-3">Loading…</div>
          ) : staffRows.length === 0 ? (
            <div className="text-sm text-slate-600 mt-3">No staff assigned yet.</div>
          ) : (
            <div className="sf-table-wrap mt-3">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-slate-500">
                    <th className="py-2 pr-3 font-semibold">Email</th>
                    <th className="py-2 pr-3 font-semibold">Role</th>
                    <th className="py-2 pr-3 font-semibold">Job title</th>
                    <th className="py-2 pr-3 font-semibold">Active</th>
                    <th className="py-2 pr-3 font-semibold">Actions</th>
                    <th className="py-2 pr-3 font-semibold">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {staffRows.map((s) => (
                    <tr key={s.user_id} className="border-t border-slate-100">
                      <td className="py-2 pr-3 font-medium text-slate-900">{s.email}</td>
                      <td className="py-2 pr-3 text-slate-700">{s.role}</td>
                      <td className="py-2 pr-3 text-slate-700">{s.job_title || '—'}</td>
                      <td className="py-2 pr-3 text-slate-700">{s.active ? 'Yes' : 'No'}</td>
                      <td className="py-2 pr-3 text-slate-700">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            className="sf-btn"
                            onClick={() => void onToggleStaffActive(s)}
                            disabled={staffActionBusyUserId === s.user_id}
                          >
                            {s.active ? 'Deactivate' : 'Activate'}
                          </button>
                          <button
                            type="button"
                            className="sf-btn"
                            onClick={() => void onResetStaffPassword(s)}
                            disabled={staffActionBusyUserId === s.user_id}
                          >
                            Reset password
                          </button>
                        </div>
                      </td>
                      <td className="py-2 pr-3 text-slate-600">{new Date(s.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </PageShell>
  )
}
