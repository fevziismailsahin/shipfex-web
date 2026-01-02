import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

interface Crumb {
  label: string
  href?: string
}

interface PageShellProps {
  title: string
  subtitle?: string
  actions?: ReactNode
  breadcrumbs?: Crumb[]
  children: ReactNode
}

// Shared page shell for consistent headers and spacing
export default function PageShell({ title, subtitle, actions, breadcrumbs, children }: PageShellProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav className="flex items-center gap-1 text-xs text-slate-500" aria-label="Breadcrumb">
              {breadcrumbs.map((crumb, idx) => (
                <div key={crumb.label} className="flex items-center gap-1">
                  {crumb.href ? (
                    <Link to={crumb.href} className="hover:text-slate-700">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span>{crumb.label}</span>
                  )}
                  {idx < breadcrumbs.length - 1 && <ChevronRight size={14} className="text-slate-400" />}
                </div>
              ))}
            </nav>
          )}
          <div>
            <h1 className="text-2xl font-bold text-slate-900 leading-tight">{title}</h1>
            {subtitle && <p className="text-slate-600 text-sm mt-1">{subtitle}</p>}
          </div>
        </div>
        {actions && <div className="flex-shrink-0">{actions}</div>}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  )
}
