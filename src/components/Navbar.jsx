import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { to: '/',            label: 'Dashboard' },
  { to: '/betlog',      label: 'Bet Log' },
  { to: '/calendar',    label: 'Calendar' },
  { to: '/coach',       label: 'Bankroll Coach' },
  { to: '/leaderboard', label: 'Leaderboard' },
]

function Navbar() {
  const { pathname } = useLocation()

  return (
    <nav className="flex items-center px-6 py-4 bg-[#1a1a2e]">
      <span className="text-[#00d4aa] font-bold text-xl mr-auto">Settled</span>
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
      </div>
    </nav>
  )
}

export default Navbar
