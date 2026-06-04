import { useState } from 'react'
import { useBets } from '../context/BetsContext'

const SPORTS = ['NFL', 'NBA', 'MLB', 'NHL', 'NCAA Football', 'NCAA Basketball', 'Soccer', 'Tennis', 'Golf', 'MMA', 'Other']
const SPORTSBOOKS = ['DraftKings', 'FanDuel', 'BetMGM', 'Caesars', 'Fanatics', 'PointsBet', 'Other']
const BET_TYPES = ['Moneyline', 'Spread', 'Over/Under', 'Parlay', 'Prop', 'Future']
const RESULTS = ['Pending', 'Win', 'Loss', 'Push']

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

const today = () => new Date().toISOString().split('T')[0]

const defaultForm = {
  date: today(),
  sport: 'NFL',
  sportsbook: 'DraftKings',
  betType: 'Moneyline',
  description: '',
  wager: '',
  odds: '',
  result: 'Pending',
  followingCoaching: false,
}

const RESULT_STYLES = {
  Win: 'bg-green-500/20 text-green-400 border border-green-500/30',
  Loss: 'bg-red-500/20 text-red-400 border border-red-500/30',
  Push: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
  Pending: 'bg-gray-500/20 text-gray-400 border border-gray-500/30',
}

function Modal({ onClose, onSave }) {
  const [form, setForm] = useState(defaultForm)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const potentialPayout = parseFloat(form.wager) + calcProfit(form.wager, form.odds)
  const profit = calcProfit(form.wager, form.odds)
  const validPayout = !isNaN(potentialPayout) && form.wager && form.odds

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.wager || !form.odds || !form.description) return
    onSave({
      ...form,
      id: Date.now(),
      wager: parseFloat(form.wager),
      odds: parseInt(form.odds),
      profit: calcProfit(form.wager, form.odds),
      actualPL: calcActualPL(form.wager, form.odds, form.result),
    })
    onClose()
  }

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-[#1a1a2e] rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-white/10 shadow-2xl">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">Log a Bet</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Date</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={e => set('date', e.target.value)}
                  className="w-full bg-[#0f0f1a] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00d4aa]"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Sport</label>
                <select
                  value={form.sport}
                  onChange={e => set('sport', e.target.value)}
                  className="w-full bg-[#0f0f1a] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00d4aa]"
                >
                  {SPORTS.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Sportsbook</label>
                <select
                  value={form.sportsbook}
                  onChange={e => set('sportsbook', e.target.value)}
                  className="w-full bg-[#0f0f1a] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00d4aa]"
                >
                  {SPORTSBOOKS.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Bet Type</label>
                <select
                  value={form.betType}
                  onChange={e => set('betType', e.target.value)}
                  className="w-full bg-[#0f0f1a] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00d4aa]"
                >
                  {BET_TYPES.map(b => <option key={b}>{b}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Description</label>
              <input
                type="text"
                placeholder="e.g. Chiefs -3.5 vs Raiders"
                value={form.description}
                onChange={e => set('description', e.target.value)}
                required
                className="w-full bg-[#0f0f1a] border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#00d4aa]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Wager ($)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="50.00"
                  value={form.wager}
                  onChange={e => set('wager', e.target.value)}
                  required
                  className="w-full bg-[#0f0f1a] border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#00d4aa]"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Odds (American)</label>
                <input
                  type="number"
                  placeholder="-110"
                  value={form.odds}
                  onChange={e => set('odds', e.target.value)}
                  required
                  className="w-full bg-[#0f0f1a] border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#00d4aa]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Result</label>
              <div className="grid grid-cols-4 gap-2">
                {RESULTS.map(r => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => set('result', r)}
                    className={`py-2 rounded-lg text-sm font-medium transition-all ${
                      form.result === r
                        ? r === 'Win' ? 'bg-green-500 text-white'
                          : r === 'Loss' ? 'bg-red-500 text-white'
                          : r === 'Push' ? 'bg-yellow-500 text-[#0f0f1a]'
                          : 'bg-gray-500 text-white'
                        : 'bg-[#0f0f1a] border border-white/10 text-gray-400 hover:border-white/30'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between bg-[#0f0f1a] border border-white/10 rounded-lg px-3 py-2.5">
              <div>
                <p className="text-sm text-white font-medium">Following coaching today?</p>
                <p className="text-xs text-gray-600 mt-0.5">Tracks your coached vs uncoached win rate</p>
              </div>
              <button
                type="button"
                onClick={() => set('followingCoaching', !form.followingCoaching)}
                className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${form.followingCoaching ? 'bg-[#00d4aa]' : 'bg-white/10'}`}
              >
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${form.followingCoaching ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>

            {validPayout && (
              <div className="bg-[#0f0f1a] rounded-lg p-3 border border-white/10 space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Potential profit</span>
                  <span className="text-[#00d4aa] font-medium">+${profit.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Potential payout</span>
                  <span className="text-white font-medium">${potentialPayout.toFixed(2)}</span>
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 rounded-xl bg-[#00d4aa] text-[#0f0f1a] font-bold text-sm hover:bg-[#00bfa0] hover:scale-[1.02] transition-all"
              >
                Save Bet
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

function BetCard({ bet, onDelete }) {
  const pl = bet.actualPL
  const hasPL = pl !== null

  return (
    <div className="bg-[#1a1a2e] rounded-2xl p-5 border border-white/5 shadow-lg hover:border-white/10 hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex-1 min-w-0">
          <p className="text-white font-bold text-sm leading-tight truncate tracking-tight">{bet.description}</p>
          <p className="text-gray-500 text-xs mt-1 font-medium">{bet.sport} · {bet.sportsbook} · {bet.betType}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${RESULT_STYLES[bet.result]}`}>
            {bet.result}
          </span>
          <button
            onClick={() => onDelete(bet.id)}
            className="text-gray-600 hover:text-red-400 transition-colors text-lg leading-none"
            aria-label="Delete bet"
          >
            ×
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 text-center">
        <div>
          <p className="text-gray-500 text-xs">Wager</p>
          <p className="text-white text-sm font-medium">${bet.wager.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs">Odds</p>
          <p className="text-white text-sm font-medium">{bet.odds > 0 ? '+' : ''}{bet.odds}</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs">To Win</p>
          <p className="text-[#00d4aa] text-sm font-medium">+${bet.profit.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs">P&L</p>
          <p className={`text-sm font-medium ${
            !hasPL ? 'text-gray-500' :
            pl > 0 ? 'text-green-400' :
            pl < 0 ? 'text-red-400' :
            'text-yellow-400'
          }`}>
            {!hasPL ? '—' : pl >= 0 ? `+$${pl.toFixed(2)}` : `-$${Math.abs(pl).toFixed(2)}`}
          </p>
        </div>
      </div>

      <p className="text-gray-600 text-xs mt-3 text-right">{bet.date}</p>
    </div>
  )
}

function SummaryBar({ bets }) {
  const totalWagered = bets.reduce((s, b) => s + b.wager, 0)
  const totalPL = bets.reduce((s, b) => s + (b.actualPL ?? 0), 0)
  const wins = bets.filter(b => b.result === 'Win').length
  const losses = bets.filter(b => b.result === 'Loss').length
  const pushes = bets.filter(b => b.result === 'Push').length

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
      {[
        { label: 'Total Bets', value: bets.length },
        { label: 'Total Wagered', value: `$${totalWagered.toFixed(2)}` },
        {
          label: 'Total P&L',
          value: totalPL >= 0 ? `+$${totalPL.toFixed(2)}` : `-$${Math.abs(totalPL).toFixed(2)}`,
          color: totalPL > 0 ? 'text-green-400' : totalPL < 0 ? 'text-red-400' : 'text-yellow-400',
        },
        { label: 'Record', value: `${wins}-${losses}-${pushes}` },
      ].map(({ label, value, color }) => (
        <div key={label} className="bg-[#1a1a2e] rounded-2xl p-5 border border-white/5 shadow-lg hover:border-white/10 hover:-translate-y-0.5 transition-all duration-200">
          <p className="text-gray-500 text-[10px] mb-1.5 uppercase tracking-widest font-semibold">{label}</p>
          <p className={`text-xl font-black tracking-tight ${color ?? 'text-white'}`}>{value}</p>
        </div>
      ))}
    </div>
  )
}

function BetLog() {
  const { bets, addBet, deleteBet } = useBets()
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white p-4 md:p-8 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-black tracking-tight">Bet Log</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#00d4aa] text-[#0f0f1a] font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-[#00bfa0] hover:scale-105 transition-all shadow-lg shadow-[#00d4aa]/20"
        >
          + Log a Bet
        </button>
      </div>

      <SummaryBar bets={bets} />

      {bets.length === 0 ? (
        <div className="bg-[#1a1a2e] rounded-2xl p-14 text-center border border-white/5 shadow-lg">
          <p className="text-gray-500">No bets logged yet.</p>
          <p className="text-gray-600 text-sm mt-1">Hit "Log a Bet" to add your first.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {bets.map(bet => (
            <BetCard key={bet.id} bet={bet} onDelete={deleteBet} />
          ))}
        </div>
      )}

      {showModal && <Modal onClose={() => setShowModal(false)} onSave={addBet} />}
    </div>
  )
}

export default BetLog
