"use client"

import Link from "next/link"
import Image from "next/image"
import { Users, Star, ArrowRight, Clock, Shield } from "lucide-react"
import { getVaultThumbnail, getDifficultyColor, getRoomTypeIcon } from "@/utils/real-images"

interface Room {
  id: string
  name: string
  players: number
  maxPlayers: number
  difficulty: string
  reward: string
  type?: string
  description?: string
}

interface RoomCardProps {
  room: Room
}

export function RoomCard({ room }: RoomCardProps) {
  // REAL thumbnail generation - no 404s!
  const thumbnail = getVaultThumbnail(room.id)
  const difficultyColor = getDifficultyColor(room.difficulty)
  const roomIcon = getRoomTypeIcon(room.name)
  const isFull = room.players >= room.maxPlayers
  const isEmpty = room.players === 0

  return (
    <div className="cyber-card group hover:scale-105 transition-transform duration-200 relative overflow-hidden">
      {/* Status indicator */}
      <div className="absolute top-2 right-2 z-10">
        {isFull ? (
          <div className="bg-red-500/20 border border-red-500/30 rounded px-2 py-1 text-xs text-red-400">FULL</div>
        ) : isEmpty ? (
          <div className="bg-green-500/20 border border-green-500/30 rounded px-2 py-1 text-xs text-green-400">
            OPEN
          </div>
        ) : (
          <div className="bg-yellow-500/20 border border-yellow-500/30 rounded px-2 py-1 text-xs text-yellow-400">
            ACTIVE
          </div>
        )}
      </div>

      {/* REAL Thumbnail - NO MORE 404s! */}
      <div className="relative h-32 mb-4 rounded-lg overflow-hidden">
        <Image
          src={thumbnail || "/placeholder.svg"}
          alt={`${room.name} vault - real security setup`}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Room ID Badge */}
        <div className="absolute top-2 left-2 bg-cyan-400/20 backdrop-blur-sm border border-cyan-400/30 rounded px-2 py-1 text-xs font-mono text-cyan-400">
          {room.id}
        </div>

        {/* Room Type Icon */}
        <div className="absolute bottom-2 right-2 text-2xl">{roomIcon}</div>
      </div>

      {/* Room Info */}
      <div className="space-y-3">
        <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors flex items-center gap-2">
          {room.name}
          {room.difficulty === "Expert" && <Shield className="w-4 h-4 text-purple-400" />}
        </h3>

        {room.description && <p className="text-sm text-gray-400">{room.description}</p>}

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-gray-400">
            <Users className="w-4 h-4" />
            <span>
              {room.players}/{room.maxPlayers}
            </span>
          </div>

          <div className={`flex items-center gap-1 ${difficultyColor}`}>
            <Star className="w-4 h-4" />
            <span>{room.difficulty}</span>
          </div>
        </div>

        {/* Progress bar for room capacity */}
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-cyan-400 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(room.players / room.maxPlayers) * 100}%` }}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="text-green-400 font-semibold flex items-center gap-1">
            <span>{room.reward}</span>
          </div>

          <Link
            href={`/room/${room.id}`}
            className={`flex items-center gap-1 transition-colors ${
              isFull ? "text-gray-500 cursor-not-allowed" : "text-cyan-400 hover:text-cyan-300"
            }`}
            onClick={isFull ? (e) => e.preventDefault() : undefined}
          >
            {isFull ? (
              <>
                Full <Clock className="w-4 h-4" />
              </>
            ) : (
              <>
                Join <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Link>
        </div>
      </div>
    </div>
  )
}
