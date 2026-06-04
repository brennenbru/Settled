import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
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
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/betlog" element={<BetLog />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/coach" element={<BankrollCoach />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </BrowserRouter>
    </BetsProvider>
  )
}

export default App