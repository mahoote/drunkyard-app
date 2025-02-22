export interface PlayerPreferences {
    drunkLevel: number
    activityLevel: number
}

export interface GameGenericPreferences {
    isPlayerCreative: boolean
}

export interface GameState {
    gameGenericPreferences: GameGenericPreferences
    playerPreferences: PlayerPreferences
}
