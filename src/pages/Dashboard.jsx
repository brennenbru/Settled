import { useBets } from '../context/BetsContext'
import { Link } from 'react-router-dom'

const RESULT_STYLES = {
  Win: 'bg-green-500/20 text-green-400 border border-green-500/30',
  Loss: 'bg-red-500/20 text-red-400 border border-red-500/30',
  Push: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
  Pending: 'bg-gray-500/20 text-gray-400 border border-gray-500/30',
}

function calcUnits(bet) {
  if (bet.result !== 'Win' && bet.result !== 'Loss' && bet.result !== 'Push') return 0
  if (bet.result === 'Push') return 0
  const unitSize = bet.wager
  if (bet.result === 'Loss') return -1
  const profitRatio = bet.odds > 0 ? bet.odds / 100 : 100 / Math.abs(bet.odds)
  return profitRatio
}

function StatCard({ label, value, sub, valueClass }) {
  return (
    <div className="bg-[#1a1a2e] rounded-2xl p-5 border border-white/5 shadow-lg hover:border-white/10 hover:-translate-y-0.5 transition-all duration-200">
      <p className="text-gray-500 text-[10px] mb-2 uppercase tracking-widest font-semibold">{label}</p>
      <p className={`text-2xl font-black tracking-tight ${valueClass ?? 'text-white'}`}>{value}</p>
      {sub && <p className="text-gray-600 text-xs mt-1.5 font-medium">{sub}</p>}
    </div>
  )
}

function RecentBetRow({ bet }) {
  const pl = bet.actualPL
  return (
    <div className="flex items-center gap-3 py-3 border-b border-white/5 last:border-0">
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-medium truncate">{bet.description}</p>
        <p className="text-gray-500 text-xs">{bet.sport} · {bet.date}</p>
      </div>
      <span className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${RESULT_STYLES[bet.result]}`}>
        {bet.result}
      </span>
      <span className={`text-sm font-semibold shrink-0 w-20 text-right ${
        pl === null || pl === undefined ? 'text-gray-500' :
        pl > 0 ? 'text-green-400' :
        pl < 0 ? 'text-red-400' :
        'text-yellow-400'
      }`}>
        {pl === null || pl === undefined
          ? '—'
          : pl >= 0
            ? `+$${pl.toFixed(2)}`
            : `-$${Math.abs(pl).toFixed(2)}`}
      </span>
    </div>
  )
}

function Dashboard() {
  const { bets } = useBets()

  const settled = bets.filter(b => b.result !== 'Pending')
  const wins = bets.filter(b => b.result === 'Win')
  const losses = bets.filter(b => b.result === 'Loss')

  const totalPL = bets.reduce((s, b) => s + (b.actualPL ?? 0), 0)
  const winRate = settled.length > 0 ? ((wins.length / settled.length) * 100).toFixed(1) : null
  const totalUnits = bets.reduce((s, b) => s + calcUnits(b), 0)

  const biggestWin = wins.length > 0 ? Math.max(...wins.map(b => b.actualPL)) : null
  const biggestLoss = losses.length > 0 ? Math.min(...losses.map(b => b.actualPL)) : null
  const avgOdds = bets.length > 0 ? bets.reduce((s, b) => s + b.odds, 0) / bets.length : null
  const avgWager = bets.length > 0 ? bets.reduce((s, b) => s + b.wager, 0) / bets.length : null

  const recent = bets.slice(0, 5)

  const plColor = totalPL > 0 ? 'text-green-400' : totalPL < 0 ? 'text-red-400' : 'text-white'
  const plValue = bets.length === 0 ? '$0.00' : totalPL >= 0 ? `+$${totalPL.toFixed(2)}` : `-$${Math.abs(totalPL).toFixed(2)}`

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white p-4 md:p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-black mb-8 tracking-tight">Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <StatCard
          label="Total Profit"
          value={plValue}
          valueClass={plColor}
        />
        <StatCard
          label="Win Rate"
          value={winRate !== null ? `${winRate}%` : '—'}
          sub={settled.length > 0 ? `${wins.length}W · ${losses.length}L` : 'No settled bets'}
          valueClass={winRate !== null && parseFloat(winRate) >= 50 ? 'text-green-400' : winRate !== null ? 'text-red-400' : 'text-gray-500'}
        />
        <StatCard
          label="Total Bets"
          value={bets.length}
          sub={bets.length > 0 ? `${bets.filter(b => b.result === 'Pending').length} pending` : undefined}
        />
        <StatCard
          label="Units Won"
          value={bets.length === 0 ? '0.00' : totalUnits >= 0 ? `+${totalUnits.toFixed(2)}` : totalUnits.toFixed(2)}
          valueClass={totalUnits > 0 ? 'text-green-400' : totalUnits < 0 ? 'text-red-400' : 'text-white'}
        />
      </div>

      {bets.length === 0 ? (
        <div className="bg-[#1a1a2e] rounded-2xl p-14 text-center border border-white/5 shadow-lg">
          <p className="text-gray-400 font-semibold mb-1">No bets yet</p>
          <p className="text-gray-600 text-sm mb-5">Head to Bet Log to get started</p>
          <Link
            to="/betlog"
            className="inline-block bg-[#00d4aa] text-[#0f0f1a] font-bold px-6 py-3 rounded-xl text-sm hover:bg-[#00bfa0] hover:scale-105 transition-all"
          >
            Go to Bet Log
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-[#1a1a2e] rounded-2xl p-6 border border-white/5 shadow-lg hover:border-white/10 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">Recent Bets</h2>
              <Link to="/betlog" className="text-[#00d4aa] text-xs hover:underline">View all</Link>
            </div>
            {recent.map(bet => (
              <RecentBetRow key={bet.id} bet={bet} />
            ))}
          </div>

          <div className="bg-[#1a1a2e] rounded-2xl p-6 border border-white/5 shadow-lg hover:border-white/10 transition-colors">
            <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wide mb-5">Performance Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">Biggest Win</span>
                <span className="text-green-400 text-sm font-semibold">
                  {biggestWin !== null ? `+$${biggestWin.toFixed(2)}` : '—'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">Biggest Loss</span>
                <span className="text-red-400 text-sm font-semibold">
                  {biggestLoss !== null ? `-$${Math.abs(biggestLoss).toFixed(2)}` : '—'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">Avg Odds</span>
                <span className="text-white text-sm font-semibold">
                  {avgOdds !== null ? `${avgOdds >= 0 ? '+' : ''}${avgOdds.toFixed(0)}` : '—'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">Avg Wager</span>
                <span className="text-white text-sm font-semibold">
                  {avgWager !== null ? `$${avgWager.toFixed(2)}` : '—'}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-white/5">
                <span className="text-gray-500 text-sm">Total Wagered</span>
                <span className="text-white text-sm font-semibold">
                  ${bets.reduce((s, b) => s + b.wager, 0).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
