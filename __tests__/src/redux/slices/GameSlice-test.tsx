import gameReducer, {
    setGameGenericPreferences,
    setPlayerPreferences,
} from '@/src/redux/slices/gameSlice'
import { GameState } from '@/src/types/game'

/**
 * Basic tests for the game slice of redux for the game state.
 */
describe('gameSlice', () => {
    const initialState: GameState = {
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
     * Validates the initial state of the game slice.
     * Will expect to be equal to the actual initial state.
     */
    it('should handle initial state', () => {
        expect(gameReducer(undefined, { type: 'unknown' })).toEqual(
            initialState,
        )
    })

    it('should handle set game generic preferences', () => {
        // Arrange
        const gameGenericPreferences = {
            isPlayerCreative: true,
            durationMinutes: 60,
        }

        // Act
        const actual = gameReducer(
            initialState,
            setGameGenericPreferences(gameGenericPreferences),
        )

        // Assert
        expect(actual.gameGenericPreferences).toEqual(gameGenericPreferences)
    })

    it('should handle set player preferences', () => {
        // Arrange
        const playerPreferences = {
            drunkLevel: 1,
            activityLevel: 1,
        }

        // Act
        const actual = gameReducer(
            initialState,
            setPlayerPreferences(playerPreferences),
        )

        // Assert
        expect(actual.playerPreferences).toEqual(playerPreferences)
    })
})
