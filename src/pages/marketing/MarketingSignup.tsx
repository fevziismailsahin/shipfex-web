import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Warehouse, Mail, Lock, User, Building2 } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

export default function MarketingSignupPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    password: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const { signup, getRedirectPath } = useAuth()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const run = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const user = await signup(formData.email, formData.password, 'MERCHANT', formData.company)
        const target = getRedirectPath(user.role)
        navigate(target, { replace: true })
      } catch (err: any) {
        setError(err?.message || 'Signup failed')
        setIsLoading(false)
      }
    }
    run()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-white py-12">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Warehouse size={32} className="text-slate-900" />
              <span className="text-2xl font-bold text-slate-900">ShipFex</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Create Your Account</h1>
            <p className="text-slate-600">Start scaling your e-commerce business today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">First Name</label>
                <div className="relative">
                  <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="John"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Last Name</label>
                <div className="relative">
                  <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="you@company.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Company Name</label>
              <div className="relative">
                <Building2 size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="Acme Inc."
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="••••••••"
                  required
                />
              </div>
              <p className="text-xs text-slate-500 mt-1">Minimum 8 characters</p>
            </div>

            <div className="flex items-start">
              <input type="checkbox" className="w-4 h-4 text-indigo-600 border-slate-300 rounded mt-0.5" required />
              <label className="ml-2 text-sm text-slate-600">
                I agree to the{' '}
                <Link to="/legal/terms" className="text-indigo-600 hover:text-indigo-700 font-semibold">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/legal/privacy" className="text-indigo-600 hover:text-indigo-700 font-semibold">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 shadow-sm"
              disabled={isLoading}
            >
              {isLoading ? 'Creating account…' : 'Create Account'}
            </button>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
                {error}
              </div>
            )}
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-600 hover:text-indigo-700 font-semibold">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Benefits */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-indigo-600 to-indigo-800 items-center justify-center p-12">
        <div className="max-w-md text-white">
          <h2 className="text-4xl font-bold mb-6">
            Why Choose ShipFex?
          </h2>
          <p className="text-lg text-indigo-100 mb-8">
            Join 2,000+ businesses fulfilling millions of orders every month
          </p>
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-500/30 border border-white/20 flex items-center justify-center flex-shrink-0 text-lg">
                🚀
              </div>
              <div>
                <p className="font-semibold text-lg">Fast Setup</p>
                <p className="text-indigo-200">Live in 48 hours with full onboarding support</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-500/30 border border-white/20 flex items-center justify-center flex-shrink-0 text-lg">
                💰
              </div>
              <div>
                <p className="font-semibold text-lg">Transparent Pricing</p>
                <p className="text-indigo-200">No hidden fees. Pay only for what you use</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-500/30 border border-white/20 flex items-center justify-center flex-shrink-0 text-lg">
                🌍
              </div>
              <div>
                <p className="font-semibold text-lg">Global Reach</p>
                <p className="text-indigo-200">12 warehouses across North America</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-500/30 border border-white/20 flex items-center justify-center flex-shrink-0 text-lg">
                🔗
              </div>
              <div>
                <p className="font-semibold text-lg">Easy Integration</p>
                <p className="text-indigo-200">Connect Amazon, Shopify, eBay, and 50+ platforms</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
