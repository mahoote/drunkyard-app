import { AuthError, Session, User } from '@supabase/supabase-js'
import * as QueryParams from 'expo-auth-session/build/QueryParams'
import deepLinkMockData from '@/src/__mocks__/deepLinkMockData'
import { handleDeepLink } from '@/src/utils/deepLink/handleDeepLink'
import { supabase } from '@/src/utils/supabaseClient'

const mockDispatch = jest.fn()
const mockSetLoading = jest.fn()

jest.mock('@/src/redux/slices/authSlice', () => {
    return {
        setUser: jest.fn((user: User) => ({
            type: 'auth/setUser',
            payload: user,
        })),
        setSession: jest.fn((session: Session) => ({
            type: 'auth/setSession',
            payload: session,
        })),
        setLoading: (...args: [boolean]) => mockSetLoading(...args),
        setError: jest.fn((error: string) => ({
            type: 'auth/setError',
            payload: error,
        })),
    }
})

jest.mock('@/src/utils/supabaseClient', () => ({
    supabase: {
        auth: {
            setSession: jest.fn(),
        },
    },
}))

beforeEach(() => {
    jest.clearAllMocks() // Clears mock call history
    jest.restoreAllMocks() // Restores all mocks to their original state
})

describe('handleDeepLink', () => {
    /**
     * If the URL is empty, the function should return early.
     */
    it('should return on invalid URL received', () => {
        // Arrange
        const event = { url: '' }

        jest.spyOn(QueryParams, 'getQueryParams')

        // Act
        handleDeepLink(event, mockDispatch)

        // Assert
        expect(QueryParams.getQueryParams).not.toHaveBeenCalled()
    })

    /**
     * Creates a working deep link event.
     * The deep link should set the user and session in the Redux store.
     */
    it('should handle valid deep link and set user and session', async () => {
        // Arrange
        const { access_token, refresh_token, user, session } =
            deepLinkMockData()

        jest.spyOn(QueryParams, 'getQueryParams')

        jest.spyOn(supabase.auth, 'setSession').mockResolvedValueOnce({
            data: { user: null, session },
            error: null,
        })

        const event = {
            url: `myapp://auth?access_token=${access_token}&refresh_token=${refresh_token}`,
        }

        // Act
        await handleDeepLink(event, mockDispatch)

        // Assert
        expect(QueryParams.getQueryParams).toHaveBeenCalledWith(event.url)
        expect(supabase.auth.setSession).toHaveBeenCalledWith({
            access_token,
            refresh_token,
        })
        expect(mockDispatch).toHaveBeenCalledWith({
            type: 'auth/setUser',
            payload: user,
        })
        expect(mockDispatch).toHaveBeenCalledWith({
            type: 'auth/setSession',
            payload: session,
        })
        expect(mockSetLoading).toHaveBeenCalledWith(true)
        expect(mockSetLoading).not.toHaveBeenCalledWith(false)
    })

    /**
     * Creates an event where the query params return an error code.
     * The error code should be set in the Redux store.
     */
    it('should set error when query params return error code', () => {
        // Arrange
        jest.spyOn(QueryParams, 'getQueryParams').mockReturnValue({
            params: {},
            errorCode: 'error_code',
        })

        const event = { url: 'myapp://auth' }

        // Act
        handleDeepLink(event, mockDispatch)

        // Assert
        expect(QueryParams.getQueryParams).toHaveBeenCalledWith(event.url)
        expect(mockDispatch).toHaveBeenCalledWith({
            type: 'auth/setError',
            payload: 'error_code',
        })
    })

    /**
     * Creates two events with different tokens.
     * Token one is missing the refresh token.
     * Token two is missing the access token.
     * Both should set an error.
     */
    it('should set error when params record contains undefined string', () => {
        // Arrange
        const { access_token, refresh_token, session } = deepLinkMockData()

        const eventOne = {
            url: `myapp://auth?access_token=${access_token}`,
        }

        const eventTwo = {
            url: `myapp://auth?refresh_token=${refresh_token}`,
        }

        const mockDispatchTwo = jest.fn()

        jest.spyOn(QueryParams, 'getQueryParams')

        jest.spyOn(supabase.auth, 'setSession').mockResolvedValue({
            data: { user: null, session },
            error: null,
        })

        // Act
        handleDeepLink(eventOne, mockDispatch)
        handleDeepLink(eventTwo, mockDispatchTwo)

        // Assert
        expect(QueryParams.getQueryParams).toHaveBeenCalledWith(eventOne.url)
        expect(mockDispatch).toHaveBeenCalledWith({
            type: 'auth/setError',
            payload: 'Missing authentication tokens',
        })

        expect(QueryParams.getQueryParams).toHaveBeenCalledWith(eventTwo.url)
        expect(mockDispatchTwo).toHaveBeenCalledWith({
            type: 'auth/setError',
            payload: 'Missing authentication tokens',
        })
    })

    /**
     * Creates an event where the supabase set session returns an error.
     * The error message should be set in the Redux store.
     */
    it('should set error if the supabase set session returns error', async () => {
        // Arrange
        const { access_token, refresh_token } = deepLinkMockData()

        const error = {
            name: 'SUPABASE_ERROR',
            message: 'error_message',
        } as AuthError

        jest.spyOn(QueryParams, 'getQueryParams')

        jest.spyOn(supabase.auth, 'setSession').mockResolvedValueOnce({
            data: { user: null, session: null },
            error,
        })

        const event = {
            url: `myapp://auth?access_token=${access_token}&refresh_token=${refresh_token}`,
        }

        // Act
        await handleDeepLink(event, mockDispatch)

        // Assert
        expect(QueryParams.getQueryParams).toHaveBeenCalledWith(event.url)
        expect(supabase.auth.setSession).toHaveBeenCalledWith({
            access_token,
            refresh_token,
        })
        expect(mockDispatch).toHaveBeenCalledWith({
            type: 'auth/setError',
            payload: error.message,
        })
    })
})
