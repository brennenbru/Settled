import { useState } from 'react'
import { Link } from 'react-router-dom'

const BETTORS = [
  { id: 1,  initials: 'JK', username: 'jackknife',    profit: 4812.50, winPct: 68.2, roi: 31.4, bets: 94,  streak: 'W5' },
  { id: 2,  initials: 'TP', username: 'tparlay',      profit: 3240.00, winPct: 61.5, roi: 24.8, bets: 78,  streak: 'W2' },
  { id: 3,  initials: 'SB', username: 'sharpbets_',   profit: 2975.75, winPct: 59.1, roi: 19.6, bets: 112, streak: 'L1' },
  { id: 4,  initials: 'MV', username: 'moneyline_mv', profit: 1890.20, winPct: 57.3, roi: 16.2, bets: 66,  streak: 'W3' },
  { id: 5,  initials: 'RD', username: 'rdog99',       profit: 1420.00, winPct: 54.8, roi: 13.9, bets: 83,  streak: 'W1' },
  { id: 6,  initials: 'AL', username: 'ace_locks',    profit:  980.50, winPct: 53.0, roi: 11.4, bets: 57,  streak: 'L2' },
  { id: 7,  initials: 'GH', username: 'gridiron_gh',  profit:  745.00, winPct: 51.6, roi:  9.1, bets: 49,  streak: 'W2' },
  { id: 8,  initials: 'KW', username: 'kwager',       profit:  510.75, winPct: 50.4, roi:  6.8, bets: 71,  streak: 'L1' },
  { id: 9,  initials: 'NB', username: 'nbets22',      profit:  280.00, winPct: 48.9, roi:  4.2, bets: 45,  streak: 'L3' },
  { id: 10, initials: 'ZP', username: 'zpicks',       profit:   95.25, winPct: 47.1, roi:  1.6, bets: 38,  streak: 'W1' },
]

const FILTERS = [
  { key: 'profit',  label: 'Total Profit' },
  { key: 'winPct',  label: 'Win %' },
  { key: 'roi',     label: 'ROI %' },
]

const PODIUM = {
  1: { label: '1st', ring: 'ring-yellow-400/60',  bg: 'bg-yellow-400/10', text: 'text-yellow-400',  medal: '🥇' },
  2: { label: '2nd', ring: 'ring-gray-300/60',    bg: 'bg-gray-300/10',   text: 'text-gray-300',    medal: '🥈' },
  3: { label: '3rd', ring: 'ring-amber-600/60',   bg: 'bg-amber-600/10',  text: 'text-amber-500',   medal: '🥉' },
}

const AVATAR_COLORS = [
  'bg-violet-500', 'bg-blue-500', 'bg-teal-500', 'bg-rose-500',
  'bg-orange-500', 'bg-green-500', 'bg-pink-500', 'bg-indigo-500',
  'bg-cyan-500',   'bg-red-500',
]

function sorted(list, key) {
  return [...list].sort((a, b) => b[key] - a[key])
}

function StreakBadge({ streak }) {
  const isWin = streak.startsWith('W')
  return (
    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isWin ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
      {streak}
    </span>
  )
}

function Avatar({ initials, index, size = 'md' }) {
  const sz = size === 'lg' ? 'w-14 h-14 text-lg' : 'w-9 h-9 text-sm'
  return (
    <div className={`${sz} rounded-full ${AVATAR_COLORS[index % AVATAR_COLORS.length]} flex items-center justify-center font-bold text-white shrink-0`}>
      {initials}
    </div>
  )
}

