import sessionMockData from '@/src/__mocks__/sessionMockData'
import authReducer, {
    logout,
    setDeepLinkProcessed,
    setError,
    setLoading,
    setSession,
    setUser,
} from '@/src/redux/slices/authSlice'
import { AuthState } from '@/src/types/auth'

describe('authSlice', () => {
    const initialState: AuthState = {
        user: null,
        session: null,
        loading: true,
        deepLinkProcessed: false,
        error: null,
    }

    it('should handle initial state', () => {
        expect(authReducer(undefined, { type: 'unknown' })).toEqual(
            initialState,
        )
    })

    it('should handle set user', () => {
        // Arrange
        const { user } = sessionMockData()

        // Act
        const actual = authReducer(initialState, setUser(user))

        // Assert
        expect(actual.user).not.toBeNull()
        expect(actual.user?.email).toEqual('test@persson.com')
        expect(actual.user).toEqual(user)
    })

    it('should handle set session', () => {
        // Arrange
        const { session } = sessionMockData()

        // Act
        const actual = authReducer(initialState, setSession(session))

        // Assert
        expect(actual.session).not.toBeNull()
        expect(actual.session).toEqual(session)
    })

    it('should should handle set deep link processed', () => {
        // Arrange
        const state: AuthState = {
            user: null,
            session: null,
            loading: false,
            deepLinkProcessed: false,
            error: null,
        }

        // Act
        const actual = authReducer(state, setDeepLinkProcessed(true))

        // Assert
        expect(actual.deepLinkProcessed).toBeTruthy()
    })

    it('should handle set loading', () => {
        // Arrange
        const state: AuthState = {
            user: null,
            session: null,
            loading: false,
            deepLinkProcessed: false,
            error: null,
        }

        // Act
        const actual = authReducer(state, setLoading(true))

        // Assert
        expect(actual.loading).toBeTruthy()
    })

    it('should handle set error', () => {
        // Arrange
        const state: AuthState = {
            user: null,
            session: null,
            loading: false,
            deepLinkProcessed: false,
            error: null,
        }

        // Act
        const actual = authReducer(state, setError('error'))

        // Assert
        expect(actual.error).not.toBeNull()
        expect(actual.error).toEqual('error')
    })

    it('should handle logout', () => {
        // Arrange
        const { user, session } = sessionMockData()
        const state: AuthState = {
            user,
            session,
            loading: false,
            deepLinkProcessed: false,
            error: null,
        }

        // Act
        const actual = authReducer(state, logout())

        // Assert
        expect(actual.user).toBeNull()
        expect(actual.session).toBeNull()
    })
})
