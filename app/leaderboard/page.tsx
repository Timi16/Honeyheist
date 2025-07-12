import { Trophy, Medal, Award, Coins } from "lucide-react"

const mockLeaderboard = [
  { rank: 1, address: "0x1234...5678", rep: 15420, loot: "125,000 HONEY", heists: 47 },
  { rank: 2, address: "0x9876...5432", rep: 12890, loot: "98,500 HONEY", heists: 38 },
  { rank: 3, address: "0x5555...1111", rep: 11200, loot: "87,200 HONEY", heists: 34 },
  { rank: 4, address: "0x7777...9999", rep: 9850, loot: "76,800 HONEY", heists: 29 },
  { rank: 5, address: "0x3333...4444", rep: 8900, loot: "65,400 HONEY", heists: 25 },
]

export default function LeaderboardPage() {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-400" />
      case 2:
        return <Medal className="w-6 h-6 text-gray-300" />
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-gray-400 font-bold">{rank}</span>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-cyan-900/20 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 neon-glow">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
              Leaderboard
            </span>
          </h1>
          <p className="text-gray-400 text-lg">Top heist crews and their legendary scores</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="cyber-card text-center">
            <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-yellow-400">1,247</h3>
            <p className="text-gray-400">Total Heists</p>
          </div>

          <div className="cyber-card text-center">
            <Coins className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-green-400">2.4M HONEY</h3>
            <p className="text-gray-400">Total Loot</p>
          </div>

          <div className="cyber-card text-center">
            <Award className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-purple-400">89</h3>
            <p className="text-gray-400">Active Crews</p>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="cyber-card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-4 px-4 font-semibold text-gray-300 flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    Rank
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-300">Player</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-300 flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Rep
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-300 flex items-center gap-2">
                    <Coins className="w-5 h-5" />
                    Total Loot
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-300">Heists</th>
                </tr>
              </thead>
              <tbody>
                {mockLeaderboard.map((player) => (
                  <tr key={player.rank} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        {getRankIcon(player.rank)}
                        <span className="font-bold">#{player.rank}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold">{player.address.slice(2, 4).toUpperCase()}</span>
                        </div>
                        <span className="font-mono">{player.address}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-bold text-cyan-400">{player.rep.toLocaleString()}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-bold text-green-400">{player.loot}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-gray-300">{player.heists}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
