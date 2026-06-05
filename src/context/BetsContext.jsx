import { createContext, useContext, useState, useEffect } from 'react'

const BetsContext = createContext(null)

export function BetsProvider({ children }) {
  const [bets, setBets] = useState(() => {
    try {
      const saved = localStorage.getItem('settled-bets')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('settled-bets', JSON.stringify(bets))
  }, [bets])

  const addBet = (bet) => setBets(prev => [bet, ...prev])
  const deleteBet = (id) => setBets(prev => prev.filter(b => b.id !== id))

  return (
    <BetsContext.Provider value={{ bets, addBet, deleteBet }}>
      {children}
    </BetsContext.Provider>
  )
}

export function useBets() {
  return useContext(BetsContext)
}