function PodiumCard({ bettor, rank, index, sortKey }) {
  const style = PODIUM[rank]
  const statValue =
    sortKey === 'profit' ? `+$${bettor.profit.toLocaleString('en-US', { minimumFractionDigits: 2 })}` :
    sortKey === 'winPct' ? `${bettor.winPct}%` :
    `${bettor.roi}%`

  return (
    <div className={`relative bg-[#1a1a2e] rounded-2xl p-5 border ${style.bg} ring-1 ${style.ring} flex flex-col items-center text-center gap-3`}>
      <span className="text-2xl">{style.medal}</span>
      <Avatar initials={bettor.initials} index={index} size="lg" />
      <div>
        <p className="font-bold text-white text-base leading-tight">{bettor.username}</p>
        <p className="text-gray-500 text-xs mt-0.5">{bettor.bets} bets</p>
      </div>
      <p className={`text-xl font-bold ${style.text}`}>{statValue}</p>
      <div className="flex items-center gap-2 flex-wrap justify-center">
        <span className="text-gray-500 text-xs">{bettor.winPct}% win</span>
        <span className="text-gray-700 text-xs">·</span>
        <span className="text-gray-500 text-xs">{bettor.roi}% ROI</span>
      </div>
      <StreakBadge streak={bettor.streak} />
    </div>
  )
}

function ListRow({ bettor, rank, index, sortKey }) {
  const statValue =
    sortKey === 'profit' ? `+$${bettor.profit.toLocaleString('en-US', { minimumFractionDigits: 2 })}` :
    sortKey === 'winPct' ? `${bettor.winPct}%` :
    `${bettor.roi}%`

  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5 last:border-0">
      <span className="text-gray-600 text-sm font-medium w-5 shrink-0 text-right">{rank}</span>
      <Avatar initials={bettor.initials} index={index} />
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-semibold truncate">{bettor.username}</p>
        <p className="text-gray-600 text-xs">{bettor.bets} bets · {bettor.winPct}% win · {bettor.roi}% ROI</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-[#00d4aa] text-sm font-bold hidden sm:block">{statValue}</span>
        <StreakBadge streak={bettor.streak} />
      </div>
    </div>
  )
}

function Leaderboard() {
  const [filter, setFilter] = useState('profit')
  const ranked = sorted(BETTORS, filter)
  const podium = ranked.slice(0, 3)
  const rest = ranked.slice(3)

  const now = new Date()
  const monthLabel = now.toLocaleString('default', { month: 'long', year: 'numeric' })

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white p-4 md:p-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">{monthLabel} Leaderboard</h1>
        <p className="text-gray-500 text-xs mt-1">Rankings reset at the start of each month</p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 bg-[#1a1a2e] p-1 rounded-xl mb-6 border border-white/5">
        {FILTERS.map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === f.key
                ? 'bg-[#00d4aa] text-[#0f0f1a]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Podium — silver left, gold center, bronze right on md+ */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        {/* On sm+: reorder so gold is center. Use order utilities. */}
        <div className="order-2 sm:order-1">
          <PodiumCard bettor={podium[1]} rank={2} index={BETTORS.indexOf(podium[1])} sortKey={filter} />
        </div>
        <div className="order-1 sm:order-2">
          <PodiumCard bettor={podium[0]} rank={1} index={BETTORS.indexOf(podium[0])} sortKey={filter} />
        </div>
        <div className="order-3">
          <PodiumCard bettor={podium[2]} rank={3} index={BETTORS.indexOf(podium[2])} sortKey={filter} />
        </div>
      </div>

      {/* Ranked list 4–10 */}
      <div className="bg-[#1a1a2e] rounded-xl border border-white/5 mb-4">
        {rest.map((bettor, i) => (
          <ListRow
            key={bettor.id}
            bettor={bettor}
            rank={i + 4}
            index={BETTORS.indexOf(bettor)}
            sortKey={filter}
          />
        ))}
      </div>

      {/* CTA banner */}
      <div className="bg-[#1a1a2e] rounded-xl border border-[#00d4aa]/20 p-5 text-center">
        <p className="text-white font-semibold mb-1">Think you can top the leaderboard?</p>
        <p className="text-gray-500 text-sm mb-4">Start logging your bets and climb the ranks.</p>
        <Link
          to="/betlog"
          className="inline-block bg-[#00d4aa] text-[#0f0f1a] font-bold px-6 py-2.5 rounded-xl text-sm hover:bg-[#00bfa0] transition-colors"
        >
          Start Logging Bets
        </Link>
      </div>
    </div>
  )
}

export default Leaderboard
