import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav style={{
      display: 'flex',
      gap: '20px',
      padding: '16px 24px',
      backgroundColor: '#1a1a2e',
      alignItems: 'center'
    }}>
      <span style={{ color: '#00d4aa', fontWeight: 'bold', fontSize: '20px', marginRight: 'auto' }}>
        Settled
      </span>
      <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link>
      <Link to="/betlog" style={{ color: 'white', textDecoration: 'none' }}>Bet Log</Link>
      <Link to="/calendar" style={{ color: 'white', textDecoration: 'none' }}>Calendar</Link>
      <Link to="/coach" style={{ color: 'white', textDecoration: 'none' }}>Bankroll Coach</Link>
      <Link to="/leaderboard" style={{ color: 'white', textDecoration: 'none' }}>Leaderboard</Link>
    </nav>
  )
}

export default Navbar