import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import BottomNav from './components/BottomNav'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import BetLog from './pages/BetLog'
import Calendar from './pages/Calendar'
import BankrollCoach from './pages/BankrollCoach'
import Leaderboard from './pages/Leaderboard'
import { BetsProvider } from './context/BetsContext'

function AppShell() {
  const { pathname } = useLocation()
  const isLanding = pathname === '/'

  return (
    <>
      {!isLanding && <Navbar />}
      <div className={!isLanding ? 'pb-16 md:pb-0' : ''}>
        <Routes>
          <Route path="/"            element={<Landing />} />
          <Route path="/dashboard"   element={<Dashboard />} />
          <Route path="/betlog"      element={<BetLog />} />
          <Route path="/calendar"    element={<Calendar />} />
          <Route path="/coach"       element={<BankrollCoach />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
      {!isLanding && <BottomNav />}
    </>
  )
}

function App() {
  return (
    <BetsProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </BetsProvider>
  )
}

export default App
