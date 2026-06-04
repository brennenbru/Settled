import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import BottomNav from './components/BottomNav'
import Dashboard from './pages/Dashboard'
import BetLog from './pages/BetLog'
import Calendar from './pages/Calendar'
import BankrollCoach from './pages/BankrollCoach'
import Leaderboard from './pages/Leaderboard'
import { BetsProvider } from './context/BetsContext'

function App() {
  return (
    <BetsProvider>
    <BrowserRouter>
      <Navbar />
      <div className="pb-16 md:pb-0">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/betlog" element={<BetLog />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/coach" element={<BankrollCoach />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
      </div>
      <BottomNav />
    </BrowserRouter>
    </BetsProvider>
  )
}

export default App