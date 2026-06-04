import { createContext, useContext, useState } from 'react'

const BetsContext = createContext(null)

export function BetsProvider({ children }) {
  const [bets, setBets] = useState([])

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
