"use client"

import { useState, useEffect } from "react"
import { RoomCard } from "@/components/room-card"
import { CreateRoomModal } from "@/components/create-room-modal"
import { Plus, Search, Zap, UsersIcon, Target, Trophy } from "lucide-react"
import socketService from "@/services/socketService" // Adjust path

// Define the Room interface
interface Room {
  id: string | number;
  name: string;
  players: number;
  maxPlayers: number;
  difficulty: string;
  reward: string;
  type?: string;
  description?: string;
}

export default function LobbyPage() {
  // Type the rooms state as Room[]
  const [rooms, setRooms] = useState<Room[]>([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [difficultyFilter, setDifficultyFilter] = useState("all")
  const [walletAddress] = useState("0x1234") // Assume this comes from wallet connection

  // Fetch initial rooms from API
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/rooms')
        const data = await response.json()
        // Map API data to Room objects, adding reward
        setRooms(data.map((room: any) => ({
          ...room,
          reward: getReward(room.difficulty)
        })))
      } catch (error) {
        console.error("Error fetching rooms:", error)
      }
    }
    fetchRooms()
  }, [])

  // Authenticate and listen for WebSocket events
  useEffect(() => {
    if (walletAddress) {
      socketService.authenticate(walletAddress)
        .then(() => console.log("Authenticated"))
        .catch((error) => console.error("Authentication error:", error.message))
    }

    // Type the room parameter for onNewRoom
    socketService.onNewRoom((room: Omit<Room, 'reward'>) => {
      setRooms((prevRooms) => [
        ...prevRooms,
        { ...room, reward: getReward(room.difficulty) }
      ])
    })

    // Type the data parameter for onUpdateRoom
    socketService.onUpdateRoom((data: { roomId: string | number; players: number }) => {
      setRooms((prevRooms) =>
        prevRooms.map((room) =>
          room.id === data.roomId ? { ...room, players: data.players } : room
        )
      )
    })

    // Cleanup listeners
    return () => {
      socketService.offNewRoom()
      socketService.offUpdateRoom()
    }
  }, [walletAddress])

  // Update getReward to accept string type
  const getReward = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "500-1000 HONEY"
      case "medium": return "2000-5000 HONEY"
      case "hard": return "6000-10000 HONEY"
      default: return "0 HONEY"
    }
  }

  // Filter rooms with type-safe properties
  const filteredRooms = rooms.filter((room) => {
    const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDifficulty = difficultyFilter === "all" || room.difficulty.toLowerCase() === difficultyFilter
    return matchesSearch && matchesDifficulty
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-cyan-900/20 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 sm:mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 neon-glow">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                Heist Lobby
              </span>
            </h1>
            <p className="text-gray-400 flex items-center gap-2 text-sm sm:text-base">
              <Zap className="w-4 h-4" />
              Choose your next target • {rooms.length} active rooms
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="cyber-button flex items-center gap-2 mt-4 md:mt-0 w-full md:w-auto justify-center"
          >
            <Plus className="w-5 h-5" />
            Create Room
          </button>
        </div>

        <div className="cyber-card mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search rooms by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800/80 border border-cyan-400/30 rounded-lg 
                         text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm sm:text-base"
              />
            </div>

            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="px-4 py-3 bg-gray-800/80 border border-cyan-400/30 rounded-lg 
                       text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm sm:text-base"
            >
              <option value="all">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            <div className="flex items-center gap-2 px-4 py-3 bg-gray-800/80 border border-cyan-400/30 rounded-lg">
              <UsersIcon className="w-5 h-5 text-cyan-400" />
              <span className="text-white text-sm sm:text-base">
                {rooms.reduce((acc, room) => acc + room.players, 0)} players online
              </span>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>

        {filteredRooms.length === 0 && (
          <div className="text-center py-12">
            <div className="cyber-card max-w-md mx-auto">
              <Zap className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400 text-lg mb-2">No rooms found</p>
              <p className="text-gray-500 text-sm">Try adjusting your search or create a new room</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 sm:mt-12">
          {[
            { label: "Active Rooms", value: rooms.length, color: "text-cyan-400", icon: Target },
            {
              label: "Players Online",
              value: rooms.reduce((acc, room) => acc + room.players, 0),
              color: "text-green-400",
              icon: UsersIcon,
            },
            { label: "Total Rewards", value: "26.5K", color: "text-yellow-400", icon: Trophy },
            { label: "Success Rate", value: "73%", color: "text-purple-400", icon: Zap },
          ].map((stat, index) => (
            <div key={index} className="cyber-card text-center">
              <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 mx-auto mb-2" />
              <div className={`text-xl sm:text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
              <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <CreateRoomModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} />
    </div>
  )
}