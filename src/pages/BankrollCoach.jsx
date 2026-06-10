import { useState, useEffect, useMemo } from 'react'
import { useBets } from '../context/BetsContext'

const RISK_LEVELS = [
  { key: 'conservative', label: 'Conservative', range: '1–2% per bet', desc: 'Lower risk, steady growth', pct: 1.5 },
  { key: 'moderate',     label: 'Moderate',     range: '3–5% per bet', desc: 'Balanced risk and reward', pct: 4 },
  { key: 'aggressive',   label: 'Aggressive',   range: '5–10% per bet', desc: 'Higher risk, higher ceiling', pct: 7.5 },
]

const STORAGE_KEY = 'settled_coach_profile'

function loadProfile() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) } catch { return null }
}
function saveProfile(p) { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)) }

function formatPL(v) {
  if (v === 0) return '$0.00'
  return v > 0 ? `+$${v.toFixed(2)}` : `-$${Math.abs(v).toFixed(2)}`
}

function ProgressBar({ pct, color }) {
  const clamped = Math.min(100, Math.max(0, pct))
  return (
    <div className="h-2.5 bg-white/[0.06] rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-700 ease-out ${color}`}
        style={{ width: `${clamped}%`, boxShadow: clamped > 0 ? '0 0 8px currentColor' : 'none' }}
      />
    </div>
  )
}

