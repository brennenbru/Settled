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

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    navigate('/auth')
  }

  return (
    <nav className="sticky top-0 z-40 flex items-center px-6 py-4 bg-[#1a1a2e]/90 backdrop-blur-md border-b border-white/5">
      <span className="text-[#00d4aa] font-bold text-xl mr-auto tracking-tight">Settled</span>

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
  )
}

export default Navbar
