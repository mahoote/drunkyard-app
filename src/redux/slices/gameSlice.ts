import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
    GameState,
    GameGenericPreferences,
    PlayerPreferences,
} from '@/src/types/game'
import { Room } from '@/src/types/room'

const initialState: GameState = {
    room: null,
    gameGenericPreferences: {
        isPlayerCreative: false,
        durationMinutes: 30,
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
        setRoom: (state, action: PayloadAction<Room | null>) => {
            state.room = action.payload
        },
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

export const { setRoom, setGameGenericPreferences, setPlayerPreferences } =
    gameSlice.actions
export default gameSlice.reducer
