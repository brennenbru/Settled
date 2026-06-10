import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useBets } from '../context/BetsContext'

const NAV_LINKS = [
  { to: '/dashboard',   label: 'Dashboard' },
  { to: '/betlog',      label: 'Bet Log' },
  { to: '/calendar',    label: 'Calendar' },
  { to: '/coach',       label: 'Bankroll Coach' },
  { to: '/leaderboard', label: 'Leaderboard' },
]

function Navbar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { user } = useBets()
  const [drawerOpen, setDrawerOpen] = useState(false)

  const handleSignOut = async () => {
    setDrawerOpen(false)
    await supabase.auth.signOut()
    navigate('/auth')
  }

  const closeDrawer = () => setDrawerOpen(false)

  return (
    <>
      <nav className="sticky top-0 z-40 flex items-center px-6 py-4 bg-[#1a1a2e]/90 backdrop-blur-md border-b border-white/5">
        <span className="text-[#00d4aa] font-bold text-xl mr-auto tracking-tight">Settled</span>

        {/* Mobile profile button — hidden on desktop */}
        <button
          onClick={() => setDrawerOpen(true)}
          className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Open menu"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
          </svg>
        </button>

        {/* Desktop links — hidden on mobile */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`transition-colors text-sm font-medium ${pathname === to ? 'text-[#00d4aa]' : 'text-white hover:text-[#00d4aa]'}`}
            >
              {label}
            </Link>
          ))}

          {user && (
            <button
              onClick={handleSignOut}
              className="ml-2 text-sm font-medium text-gray-400 hover:text-white transition-colors border border-white/10 rounded-lg px-3 py-1.5 hover:border-white/25"
            >
              Sign Out
            </button>
          )}
        </div>
      </nav>

      {/* Mobile drawer — only rendered on mobile via md:hidden on trigger, but drawer itself is always in DOM */}
      {drawerOpen && (
        <>
          {/* Backdrop */}
          <div
            className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={closeDrawer}
          />

          {/* Slide-up panel */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#1a1a2e] border-t border-white/10 rounded-t-2xl shadow-2xl animate-slide-up">
            {/* Handle + close button */}
            <div className="flex items-center justify-between px-5 pt-4 pb-2">
              <div className="w-10 h-1 bg-white/20 rounded-full mx-auto absolute left-1/2 -translate-x-1/2 top-3" />
              <div className="flex-1" />
              <button
                onClick={closeDrawer}
                className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close menu"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* User email */}
            <div className="px-5 py-3">
              <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-0.5">Signed in as</p>
              <p className="text-white text-sm font-medium truncate">{user?.email ?? '—'}</p>
            </div>

            <div className="mx-5 border-t border-white/8" />

            {/* Nav links */}
            <nav className="px-3 py-2">
              {NAV_LINKS.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={closeDrawer}
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-colors ${
                    pathname === to
                      ? 'text-[#00d4aa] bg-[#00d4aa]/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {label}
                  {pathname === to && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#00d4aa]" />
                  )}
                </Link>
              ))}
            </nav>

            <div className="mx-5 border-t border-white/8" />

            {/* Sign out */}
            <div className="px-3 py-3 pb-8">
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Sign Out
              </button>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Navbar
