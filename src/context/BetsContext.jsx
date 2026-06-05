import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const BetsContext = createContext(null)

export function BetsProvider({ children }) {
  const [user, setUser] = useState(null)
  const [bets, setBets] = useState(() => {
    try {
      const saved = localStorage.getItem('settled-bets')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  // ── Auth: listen for session changes ────────────────────────────────────────
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    // Subscribe to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  // ── Fetch bets from Supabase when user logs in ──────────────────────────────
  useEffect(() => {
    if (!user) return

    supabase
      .from('bets')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) {
          setBets(data)
        }
      })
  }, [user])

  // ── Persist to localStorage when not logged in ──────────────────────────────
  useEffect(() => {
    if (!user) {
      localStorage.setItem('settled-bets', JSON.stringify(bets))
    }
  }, [bets, user])

  // ── addBet ──────────────────────────────────────────────────────────────────
  const addBet = async (bet) => {
    if (user) {
      const { data, error } = await supabase
        .from('bets')
        .insert({ ...bet, user_id: user.id })
        .select()
        .single()

      if (!error && data) {
        setBets(prev => [data, ...prev])
      }
    } else {
      setBets(prev => [bet, ...prev])
    }
  }

  // ── deleteBet ───────────────────────────────────────────────────────────────
  const deleteBet = async (id) => {
    if (user) {
      const { error } = await supabase
        .from('bets')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id)

      if (!error) {
        setBets(prev => prev.filter(b => b.id !== id))
      }
    } else {
      setBets(prev => prev.filter(b => b.id !== id))
    }
  }

  return (
    <BetsContext.Provider value={{ bets, addBet, deleteBet, user }}>
      {children}
    </BetsContext.Provider>
  )
}

export function useBets() {
  return useContext(BetsContext)
}
