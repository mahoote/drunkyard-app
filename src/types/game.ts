import { Room } from '@/src/types/room'

export interface PlayerPreferences {
    drunkLevel: number
    activityLevel: number
}

export interface GameGenericPreferences {
    isPlayerCreative: boolean
    durationMinutes: number
}

export interface GameState {
    room: Room | null
    gameGenericPreferences: GameGenericPreferences
    playerPreferences: PlayerPreferences
}
