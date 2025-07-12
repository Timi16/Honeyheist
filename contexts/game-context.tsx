"use client"

import type React from "react"

import { createContext, useContext, useReducer, type ReactNode } from "react"

interface GameState {
  isConnected: boolean
  walletAddress: string | null
  currentRoom: string | null
  playerRole: string | null
  gameStatus: "idle" | "lobby" | "room" | "heist" | "completed"
  players: Array<{
    id: string
    address: string
    role: string | null
    isReady: boolean
  }>
}

type GameAction =
  | { type: "CONNECT_WALLET"; payload: string }
  | { type: "DISCONNECT_WALLET" }
  | { type: "JOIN_ROOM"; payload: string }
  | { type: "LEAVE_ROOM" }
  | { type: "SELECT_ROLE"; payload: string }
  | { type: "SET_READY"; payload: boolean }
  | { type: "START_HEIST" }
  | { type: "COMPLETE_HEIST" }

const initialState: GameState = {
  isConnected: false,
  walletAddress: null,
  currentRoom: null,
  playerRole: null,
  gameStatus: "idle",
  players: [],
}

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "CONNECT_WALLET":
      return {
        ...state,
        isConnected: true,
        walletAddress: action.payload,
        gameStatus: "lobby",
      }

    case "DISCONNECT_WALLET":
      return {
        ...initialState,
      }

    case "JOIN_ROOM":
      return {
        ...state,
        currentRoom: action.payload,
        gameStatus: "room",
      }

    case "LEAVE_ROOM":
      return {
        ...state,
        currentRoom: null,
        playerRole: null,
        gameStatus: "lobby",
        players: [],
      }

    case "SELECT_ROLE":
      return {
        ...state,
        playerRole: action.payload,
      }

    case "START_HEIST":
      return {
        ...state,
        gameStatus: "heist",
      }

    case "COMPLETE_HEIST":
      return {
        ...state,
        gameStatus: "completed",
      }

    default:
      return state
  }
}

const GameContext = createContext<{
  state: GameState
  dispatch: React.Dispatch<GameAction>
} | null>(null)

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState)

  return <GameContext.Provider value={{ state, dispatch }}>{children}</GameContext.Provider>
}

export function useGame() {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error("useGame must be used within a GameProvider")
  }
  return context
}