// ── Goals Setup Form ─────────────────────────────────────────────────────────
function SetupForm({ initial, onSave }) {
  const [form, setForm] = useState(initial ?? {
    bankroll: '',
    dailyLoss: '',
    dailyWin: '',
    risk: 'moderate',
  })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSave = (e) => {
    e.preventDefault()
    if (!form.bankroll || !form.dailyLoss || !form.dailyWin) return
    onSave({ ...form, bankroll: parseFloat(form.bankroll), dailyLoss: parseFloat(form.dailyLoss), dailyWin: parseFloat(form.dailyWin) })
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-8">
        <div className="relative w-16 h-16 mx-auto mb-5">
          <div className="absolute inset-0 bg-[#00d4aa]/20 rounded-2xl blur-xl" />
          <div className="relative w-16 h-16 bg-gradient-to-br from-[#00d4aa]/20 to-[#00d4aa]/5 rounded-2xl border border-[#00d4aa]/20 flex items-center justify-center">
            <svg className="w-8 h-8 text-[#00d4aa]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Let's set up your coaching profile</h2>
        <p className="text-gray-500 text-sm mt-2">We'll use this to give you personalized advice every day.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-5">
        <div className="bg-[#1a1a2e] rounded-2xl p-5 border border-white/5 space-y-4">
          <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">Bankroll & Limits</h3>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Starting Bankroll ($)</label>
            <input
              type="number" min="1" step="0.01" placeholder="1000.00"
              value={form.bankroll} onChange={e => set('bankroll', e.target.value)} required
              className="w-full bg-[#0f0f1a] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#00d4aa] transition-colors"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Daily Loss Limit ($)</label>
              <input
                type="number" min="1" step="0.01" placeholder="100.00"
                value={form.dailyLoss} onChange={e => set('dailyLoss', e.target.value)} required
                className="w-full bg-[#0f0f1a] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#00d4aa] transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Daily Win Goal ($)</label>
              <input
                type="number" min="1" step="0.01" placeholder="200.00"
                value={form.dailyWin} onChange={e => set('dailyWin', e.target.value)} required
                className="w-full bg-[#0f0f1a] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#00d4aa] transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="bg-[#1a1a2e] rounded-2xl p-6 border border-white/5 shadow-lg hover:border-white/10 transition-colors">
          <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wide mb-4">Risk Level</h3>
          <div className="space-y-2">
            {RISK_LEVELS.map(r => (
              <button
                key={r.key} type="button" onClick={() => set('risk', r.key)}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all ${
                  form.risk === r.key
                    ? 'border-[#00d4aa] bg-[#00d4aa]/10'
                    : 'border-white/10 bg-[#0f0f1a] hover:border-white/20'
                }`}
              >
                <div className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center ${form.risk === r.key ? 'border-[#00d4aa]' : 'border-gray-600'}`}>
                  {form.risk === r.key && <div className="w-2 h-2 rounded-full bg-[#00d4aa]" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-semibold">{r.label}</p>
                  <p className="text-gray-500 text-xs">{r.desc}</p>
                </div>
                <span className="text-[#00d4aa] text-xs font-medium shrink-0">{r.range}</span>
              </button>
            ))}
          </div>
        </div>

        <button type="submit" className="w-full py-4 bg-[#00d4aa] text-[#0f0f1a] font-bold rounded-2xl hover:bg-[#00bfa0] hover:scale-[1.02] transition-all text-base shadow-lg shadow-[#00d4aa]/20">
          Save My Profile
        </button>
      </form>
    </div>
  )
}

// ── AI Insights ──────────────────────────────────────────────────────────────
const SEVERITY_STYLES = {
  positive: { border: 'border-l-green-500',  icon: 'text-green-400',  bg: 'bg-green-500/10',  label: '↑' },
  warning:  { border: 'border-l-yellow-500', icon: 'text-yellow-400', bg: 'bg-yellow-500/10', label: '!' },
  negative: { border: 'border-l-red-500',    icon: 'text-red-400',    bg: 'bg-red-500/10',    label: '↓' },
}

function AIInsights({ bets }) {
  const [state, setState] = useState('idle') // idle | loading | done | error
  const [insights, setInsights] = useState([])
  const [errorMsg, setErrorMsg] = useState('')

  const analyze = async () => {
    const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY
    if (!apiKey) {
      setErrorMsg('API key is not configured. Add VITE_ANTHROPIC_API_KEY to your .env file.')
      setState('error')
      return
    }

    setState('loading')
    setErrorMsg('')
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1000,
          system: 'You are an expert sports betting coach analyzing a bettor\'s personal history. Return ONLY a valid JSON array of exactly 5 insight objects. Each object must have: title (string), stat (string, e.g. 2-9 or -$234 or 23%), description (string, one sentence, personal and specific), severity (string, one of: positive, warning, negative). No other text, no markdown, just the raw JSON array.',
          messages: [{
            role: 'user',
            content: 'Here is my complete betting history. Analyze it and give me 5 personalized insights about my patterns, weaknesses, and strengths: ' + JSON.stringify(bets),
          }],
        }),
      })

      const data = await res.json()
      console.log('Anthropic API response:', data)

      if (!res.ok) {
        const msg = data?.error?.message ?? `HTTP ${res.status}`
        throw new Error(msg)
      }

      const text = data.content?.[0]?.text ?? ''
      const parsed = JSON.parse(text)
      if (!Array.isArray(parsed)) throw new Error('Invalid response format')
      setInsights(parsed)
      setState('done')
    } catch (err) {
      console.error('Anthropic API error:', err)
      setErrorMsg(err.message || 'Unable to analyze bets right now. Try again.')
      setState('error')
    }
  }

  if (bets.length < 5) {
    return (
      <div className="bg-[#1a1a2e] rounded-2xl p-6 border border-white/5 shadow-lg hover:border-white/10 transition-colors">
        <h3 className="font-bold text-white mb-1">Your Betting Patterns</h3>
        <p className="text-gray-500 text-sm">Log at least 5 bets to unlock AI insights.</p>
        <div className="mt-3 bg-[#0f0f1a] rounded-xl p-3 flex items-center gap-2">
          <span className="text-[#00d4aa] text-lg">✦</span>
          <span className="text-gray-500 text-xs">{5 - bets.length} more bet{5 - bets.length !== 1 ? 's' : ''} needed</span>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#1a1a2e] rounded-2xl p-5 border border-white/5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-white">Your Betting Patterns</h3>
        {state !== 'loading' && (
          <button
            onClick={analyze}
            className="flex items-center gap-1.5 bg-[#00d4aa]/10 text-[#00d4aa] border border-[#00d4aa]/30 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-[#00d4aa]/20 transition-colors"
          >
            <span>✦</span> Analyze My Bets
          </button>
        )}
      </div>

      {state === 'idle' && (
        <p className="text-gray-500 text-sm">Click "Analyze My Bets" to get personalized insights powered by AI.</p>
      )}

      {state === 'loading' && (
        <div className="flex flex-col items-center gap-3 py-6">
          <div className="w-8 h-8 border-2 border-[#00d4aa] border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 text-sm">Analyzing your betting patterns...</p>
        </div>
      )}

      {state === 'error' && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
          <p className="text-red-400 text-sm">{errorMsg}</p>
        </div>
      )}

      {state === 'done' && (
        <div className="space-y-3">
          {insights.map((ins, i) => {
            const s = SEVERITY_STYLES[ins.severity] ?? SEVERITY_STYLES.warning
            return (
              <div key={i} className={`border-l-4 ${s.border} ${s.bg} rounded-r-xl p-4`}>
                <div className="flex items-start gap-3">
                  <span className={`text-lg font-bold ${s.icon} shrink-0 leading-none mt-0.5`}>{s.label}</span>
                  <div>
                    <p className="text-white text-sm font-bold">{ins.title}</p>
                    <p className={`text-xl font-bold ${s.icon} my-0.5`}>{ins.stat}</p>
                    <p className="text-gray-400 text-xs leading-relaxed">{ins.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ── Coaching Dashboard ────────────────────────────────────────────────────────
function CoachingDashboard({ profile, bets, onEditGoals }) {
  const todayStr = new Date().toISOString().split('T')[0]
  const todayBets = bets.filter(b => b.date === todayStr)
  const todayPL = todayBets.reduce((s, b) => s + (b.actualPL ?? 0), 0)

  const totalPL = bets.reduce((s, b) => s + (b.actualPL ?? 0), 0)
  const currentBankroll = profile.bankroll + totalPL

  const riskLevel = RISK_LEVELS.find(r => r.key === profile.risk) ?? RISK_LEVELS[1]
  const recommendedUnit = (currentBankroll * riskLevel.pct) / 100

  const winGoalPct   = profile.dailyWin  > 0 ? Math.min(100, (todayPL / profile.dailyWin) * 100)  : 0
  const lossLimitPct = profile.dailyLoss > 0 ? Math.min(100, (-todayPL / profile.dailyLoss) * 100) : 0
  const hitWinGoal   = todayPL >= profile.dailyWin
  const hitLossLimit = -todayPL >= profile.dailyLoss
  const nearLossLimit = lossLimitPct >= 70 && !hitLossLimit

  let coachMsg
  if (todayBets.length === 0)   coachMsg = { text: 'No bets today. Stay patient and wait for the right opportunity.', color: 'text-gray-400' }
  else if (hitLossLimit)        coachMsg = { text: "You've hit your daily loss limit. Stop betting — protect your bankroll.", color: 'text-red-400' }
  else if (nearLossLimit)       coachMsg = { text: "You're approaching your daily loss limit. Consider stopping for the day.", color: 'text-yellow-400' }
  else if (hitWinGoal)          coachMsg = { text: "🎯 You've hit your daily goal! Lock in the win.", color: 'text-[#00d4aa]' }
  else                          coachMsg = { text: 'Good discipline today. Stick to your unit size.', color: 'text-[#00d4aa]' }

  // Coached vs uncoached win rate
  const coached   = bets.filter(b => b.followingCoaching && (b.result === 'Win' || b.result === 'Loss'))
  const uncoached = bets.filter(b => !b.followingCoaching && (b.result === 'Win' || b.result === 'Loss'))
  const coachedWR   = coached.length   > 0 ? (coached.filter(b => b.result === 'Win').length   / coached.length)   * 100 : null
  const uncoachedWR = uncoached.length > 0 ? (uncoached.filter(b => b.result === 'Win').length / uncoached.length) * 100 : null
  const wRdiff = coachedWR !== null && uncoachedWR !== null ? coachedWR - uncoachedWR : null

  // Overall units
  const unitsChange = totalPL / (profile.bankroll * riskLevel.pct / 100)

  return (
    <div className="space-y-4">

      {/* Today's Status */}
      <div className="bg-[#1a1a2e] rounded-2xl p-6 border border-white/5 shadow-lg hover:border-white/10 transition-colors">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">Today's Status</h3>

        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-gray-500 text-xs mb-1">Today's P&L</p>
            <p className={`text-3xl font-bold ${todayPL > 0 ? 'text-green-400' : todayPL < 0 ? 'text-red-400' : 'text-white'}`}>
              {formatPL(todayPL)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-gray-500 text-xs mb-1">Bets today</p>
            <p className="text-white text-xl font-bold">{todayBets.length}</p>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-gray-500">Win goal progress</span>
              <span className="text-[#00d4aa]">{formatPL(todayPL)} / {formatPL(profile.dailyWin)}</span>
            </div>
            <ProgressBar pct={winGoalPct} color="bg-[#00d4aa]" />
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-gray-500">Loss limit exposure</span>
              <span className={hitLossLimit ? 'text-red-400' : nearLossLimit ? 'text-yellow-400' : 'text-gray-400'}>
                {formatPL(todayPL < 0 ? todayPL : 0)} / -{formatPL(profile.dailyLoss)}
              </span>
            </div>
            <ProgressBar pct={lossLimitPct} color={hitLossLimit ? 'bg-red-500' : nearLossLimit ? 'bg-yellow-500' : 'bg-red-500/60'} />
          </div>
        </div>

        <div className={`bg-[#0f0f1a] rounded-xl p-3 border border-white/5`}>
          <p className={`text-sm font-medium ${coachMsg.color}`}>{coachMsg.text}</p>
        </div>
      </div>

      {/* Coached vs Uncoached */}
      <div className="bg-[#1a1a2e] rounded-2xl p-6 border border-white/5 shadow-lg hover:border-white/10 transition-colors">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">Coaching Impact</h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center">
            <p className="text-gray-500 text-xs mb-1">Coached</p>
            <p className="text-[#00d4aa] text-xl font-bold">
              {coachedWR !== null ? `${coachedWR.toFixed(0)}%` : '—'}
            </p>
            <p className="text-gray-600 text-xs mt-0.5">{coached.length} bets</p>
          </div>
          <div className="text-center flex flex-col items-center justify-center">
            {wRdiff !== null ? (
              <>
                <p className={`text-lg font-bold ${wRdiff >= 0 ? 'text-[#00d4aa]' : 'text-red-400'}`}>
                  {wRdiff >= 0 ? '+' : ''}{wRdiff.toFixed(1)}%
                </p>
                <p className="text-gray-600 text-[10px]">difference</p>
              </>
            ) : (
              <p className="text-gray-600 text-xs">Need both</p>
            )}
          </div>
          <div className="text-center">
            <p className="text-gray-500 text-xs mb-1">Uncoached</p>
            <p className="text-gray-300 text-xl font-bold">
              {uncoachedWR !== null ? `${uncoachedWR.toFixed(0)}%` : '—'}
            </p>
            <p className="text-gray-600 text-xs mt-0.5">{uncoached.length} bets</p>
          </div>
        </div>
        {(coached.length === 0 || uncoached.length === 0) && (
          <p className="text-gray-600 text-xs text-center mt-3">Log bets with the coaching toggle on and off to see the comparison.</p>
        )}
      </div>

      {/* AI Insights */}
      <AIInsights bets={bets} />

      {/* Unit Size */}
      <div className="bg-[#1a1a2e] rounded-2xl p-6 border border-white/5 shadow-lg hover:border-white/10 transition-colors">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">Recommended Unit Size</h3>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-3xl font-bold text-[#00d4aa]">${recommendedUnit.toFixed(2)}</p>
            <p className="text-gray-500 text-xs mt-1">{riskLevel.label} · {riskLevel.range}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-500 text-xs mb-1">Units overall</p>
            <p className={`text-xl font-bold ${unitsChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {unitsChange >= 0 ? '+' : ''}{unitsChange.toFixed(2)}u
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 border-t border-white/5 pt-4">
          <div>
            <p className="text-gray-500 text-xs mb-1">Starting bankroll</p>
            <p className="text-white font-semibold">${profile.bankroll.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs mb-1">Current bankroll</p>
            <div className="flex items-baseline gap-1.5">
              <p className="text-white font-semibold">${currentBankroll.toFixed(2)}</p>
              <p className={`text-xs font-medium ${totalPL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {formatPL(totalPL)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* My Goals */}
      <div className="bg-[#1a1a2e] rounded-2xl p-6 border border-white/5 shadow-lg hover:border-white/10 transition-colors">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">My Goals</h3>
          <button onClick={onEditGoals} className="text-[#00d4aa] text-xs font-semibold hover:underline">Edit Goals</button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Starting Bankroll', value: `$${profile.bankroll.toFixed(2)}` },
            { label: 'Risk Level', value: riskLevel.label },
            { label: 'Daily Loss Limit', value: `$${profile.dailyLoss.toFixed(2)}` },
            { label: 'Daily Win Goal', value: `$${profile.dailyWin.toFixed(2)}` },
          ].map(({ label, value }) => (
            <div key={label} className="bg-[#0f0f1a] rounded-xl p-3">
              <p className="text-gray-500 text-xs mb-1">{label}</p>
              <p className="text-white text-sm font-semibold">{value}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

// ── Page root ─────────────────────────────────────────────────────────────────
function BankrollCoach() {
  const { bets } = useBets()
  const [profile, setProfile] = useState(loadProfile)
  const [editing, setEditing] = useState(false)

  const handleSave = (p) => {
    saveProfile(p)
    setProfile(p)
    setEditing(false)
  }

  const showSetup = !profile || editing

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white p-4 md:p-8 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Bankroll Coach</h1>
        {profile && !editing && (
          <span className="text-xs text-[#00d4aa] bg-[#00d4aa]/10 border border-[#00d4aa]/20 px-3 py-1 rounded-full font-medium">
            Active
          </span>
        )}
      </div>

      {showSetup
        ? <SetupForm initial={profile} onSave={handleSave} />
        : <CoachingDashboard profile={profile} bets={bets} onEditGoals={() => setEditing(true)} />
      }
    </div>
  )
}

export default BankrollCoach
