import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="flex items-center gap-6 px-6 py-4 bg-[#1a1a2e]">
      <span className="text-[#00d4aa] font-bold text-xl mr-auto">Settled</span>
      <Link to="/" className="text-white hover:text-[#00d4aa] transition-colors">Dashboard</Link>
      <Link to="/betlog" className="text-white hover:text-[#00d4aa] transition-colors">Bet Log</Link>
      <Link to="/calendar" className="text-white hover:text-[#00d4aa] transition-colors">Calendar</Link>
      <Link to="/coach" className="text-white hover:text-[#00d4aa] transition-colors">Bankroll Coach</Link>
      <Link to="/leaderboard" className="text-white hover:text-[#00d4aa] transition-colors">Leaderboard</Link>
    </nav>
  )
}

export default Navbar