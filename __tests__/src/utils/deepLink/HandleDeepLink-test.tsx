import { AuthError } from '@supabase/supabase-js'
import * as QueryParams from 'expo-auth-session/build/QueryParams'
import { jestMockAuth } from '@/src/__mocks__/jestMockAuth'
import sessionMockData from '@/src/__mocks__/sessionMockData'
import { handleDeepLink } from '@/src/utils/deepLink/handleDeepLink'
import { supabase } from '@/src/utils/supabaseClient'

const mockDispatch = jest.fn()

jestMockAuth()

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
        const { access_token, refresh_token, user, session } = sessionMockData()

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
        expect(mockDispatch).toHaveBeenCalledWith({
            type: 'auth/setLoading',
            payload: true,
        })
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
     * Creates an event where the query params return an error and error_description in the url.
     * The error description should be set in the Redux store.
     */
    it('should set error description when params contains error', async () => {
        // Arrange
        const error = 'error'
        const error_description = 'error_description'

        jest.spyOn(QueryParams, 'getQueryParams')

        const event = {
            url: `myapp://auth?error=${error}&error_description=${error_description}`,
        }

        // Act
        await handleDeepLink(event, mockDispatch)

        // Assert
        expect(QueryParams.getQueryParams).toHaveBeenCalledWith(event.url)
        expect(mockDispatch).toHaveBeenCalledWith({
            type: 'auth/setError',
            payload: error_description,
        })
        expect(mockDispatch).not.toHaveBeenCalledWith({
            type: 'auth/setUser',
            payload: null,
        })
        expect(mockDispatch).not.toHaveBeenCalledWith({
            type: 'auth/setSession',
            payload: null,
        })
    })

    /**
     * Creates an event where the query params return an error.
     * The error should be set in the Redux store.
     */
    it('should set error when params contains error', async () => {
        // Arrange
        const error = 'error'

        jest.spyOn(QueryParams, 'getQueryParams')

        const event = {
            url: `myapp://auth?error=${error}`,
        }

        // Act
        await handleDeepLink(event, mockDispatch)

        // Assert
        expect(QueryParams.getQueryParams).toHaveBeenCalledWith(event.url)
        expect(mockDispatch).toHaveBeenCalledWith({
            type: 'auth/setError',
            payload: error,
        })
        expect(mockDispatch).not.toHaveBeenCalledWith({
            type: 'auth/setUser',
            payload: null,
        })
        expect(mockDispatch).not.toHaveBeenCalledWith({
            type: 'auth/setSession',
            payload: null,
        })
    })

    /**
     * Creates an event where the supabase set session returns an error.
     * The error message should be set in the Redux store.
     */
    it('should set error if the supabase set session returns error', async () => {
        // Arrange
        const { access_token, refresh_token } = sessionMockData()

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
