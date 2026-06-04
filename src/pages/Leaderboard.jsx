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
  { key: 'profit', label: 'Total Profit' },
  { key: 'winPct', label: 'Win %' },
  { key: 'roi',    label: 'ROI %' },
]

const PODIUM_STYLES = {
  1: {
    ring: 'ring-2 ring-yellow-400/50',
    glow: 'shadow-[0_0_40px_rgba(250,204,21,0.15)]',
    bg: 'bg-gradient-to-b from-yellow-400/10 to-transparent',
    text: 'text-yellow-400',
    label: 'text-yellow-500/60',
    avatarRing: 'ring-2 ring-yellow-400/60',
    crownColor: '#FBBF24',
  },
  2: {
    ring: 'ring-2 ring-slate-300/40',
    glow: 'shadow-[0_0_30px_rgba(203,213,225,0.08)]',
    bg: 'bg-gradient-to-b from-slate-300/8 to-transparent',
    text: 'text-slate-300',
    label: 'text-slate-400/50',
    avatarRing: 'ring-2 ring-slate-300/50',
    crownColor: '#CBD5E1',
  },
  3: {
    ring: 'ring-2 ring-amber-600/40',
    glow: 'shadow-[0_0_30px_rgba(180,83,9,0.10)]',
    bg: 'bg-gradient-to-b from-amber-700/10 to-transparent',
    text: 'text-amber-500',
    label: 'text-amber-600/50',
    avatarRing: 'ring-2 ring-amber-600/60',
    crownColor: '#D97706',
  },
}

const AVATAR_GRADIENTS = [
  'from-violet-500 to-purple-700',
  'from-blue-500 to-indigo-700',
  'from-teal-400 to-emerald-600',
  'from-rose-500 to-pink-700',
  'from-orange-400 to-red-600',
  'from-green-400 to-teal-600',
  'from-pink-400 to-rose-600',
  'from-indigo-400 to-blue-700',
  'from-cyan-400 to-sky-600',
  'from-red-400 to-orange-600',
]

function sorted(list, key) {
  return [...list].sort((a, b) => b[key] - a[key])
}

// SVG Crown for #1
function Crown({ color }) {
  return (
    <svg viewBox="0 0 40 24" className="w-8 h-5" fill="none">
      <path d="M2 22 L8 6 L16 14 L20 2 L24 14 L32 6 L38 22 Z" fill={color} opacity="0.9" />
      <circle cx="2" cy="22" r="2.5" fill={color} />
      <circle cx="20" cy="2" r="2.5" fill={color} />
      <circle cx="38" cy="22" r="2.5" fill={color} />
    </svg>
  )
}

// Rank medal SVG for 2nd / 3rd
function MedalIcon({ rank, color }) {
  return (
    <svg viewBox="0 0 32 36" className="w-7 h-8" fill="none">
      <circle cx="16" cy="20" r="12" stroke={color} strokeWidth="2.5" fill={color + '18'} />
      <text x="16" y="25" textAnchor="middle" fontSize="11" fontWeight="700" fill={color} fontFamily="system-ui">
        {rank}
      </text>
      <path d="M10 10 L8 2 L16 6 L24 2 L22 10" stroke={color} strokeWidth="2" strokeLinejoin="round" fill={color + '22'} />
    </svg>
  )
}

