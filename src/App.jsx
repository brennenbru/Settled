import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import BottomNav from './components/BottomNav'
import Landing from './pages/Landing'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import BetLog from './pages/BetLog'
import Calendar from './pages/Calendar'
import BankrollCoach from './pages/BankrollCoach'
import Leaderboard from './pages/Leaderboard'
import { BetsProvider, useBets } from './context/BetsContext'

// Wraps any route that requires authentication
function ProtectedRoute({ children }) {
  const { user } = useBets()
  // user is null  → not yet resolved or genuinely logged out
  // We allow a brief undefined window; null after session check = redirect
  if (user === null) {
    return <Navigate to="/auth" replace />
  }
  return children
}

function AppShell() {
  const { pathname } = useLocation()
  const isLanding = pathname === '/'
  const isAuth = pathname === '/auth'
  const hideChrome = isLanding || isAuth

  return (
    <>
      {!hideChrome && <Navbar />}
      <div className={!hideChrome ? 'pb-16 md:pb-0' : ''}>
        <Routes>
          <Route path="/"            element={<Landing />} />
          <Route path="/auth"        element={<Auth />} />
          <Route path="/dashboard"   element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/betlog"      element={<ProtectedRoute><BetLog /></ProtectedRoute>} />
          <Route path="/calendar"    element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
          <Route path="/coach"       element={<ProtectedRoute><BankrollCoach /></ProtectedRoute>} />
          <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
        </Routes>
      </div>
      {!hideChrome && <BottomNav />}
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
