import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Auth() {
  const [mode, setMode] = useState('signin') // 'signin' | 'signup'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)

    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) {
        setError(error.message)
      } else {
        setMessage('Check your email for a confirmation link.')
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        setError(error.message)
      } else {
        navigate('/dashboard')
      }
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#0f0f1a] flex items-center justify-center px-4">
      {/* Ambient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[400px] bg-[#00d4aa]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-purple-600/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <div className="w-9 h-9 bg-[#00d4aa] rounded-xl flex items-center justify-center shadow-lg shadow-[#00d4aa]/25">
            <svg viewBox="0 0 16 16" className="w-5 h-5" fill="none">
              <polyline
                stroke="#0f0f1a"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points="2 10 5 7 8 9 13 4"
              />
            </svg>
          </div>
          <span className="text-white font-black text-2xl tracking-tight">Settled</span>
        </div>

        {/* Card */}
        <div className="bg-[#1a1a2e] rounded-2xl border border-white/8 shadow-2xl p-8">
          <h1 className="text-white font-bold text-xl mb-1 tracking-tight">
            {mode === 'signin' ? 'Welcome back' : 'Create your account'}
          </h1>
          <p className="text-gray-500 text-sm mb-7">
            {mode === 'signin'
              ? 'Sign in to access your bets and insights.'
              : 'Start tracking smarter in seconds.'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-400 text-xs font-semibold mb-1.5 uppercase tracking-wide">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-[#0f0f1a] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#00d4aa]/50 focus:ring-1 focus:ring-[#00d4aa]/25 transition-colors"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-xs font-semibold mb-1.5 uppercase tracking-wide">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#0f0f1a] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#00d4aa]/50 focus:ring-1 focus:ring-[#00d4aa]/25 transition-colors"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            {message && (
              <div className="bg-[#00d4aa]/10 border border-[#00d4aa]/20 rounded-xl px-4 py-3 text-[#00d4aa] text-sm">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00d4aa] text-[#0f0f1a] font-bold py-3 rounded-xl text-sm hover:bg-[#00bfa0] transition-all hover:scale-[1.01] shadow-lg shadow-[#00d4aa]/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading
                ? 'Loading…'
                : mode === 'signin'
                ? 'Sign In'
                : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/5 text-center">
            <span className="text-gray-500 text-sm">
              {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
            </span>
            <button
              onClick={() => {
                setMode(mode === 'signin' ? 'signup' : 'signin')
                setError(null)
                setMessage(null)
              }}
              className="text-[#00d4aa] text-sm font-semibold hover:underline"
            >
              {mode === 'signin' ? 'Sign Up' : 'Sign In'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
