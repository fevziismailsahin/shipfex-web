import { useLocation } from 'react-router-dom'

interface Props {
  title: string
  description?: string
}

// Simple placeholder page to quickly wire routes during MVP
export default function PlaceholderPage({ title, description }: Props) {
  const location = useLocation()
  return (
    <div className="max-w-4xl space-y-4">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">MVP Placeholder</p>
        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
        {description && <p className="text-slate-600">{description}</p>}
      </div>
      <div className="rounded-lg border border-dashed border-slate-200 bg-white p-4 text-sm text-slate-500 shadow-sm">
        <p className="font-semibold text-slate-700">Route</p>
        <code className="text-indigo-600">{location.pathname}</code>
      </div>
    </div>
  )
}
