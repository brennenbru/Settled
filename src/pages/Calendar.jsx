import { useState, useMemo } from 'react'
import { useBets } from '../context/BetsContext'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

const RESULT_STYLES = {
  Win: 'bg-green-500/20 text-green-400 border border-green-500/30',
  Loss: 'bg-red-500/20 text-red-400 border border-red-500/30',
  Push: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
  Pending: 'bg-gray-500/20 text-gray-400 border border-gray-500/30',
}

function formatPL(pl) {
  if (pl === 0) return '$0.00'
  return pl > 0 ? `+$${pl.toFixed(2)}` : `-$${Math.abs(pl).toFixed(2)}`
}

function Calendar() {
  const { bets } = useBets()
  const now = new Date()
  const [viewYear, setViewYear] = useState(now.getFullYear())
  const [viewMonth, setViewMonth] = useState(now.getMonth())
  const [selectedDay, setSelectedDay] = useState(null)

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) }
    else setViewMonth(m => m - 1)
    setSelectedDay(null)
  }
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) }
    else setViewMonth(m => m + 1)
    setSelectedDay(null)
  }

  // Group bets by date string "YYYY-MM-DD"
  const betsByDate = useMemo(() => {
    const map = {}
    for (const bet of bets) {
      if (!map[bet.date]) map[bet.date] = []
      map[bet.date].push(bet)
    }
    return map
  }, [bets])

  // Calendar grid
  const firstDay = new Date(viewYear, viewMonth, 1).getDay()
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const todayStr = now.toISOString().split('T')[0]

  const cells = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  const remainder = cells.length % 7
  if (remainder !== 0) for (let i = 0; i < 7 - remainder; i++) cells.push(null)

  // Month-level stats
  const monthBets = useMemo(() => {
    return bets.filter(b => {
      const [y, m] = b.date.split('-').map(Number)
      return y === viewYear && m - 1 === viewMonth
    })
  }, [bets, viewYear, viewMonth])

  const monthPL = monthBets.reduce((s, b) => s + (b.actualPL ?? 0), 0)
  const monthWins = monthBets.filter(b => b.result === 'Win').length
  const monthLosses = monthBets.filter(b => b.result === 'Loss').length
  const monthPushes = monthBets.filter(b => b.result === 'Push').length
  const monthWinRate = (monthWins + monthLosses) > 0
    ? ((monthWins / (monthWins + monthLosses)) * 100).toFixed(0)
    : null

  // Day cell color
  function dayColor(dateStr) {
    const dayBets = betsByDate[dateStr]
    if (!dayBets) return null
    const pl = dayBets.reduce((s, b) => s + (b.actualPL ?? 0), 0)
    const hasSettled = dayBets.some(b => b.result !== 'Pending')
    if (!hasSettled) return 'pending'
    if (pl > 0) return 'win'
    if (pl < 0) return 'loss'
    return 'push'
  }