function StreakBadge({ streak }) {
  const isWin = streak.startsWith('W')
  const count = parseInt(streak.slice(1))
  return (
    <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border ${
      isWin
        ? 'bg-green-500/10 text-green-400 border-green-500/25'
        : 'bg-red-500/10 text-red-400 border-red-500/25'
    }`}>
      <span className="text-[10px]">{isWin ? '▲' : '▼'}</span>
      {streak}
    </div>
  )
}

function Avatar({ initials, index, size = 'md', ring = '' }) {
  const sz = size === 'lg' ? 'w-16 h-16 text-xl' : size === 'xl' ? 'w-20 h-20 text-2xl' : 'w-10 h-10 text-sm'
  return (
    <div className={`${sz} ${ring} rounded-full bg-gradient-to-br ${AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length]} flex items-center justify-center font-bold text-white shrink-0 shadow-lg`}>
      {initials}
    </div>
  )
}

function PodiumCard({ bettor, rank, index, sortKey }) {
  const style = PODIUM_STYLES[rank]
  const statValue =
    sortKey === 'profit' ? `+$${bettor.profit.toLocaleString('en-US', { minimumFractionDigits: 2 })}` :
    sortKey === 'winPct' ? `${bettor.winPct}%` :
    `${bettor.roi}%`

  const isFirst = rank === 1

  return (
    <div className={`
      relative rounded-2xl border border-white/5 overflow-hidden
      flex flex-col items-center text-center p-6 gap-3
      ${style.ring} ${style.glow} ${isFirst ? 'sm:pt-8' : 'sm:pt-6'}
      transition-transform hover:-translate-y-1 duration-300
    `}>
      {/* Background gradient fill */}
      <div className={`absolute inset-0 ${style.bg} pointer-events-none`} />

      {/* Rank indicator */}
      <div className="relative flex flex-col items-center gap-1">
        {rank === 1
          ? <Crown color={style.crownColor} />
          : <MedalIcon rank={rank} color={style.crownColor} />
        }
      </div>

      {/* Avatar */}
      <Avatar
        initials={bettor.initials}
        index={index}
        size={isFirst ? 'xl' : 'lg'}
        ring={style.avatarRing}
      />

      {/* Name */}
      <div>
        <p className="font-bold text-white text-base leading-tight tracking-tight">@{bettor.username}</p>
        <p className={`text-xs mt-0.5 font-medium ${style.label}`}>{bettor.bets} bets placed</p>
      </div>

      {/* Primary stat */}
      <p className={`text-2xl font-black tracking-tight ${style.text}`}>{statValue}</p>

      {/* Secondary stats */}
      <div className="flex items-center gap-3 text-xs text-gray-500">
        <span>{bettor.winPct}% win rate</span>
        <span className="w-px h-3 bg-white/10" />
        <span>{bettor.roi}% ROI</span>
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
    <div className="flex items-center gap-4 px-5 py-3.5 border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors">
      <span className="text-gray-600 text-sm font-bold w-6 shrink-0 text-center tabular-nums">{rank}</span>
      <Avatar initials={bettor.initials} index={index} />
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-semibold truncate">@{bettor.username}</p>
        <p className="text-gray-600 text-xs mt-0.5">{bettor.bets} bets · {bettor.winPct}% win · {bettor.roi}% ROI</p>
      </div>
      <div className="flex items-center gap-2.5 shrink-0">
        <span className="text-[#00d4aa] text-sm font-bold tabular-nums hidden sm:block">{statValue}</span>
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
    <div className="min-h-screen bg-[#0f0f1a] text-white p-4 md:p-8 max-w-2xl mx-auto">

      {/* Header */}
      <div className="text-center mb-8">
        {/* Trophy SVG */}
        <div className="flex justify-center mb-3">
          <div className="relative">
            <div className="absolute inset-0 bg-yellow-400/20 blur-xl rounded-full scale-150" />
            <svg viewBox="0 0 48 48" className="w-12 h-12 relative" fill="none">
              <path d="M12 4h24v2H12z" fill="#FBBF24" opacity="0.4"/>
              <path d="M14 6h20c0 10-4 16-10 18C18 22 14 16 14 6z" fill="#FBBF24" opacity="0.9"/>
              <path d="M8 6h6v4c0 4 1.5 7 4 10H8a4 4 0 01-4-4v-2a4 4 0 014-4z" fill="#FBBF24" opacity="0.5"/>
              <path d="M40 6h-6v4c0 4-1.5 7-4 10h10a4 4 0 004-4v-2a4 4 0 00-4-4z" fill="#FBBF24" opacity="0.5"/>
              <path d="M20 24h8l2 6H18l2-6z" fill="#FBBF24" opacity="0.7"/>
              <rect x="16" y="30" width="16" height="3" rx="1.5" fill="#FBBF24" opacity="0.6"/>
            </svg>
          </div>
        </div>
        <h1 className="text-3xl font-black tracking-tight">{monthLabel}</h1>
        <p className="text-gray-500 text-xs mt-1.5 font-medium tracking-wide uppercase">Leaderboard · Resets monthly</p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1.5 bg-[#1a1a2e] p-1.5 rounded-2xl mb-8 border border-white/5 shadow-lg">
        {FILTERS.map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              filter === f.key
                ? 'bg-[#00d4aa] text-[#0f0f1a] shadow-lg shadow-[#00d4aa]/20'
                : 'text-gray-500 hover:text-white'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Podium — silver|gold|bronze layout on sm+ */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 sm:items-end">
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
      <div className="bg-[#1a1a2e] rounded-2xl border border-white/5 shadow-lg mb-4 overflow-hidden">
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
      <div className="relative overflow-hidden bg-[#1a1a2e] rounded-2xl border border-[#00d4aa]/20 p-7 text-center shadow-lg">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-24 bg-[#00d4aa]/8 blur-2xl rounded-full pointer-events-none" />
        <p className="text-white font-bold text-base mb-1 relative">Think you can top the leaderboard?</p>
        <p className="text-gray-500 text-sm mb-5 relative">Start logging your bets and climb the ranks.</p>
        <Link
          to="/betlog"
          className="relative inline-block bg-[#00d4aa] text-[#0f0f1a] font-bold px-7 py-3 rounded-xl text-sm hover:bg-[#00bfa0] hover:scale-105 transition-all shadow-lg shadow-[#00d4aa]/25"
        >
          Start Logging Bets
        </Link>
      </div>
    </div>
  )
}

export default Leaderboard
