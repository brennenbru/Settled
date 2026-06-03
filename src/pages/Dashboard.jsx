function Dashboard() {
  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#1a1a2e] rounded-xl p-6">
          <p className="text-gray-400 text-sm">Total Profit</p>
          <h2 className="text-[#00d4aa] text-2xl font-bold mt-2">$0.00</h2>
        </div>
        <div className="bg-[#1a1a2e] rounded-xl p-6">
          <p className="text-gray-400 text-sm">Win Rate</p>
          <h2 className="text-[#00d4aa] text-2xl font-bold mt-2">0%</h2>
        </div>
        <div className="bg-[#1a1a2e] rounded-xl p-6">
          <p className="text-gray-400 text-sm">Total Bets</p>
          <h2 className="text-[#00d4aa] text-2xl font-bold mt-2">0</h2>
        </div>
        <div className="bg-[#1a1a2e] rounded-xl p-6">
          <p className="text-gray-400 text-sm">Units Won</p>
          <h2 className="text-[#00d4aa] text-2xl font-bold mt-2">0</h2>
        </div>
      </div>

      <p className="text-gray-500 text-center">No bets logged yet. Head to Bet Log to get started!</p>
    </div>
  )
}

export default Dashboard