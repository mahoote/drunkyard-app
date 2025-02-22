import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
    GameState,
    GameGenericPreferences,
    PlayerPreferences,
} from '@/src/types/game'

const initialState: GameState = {
    gameGenericPreferences: {
        isPlayerCreative: false,
    },
    playerPreferences: {
        drunkLevel: 1,
        activityLevel: 1,
    },
}

/**
 * A slice containing game state like what the game preferences is.
 */
const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setGameGenericPreferences: (
            state,
            action: PayloadAction<GameGenericPreferences>,
        ) => {
            state.gameGenericPreferences = action.payload
        },
        setPlayerPreferences: (
            state,
            action: PayloadAction<PlayerPreferences>,
        ) => {
            state.playerPreferences = action.payload
        },
    },
})

export const { setGameGenericPreferences, setPlayerPreferences } =
    gameSlice.actions
export default gameSlice.reducer
