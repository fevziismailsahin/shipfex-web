import { Outlet, Link, NavLink } from 'react-router-dom'
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram, ChevronDown, Warehouse } from 'lucide-react'

const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/',
  twitter: 'https://x.com/',
  linkedin: 'https://www.linkedin.com/',
  instagram: 'https://www.instagram.com/',
} as const

export default function MarketingLayout() {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors ${
      isActive ? 'text-blue-600' : 'text-slate-700 hover:text-blue-600'
    }`

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Bar */}
      <div className="bg-slate-900 text-white py-2 text-xs">
        <div className="container mx-auto px-4 flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <a href="tel:+18001234567" className="flex items-center gap-1 hover:text-blue-400">
              <Phone size={12} /> +1 (800) 123-4567
            </a>
            <a href="mailto:info@shipfex.com" className="flex items-center gap-1 hover:text-blue-400">
              <Mail size={12} /> info@shipfex.com
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer" className="hover:text-blue-400" aria-label="Facebook"><Facebook size={14} /></a>
            <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noreferrer" className="hover:text-blue-400" aria-label="X"><Twitter size={14} /></a>
            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer" className="hover:text-blue-400" aria-label="LinkedIn"><Linkedin size={14} /></a>
            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" className="hover:text-blue-400" aria-label="Instagram"><Instagram size={14} /></a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-900 shadow-sm">
                <Warehouse size={20} />
              </div>
              <span className="text-xl font-bold text-slate-900">ShipFex</span>
            </Link>

            <div className="hidden lg:flex items-center gap-6">
              <NavLink to="/" className={navLinkClass}>Home</NavLink>
              <NavLink to="/about" className={navLinkClass}>About</NavLink>
              
              <div className="relative group">
                <NavLink
                  to="/services"
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors flex items-center gap-1 ${
                      isActive ? 'text-blue-600' : 'text-slate-700 hover:text-blue-600'
                    }`
                  }
                >
                  Services <ChevronDown size={14} />
                </NavLink>
                <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-slate-200 rounded-lg shadow-xl py-2 hidden group-hover:block">
                  <Link to="/services" className="block px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600">
                    All Services
                  </Link>
                  <Link to="/services/amazon-fba" className="block px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600">
                    Amazon FBA
                  </Link>
                  <Link to="/services/amazon-fbm" className="block px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600">
                    Amazon FBM
                  </Link>
                  <Link to="/services/dropshipping" className="block px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600">
                    Dropshipping
                  </Link>
                  <Link to="/services/logistics" className="block px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600">
                    Logistics
                  </Link>
                  <Link to="/services/customs" className="block px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600">
                    Customs
                  </Link>
                </div>
              </div>

              <NavLink to="/warehouses" className={navLinkClass}>Warehouses</NavLink>
              <NavLink to="/pricing" className={navLinkClass}>Pricing</NavLink>
              <NavLink to="/blog" className={navLinkClass}>Blog</NavLink>
              <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
            </div>

            <div className="flex items-center gap-3">
              <Link to="/login" className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-blue-600">
                Login
              </Link>
              <Link to="/signup" className="px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md">
                Get Started
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white pt-12 pb-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-white">
                  <Warehouse size={20} />
                </div>
                <span className="text-xl font-bold">ShipFex</span>
              </div>
              <p className="text-slate-400 text-sm mb-4">
                Professional logistics and fulfillment services for e-commerce businesses across North America.
              </p>
              <div className="flex gap-3">
                <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition">
                  <Facebook size={16} />
                </a>
                <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noreferrer" aria-label="X" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition">
                  <Twitter size={16} />
                </a>
                <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition">
                  <Linkedin size={16} />
                </a>
                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition">
                  <Instagram size={16} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to="/services/amazon-fba" className="hover:text-white">Amazon FBA</Link></li>
                <li><Link to="/services/amazon-fbm" className="hover:text-white">Amazon FBM</Link></li>
                <li><Link to="/services/dropshipping" className="hover:text-white">Dropshipping</Link></li>
                <li><Link to="/services/logistics" className="hover:text-white">Logistics</Link></li>
                <li><Link to="/services/customs" className="hover:text-white">Customs</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                <li><Link to="/warehouses" className="hover:text-white">Warehouses</Link></li>
                <li><Link to="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="flex items-start gap-2">
                  <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                  <span>123 Warehouse Blvd, Los Angeles, CA 90001</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone size={16} />
                  <a href="tel:+18001234567" className="hover:text-white">+1 (800) 123-4567</a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={16} />
                  <a href="mailto:info@shipfex.com" className="hover:text-white">info@shipfex.com</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
            <p>&copy; 2026 ShipFex. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="/legal/privacy" className="hover:text-white">Privacy Policy</Link>
              <Link to="/legal/terms" className="hover:text-white">Terms of Service</Link>
              <Link to="/legal/pricing-transparency" className="hover:text-white">Pricing Transparency</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
