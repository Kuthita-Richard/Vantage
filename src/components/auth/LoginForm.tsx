'use client'

import { signIn } from 'next-auth/react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { BarChart2, Eye, EyeOff, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export default function LoginForm() {
  const params = useSearchParams()
  const router = useRouter()
  const callbackUrl = params.get('callbackUrl') || '/'

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState<'google' | 'credentials' | null>(null)

  const handleGoogle = async () => {
    setLoading('google')
    await signIn('google', { callbackUrl })
  }

  const handleCredentials = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !password) {
      toast.error('Please enter your name and the access password')
      return
    }
    setLoading('credentials')
    const res = await signIn('credentials', { name: name.trim(), password, redirect: false })
    if (res?.error) {
      toast.error('Incorrect password or name too short')
      setLoading(null)
    } else {
      router.push(callbackUrl)
    }
  }

  const inputCls = `w-full px-3 py-2.5 rounded-xl text-sm border outline-none transition-all
    focus:ring-2 focus:ring-[#0284c7] focus:border-[#0284c7]`

  return (
    <div className="min-h-screen flex" style={{ background: '#f0f7ff' }}>
      <div className="hidden lg:flex w-1/2 flex-col justify-between p-12" style={{ background: '#0c3460' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(125,211,252,0.2)', border: '1px solid rgba(125,211,252,0.3)' }}>
            <BarChart2 size={22} color="#7dd3fc" />
          </div>
          <span className="text-white font-bold text-lg">Vantage</span>
        </div>

        <div>
          <h1 className="text-4xl font-extrabold text-white leading-tight">
            Sales performance,<br />crystal clear.
          </h1>
          <p className="mt-4 text-base" style={{ color: '#93c5fd' }}>
            Real-time dashboards, drill-through charts, and branded PDF reports.
            All your data in one place.
          </p>

          <div className="flex gap-3 mt-8 flex-wrap">
            {[
              { label: 'Live dashboard', color: '#7dd3fc' },
              { label: 'PDF reports', color: '#86efac' },
              { label: 'Drill-through', color: '#fde68a' },
              { label: 'Google Sheets', color: '#f9a8d4' },
            ].map((p) => (
              <span key={p.label} className="text-xs px-3 py-1.5 rounded-full font-medium" style={{ background: 'rgba(255,255,255,0.08)', color: p.color }}>
                {p.label}
              </span>
            ))}
          </div>
        </div>

        <p className="text-xs" style={{ color: 'rgba(147,197,253,0.5)' }}>
          © {new Date().getFullYear()} Vantage. Built with Next.js 16.
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: '#0c3460' }}>
              <BarChart2 size={18} color="#7dd3fc" />
            </div>
            <span className="font-bold text-lg" style={{ color: '#0c3460' }}>Vantage</span>
          </div>

          <h2 className="text-2xl font-bold mb-1" style={{ color: '#0c1a2e' }}>Sign in</h2>
          <p className="text-sm mb-8" style={{ color: '#4b6a8f' }}>
            Access your sales dashboard
          </p>

          <div className="rounded-2xl border p-6 shadow-sm space-y-5" style={{ background: '#ffffff', borderColor: '#bfdbfe' }}>
            <button onClick={handleGoogle} disabled={!!loading}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border text-sm font-semibold transition-all hover:shadow-md disabled:opacity-50"
              style={{ background: '#ffffff', borderColor: '#bfdbfe', color: '#0c1a2e' }}>
              {loading === 'google'
                ? <Loader2 size={16} className="animate-spin" />
                : (
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                )}
              Continue with Google
            </button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px" style={{ background: '#bfdbfe' }} />
              <span className="text-xs font-medium" style={{ color: '#4b6a8f' }}>or shared access</span>
              <div className="flex-1 h-px" style={{ background: '#bfdbfe' }} />
            </div>

            <form onSubmit={handleCredentials} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: '#4b6a8f' }}>
                  Your Name
                </label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name" disabled={!!loading}
                  className={inputCls}
                  style={{ background: '#f0f9ff', borderColor: '#bfdbfe', color: '#0c1a2e' }} />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: '#4b6a8f' }}>
                  Access Password
                </label>
                <div className="relative">
                  <input type={showPw ? 'text' : 'password'} value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Shared access password" disabled={!!loading}
                    className={inputCls}
                    style={{ background: '#f0f9ff', borderColor: '#bfdbfe', color: '#0c1a2e', paddingRight: 40 }} />
                  <button type="button" onClick={() => setShowPw((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-70 transition-opacity">
                    {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              <button type="submit" disabled={!!loading}
                className="w-full py-3 rounded-xl text-sm font-semibold transition-all hover:shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
                style={{ background: '#0284c7', color: 'white' }}>
                {loading === 'credentials' && <Loader2 size={14} className="animate-spin" />}
                Sign In
              </button>
            </form>
          </div>

          <p className="text-center text-xs mt-5" style={{ color: '#4b6a8f' }}>
            No account? Contact your administrator to get access.
          </p>
        </div>
      </div>
    </div>
  )
}
