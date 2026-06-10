import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const BetsContext = createContext(null)

function calcProfit(wager, odds) {
  const w = parseFloat(wager)
  const o = parseInt(odds)
  if (!w || isNaN(o)) return 0
  return o > 0 ? w * (o / 100) : w * (100 / Math.abs(o))
}

function calcActualPL(wager, odds, result) {
  if (result === 'Win') return calcProfit(wager, odds)
  if (result === 'Loss') return -parseFloat(wager)
  if (result === 'Push') return 0
  return null
}

// Convert a Supabase row (snake_case) → UI bet object (camelCase + computed fields)
function fromSupabase(row) {
  const cashoutAmount = row.cashout_amount ?? null
  const result = row.result
  const actualPL = result === 'Cashed Out' && cashoutAmount != null
    ? cashoutAmount - row.wager
    : calcActualPL(row.wager, row.odds, result)

  return {
    id: row.id,
    date: row.date,
    sport: row.sport,
    sportsbook: row.sportsbook,
    betType: row.bet_type,
    description: row.description,
    wager: row.wager,
    odds: row.odds,
    result,
    followingCoaching: row.following_coaching,
    cashoutAmount,
    profit: calcProfit(row.wager, row.odds),
    actualPL,
  }
}

// Convert a UI bet object (camelCase) → Supabase row (snake_case, exact columns only)
function toSupabase(bet, userId) {
  const row = {
    user_id: String(userId),
    date: String(bet.date),
    sport: String(bet.sport),
    sportsbook: String(bet.sportsbook),
    bet_type: String(bet.betType),
    description: String(bet.description),
    wager: Number(bet.wager),
    odds: Math.round(Number(bet.odds)),
    result: String(bet.result),
    following_coaching: Boolean(bet.followingCoaching),
  }
  if (bet.cashoutAmount != null) {
    row.cashout_amount = Number(bet.cashoutAmount)
  }
  return row
}

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
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

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
        if (error) {
          console.error('[BetsContext] fetch error:', error)
          return
        }
        if (data) {
          setBets(data.map(fromSupabase))
        }
      })
  }, [user])

  // ── Persist to localStorage when not logged in ──────────────────────────────
  useEffect(() => {
    if (!user) {
      localStorage.setItem('settled-bets', JSON.stringify(bets))
    }
  }, [bets, user])

  // ── addBet — returns { error } so the caller can surface failures ───────────
  const addBet = async (bet) => {
    console.log('[addBet] called, user:', user?.id ?? 'not logged in')
    console.log('[addBet] incoming bet:', bet)

    if (user) {
      const row = toSupabase(bet, user.id)
      console.log('[addBet] inserting row:', row)

      const { data, error } = await supabase
        .from('bets')
        .insert(row)
        .select()
        .single()

      if (error) {
        console.error('[addBet] Supabase error:', error)
        return { error: error.message }
      }

      console.log('[addBet] insert succeeded:', data)
      setBets(prev => [fromSupabase(data), ...prev])
      return { error: null }
    } else {
      setBets(prev => [bet, ...prev])
      return { error: null }
    }
  }

  // ── updateBet — update result (and optionally cashout amount) ───────────────
  const updateBet = async (id, result, cashoutAmount = null) => {
    const updates = { result }
    if (cashoutAmount != null) updates.cashout_amount = cashoutAmount

    if (user) {
      const { data, error } = await supabase
        .from('bets')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single()

      if (error) {
        console.error('[updateBet] Supabase error:', error)
        return { error: error.message }
      }

      setBets(prev => prev.map(b => b.id === id ? fromSupabase(data) : b))
      return { error: null }
    } else {
      setBets(prev => prev.map(b => {
        if (b.id !== id) return b
        const actualPL = result === 'Cashed Out' && cashoutAmount != null
          ? cashoutAmount - b.wager
          : calcActualPL(b.wager, b.odds, result)
        return { ...b, result, cashoutAmount, actualPL }
      }))
      return { error: null }
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
    <BetsContext.Provider value={{ bets, addBet, updateBet, deleteBet, user }}>
      {children}
    </BetsContext.Provider>
  )
}

export function useBets() {
  return useContext(BetsContext)
}
