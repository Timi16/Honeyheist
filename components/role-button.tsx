"use client"

import Image from "next/image"

interface Role {
  key: string
  label: string
  icon: string
  description: string
}

interface RoleButtonProps {
  role: Role
  isSelected: boolean
  isDisabled: boolean
  onClick: () => void
}

export function RoleButton({ role, isSelected, isDisabled, onClick }: RoleButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`p-4 rounded-lg border-2 transition-all duration-200 text-center
        ${
          isSelected
            ? "border-cyan-400 bg-cyan-400/10 neon-border"
            : isDisabled
              ? "border-gray-600 bg-gray-800/50 opacity-50 cursor-not-allowed"
              : "border-gray-600 bg-gray-800/80 hover:border-cyan-400/50 hover:bg-gray-700/80"
        }`}
    >
      <div className="relative w-16 h-16 mx-auto mb-3">
        <Image
          src={role.icon || "/placeholder.svg"}
          alt={`${role.label} icon`}
          fill
          className={`object-contain ${isSelected ? "neon-glow" : ""}`}
        />
      </div>

      <h3 className={`font-bold mb-1 ${isSelected ? "text-cyan-400" : "text-white"}`}>{role.label}</h3>

      <p className="text-xs text-gray-400">{role.description}</p>

      {isDisabled && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
          <span className="text-red-400 font-semibold">Taken</span>
        </div>
      )}
    </button>
  )
}
