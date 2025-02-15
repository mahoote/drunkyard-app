import { Session, User } from '@supabase/supabase-js'
import * as QueryParams from 'expo-auth-session/build/QueryParams'
import { handleDeepLink } from '@/src/utils/deepLinking'
import { supabase } from '@/src/utils/supabaseClient'

const mockDispatch = jest.fn()

jest.mock('expo-auth-session/build/QueryParams', () => ({
    getQueryParams: jest.fn(),
}))

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
        setLoading: jest.fn(),
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

describe('handleDeepLink', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should set error on invalid URL received', () => {
        // Arrange
        const event = { url: '' }

        // Mock console.error to suppress the output and track its calls
        const mockConsoleError = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {})

        // Act
        handleDeepLink(event, mockDispatch)

        // Assert
        expect(mockConsoleError).toHaveBeenCalledWith(
            'Invalid URL received',
            event,
        )
        expect(mockDispatch).toHaveBeenCalledWith({
            type: 'auth/setError',
            payload: 'Invalid deep link URL',
        })

        // Cleanup
        mockConsoleError.mockRestore()
    })

    it('should handle valid deep link and set user and session', async () => {
        // Arrange
        const access_token = 'valid_access_token'
        const refresh_token = 'valid_refresh_token'

        const user: User = {
            id: 'user_id',
            app_metadata: {},
            user_metadata: {},
            aud: '',
            created_at: '',
        }

        const session: Session = {
            user,
            access_token,
            refresh_token,
            expires_in: 3600,
            token_type: '',
        }

        jest.spyOn(QueryParams, 'getQueryParams').mockReturnValue({
            params: { access_token, refresh_token },
            errorCode: null,
        })

        jest.spyOn(supabase.auth, 'setSession').mockResolvedValueOnce({
            data: { user: null, session },
            error: null,
        })

        const url = `myapp://auth?access_token=${access_token}&refresh_token=${refresh_token}`
        const event = { url }

        // Act
        await handleDeepLink(event, mockDispatch)

        // Assert
        expect(QueryParams.getQueryParams).toHaveBeenCalledWith(url)
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
    })
})