const selectedDateStr = selectedDay
    ? `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`
    : null
  const selectedBets = selectedDateStr ? (betsByDate[selectedDateStr] ?? []) : []

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white p-4 md:p-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#1a1a2e] border border-white/10 hover:border-white/30 text-gray-400 hover:text-white transition-colors text-lg"
        >
          ←
        </button>
        <h2 className="text-lg font-bold">{MONTHS[viewMonth]} {viewYear}</h2>
        <button
          onClick={nextMonth}
          className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#1a1a2e] border border-white/10 hover:border-white/30 text-gray-400 hover:text-white transition-colors text-lg"
        >
          →
        </button>
      </div>

      {/* Monthly summary */}
      <div className="grid grid-cols-4 gap-2 mb-5">
        <div className="bg-[#1a1a2e] rounded-xl p-3 border border-white/5 text-center">
          <p className="text-gray-500 text-xs mb-1">Monthly P&L</p>
          <p className={`text-sm font-bold ${monthPL > 0 ? 'text-green-400' : monthPL < 0 ? 'text-red-400' : 'text-white'}`}>
            {monthBets.length === 0 ? '—' : formatPL(monthPL)}
          </p>
        </div>
        <div className="bg-[#1a1a2e] rounded-xl p-3 border border-white/5 text-center">
          <p className="text-gray-500 text-xs mb-1">Record</p>
          <p className="text-sm font-bold text-white">
            {monthBets.length === 0 ? '—' : `${monthWins}-${monthLosses}-${monthPushes}`}
          </p>
        </div>
        <div className="bg-[#1a1a2e] rounded-xl p-3 border border-white/5 text-center">
          <p className="text-gray-500 text-xs mb-1">Win %</p>
          <p className={`text-sm font-bold ${monthWinRate !== null && parseFloat(monthWinRate) >= 50 ? 'text-green-400' : monthWinRate !== null ? 'text-red-400' : 'text-white'}`}>
            {monthWinRate !== null ? `${monthWinRate}%` : '—'}
          </p>
        </div>
        <div className="bg-[#1a1a2e] rounded-xl p-3 border border-white/5 text-center">
          <p className="text-gray-500 text-xs mb-1">Total Bets</p>
          <p className="text-sm font-bold text-white">{monthBets.length || '—'}</p>
        </div>
      </div>

      {/* Calendar grid */}
      {/* gap-px on a colored bg = perfect 1px borders on all 4 sides of every cell */}
      <div className="rounded-xl overflow-hidden mb-4 bg-white/[0.06]">
        {/* Day headers */}
        <div className="grid grid-cols-7 gap-px bg-white/[0.06]">
          {DAYS.map(d => (
            <div key={d} className="bg-[#1a1a2e] text-center text-gray-600 text-xs py-2.5 font-medium">{d}</div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7 gap-px bg-white/[0.06] pt-px">
          {cells.map((day, i) => {
            if (!day) return <div key={`blank-${i}`} className="bg-[#1a1a2e] h-14 md:h-16" />

            const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
            const color = dayColor(dateStr)
            const isToday = dateStr === todayStr
            const isSelected = day === selectedDay
            const dayBetsCount = betsByDate[dateStr]?.length ?? 0

            const dayPL = dayBetsCount > 0
              ? betsByDate[dateStr].reduce((s, b) => s + (b.actualPL ?? 0), 0)
              : null
            const hasSettled = dayBetsCount > 0 && betsByDate[dateStr].some(b => b.result !== 'Pending')

            const BG_BASE = {
              win: 'bg-green-500/20 hover:bg-green-500/30',
              loss: 'bg-red-500/20 hover:bg-red-500/30',
              push: 'bg-gray-500/20 hover:bg-gray-500/30',
              pending: 'bg-blue-500/10 hover:bg-blue-500/20',
            }

            return (
              <button
                key={day}
                onClick={() => setSelectedDay(isSelected ? null : day)}
                className={`
                  relative transition-all cursor-pointer p-1 h-14 md:h-16
                  ${color ? BG_BASE[color] : 'bg-[#1a1a2e] hover:bg-white/5'}
                  ${isSelected ? 'outline outline-2 outline-[#00d4aa] outline-offset-[-2px]' : ''}
                  ${isToday && !isSelected ? 'outline outline-2 outline-[#00d4aa]/50 outline-offset-[-2px]' : ''}
                `}
              >
                <span className={`absolute top-1 left-1.5 text-[10px] font-medium leading-none ${isToday ? 'text-[#00d4aa]' : 'text-gray-500'}`}>
                  {day}
                </span>
                {hasSettled && dayPL !== null && (
                  <span className={`
                    absolute inset-0 flex items-center justify-center
                    text-[10px] md:text-xs font-bold leading-none
                    ${dayPL > 0 ? 'text-green-400' : dayPL < 0 ? 'text-red-400' : 'text-yellow-400'}
                  `}>
                    {formatPL(dayPL)}
                  </span>
                )}
                {!hasSettled && dayBetsCount > 0 && (
                  <span className="absolute inset-0 flex items-center justify-center text-[10px] text-blue-400/70 font-medium">
                    pending
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 justify-center mb-4">
        {[
          { color: 'bg-green-500/40', label: 'Profit' },
          { color: 'bg-red-500/40', label: 'Loss' },
          { color: 'bg-gray-500/40', label: 'Even' },
          { color: 'bg-blue-500/25', label: 'Pending' },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <div className={`w-3 h-3 rounded-sm ${color}`} />
            <span className="text-gray-500 text-xs">{label}</span>
          </div>
        ))}
      </div>

      {/* Day detail panel */}
      {selectedDay !== null && (
        <div className="bg-[#1a1a2e] rounded-xl border border-white/10 overflow-hidden">
          <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">
              {MONTHS[viewMonth]} {selectedDay}, {viewYear}
            </h3>
            <button
              onClick={() => setSelectedDay(null)}
              className="text-gray-600 hover:text-white text-xl leading-none transition-colors"
            >
              ×
            </button>
          </div>

          {selectedBets.length === 0 ? (
            <p className="text-gray-600 text-sm text-center py-6">No bets on this day.</p>
          ) : (
            <div className="divide-y divide-white/5">
              {selectedBets.map(bet => {
                const pl = bet.actualPL
                return (
                  <div key={bet.id} className="px-4 py-3 flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">{bet.description}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{bet.sport} · {bet.sportsbook} · {bet.betType}</p>
                      <p className="text-gray-600 text-xs mt-0.5">
                        ${bet.wager.toFixed(2)} · {bet.odds > 0 ? '+' : ''}{bet.odds}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${RESULT_STYLES[bet.result]}`}>
                        {bet.result}
                      </span>
                      <span className={`text-sm font-semibold ${
                        pl === null || pl === undefined ? 'text-gray-500' :
                        pl > 0 ? 'text-green-400' :
                        pl < 0 ? 'text-red-400' :
                        'text-yellow-400'
                      }`}>
                        {pl === null || pl === undefined ? '—' : formatPL(pl)}
                      </span>
                    </div>
                  </div>
                )
              })}

              {selectedBets.length > 1 && (
                <div className="px-4 py-2.5 bg-black/20 flex justify-between items-center">
                  <span className="text-gray-500 text-xs">Day total</span>
                  <span className={`text-sm font-bold ${
                    selectedBets.reduce((s, b) => s + (b.actualPL ?? 0), 0) > 0 ? 'text-green-400' :
                    selectedBets.reduce((s, b) => s + (b.actualPL ?? 0), 0) < 0 ? 'text-red-400' :
                    'text-yellow-400'
                  }`}>
                    {formatPL(selectedBets.reduce((s, b) => s + (b.actualPL ?? 0), 0))}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Calendar
