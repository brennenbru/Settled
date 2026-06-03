function BetLog() {
  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white p-6">
      <h1 className="text-2xl font-bold mb-6">Bet Log</h1>

      <button className="bg-[#00d4aa] text-[#0f0f1a] font-bold px-6 py-3 rounded-xl mb-6 w-full md:w-auto">
        + Log a Bet
      </button>

      <div className="bg-[#1a1a2e] rounded-xl p-6">
        <p className="text-gray-500 text-center">No bets logged yet. Hit the button above to add your first bet!</p>
      </div>
    </div>
  )
}

export default BetLog