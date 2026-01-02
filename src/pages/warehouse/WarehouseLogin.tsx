import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Factory, Mail, Lock } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { authStore } from '../../services/api'

export default function WarehouseLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const navigate = useNavigate()
  const { login, getRedirectPath } = useAuth()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const run = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const user = await login(email, password)

        // Warehouse portal is WM/WO only
        if (user.role !== 'WM' && user.role !== 'WO') {
          await authStore.logout()
          setError('This portal is for warehouse staff only (WM/WO).')
          setIsLoading(false)
          return
        }

        navigate(getRedirectPath(user.role), { replace: true })
      } catch (err: any) {
        setError(err?.message || 'Login failed')
        setIsLoading(false)
      }
    }
    run()
  }

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Factory size={32} className="text-indigo-600" />
              <span className="text-2xl font-bold text-slate-900">ShipFex</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Warehouse Portal</h1>
            <p className="text-slate-600">Sign in as WM / WO to manage operations</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="wm@shipfex.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 shadow-sm"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in…' : 'Sign In'}
            </button>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
                {error}
              </div>
            )}
          </form>

          <div className="mt-6 text-center text-xs text-slate-500">
            Use your warehouse staff credentials (WM/WO).
          </div>
        </div>
      </div>

      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-indigo-600 to-indigo-800 items-center justify-center p-12">
        <div className="max-w-md text-white">
          <h2 className="text-4xl font-bold mb-6">Operational control in one place</h2>
          <p className="text-lg text-blue-100 mb-8">
            Receive, pick, pack, count, adjust, and track work across your warehouse network.
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-500/30 border border-white/20 flex items-center justify-center flex-shrink-0">✓</div>
              <div>
                <p className="font-semibold">Task execution</p>
                <p className="text-blue-200 text-sm">Assignments and completion tracking</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-500/30 border border-white/20 flex items-center justify-center flex-shrink-0">✓</div>
              <div>
                <p className="font-semibold">Inventory controls</p>
                <p className="text-blue-200 text-sm">Adjustments with audit trail</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-500/30 border border-white/20 flex items-center justify-center flex-shrink-0">✓</div>
              <div>
                <p className="font-semibold">Warehouse visibility</p>
                <p className="text-blue-200 text-sm">Capacity, staffing, cold-chain notes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
