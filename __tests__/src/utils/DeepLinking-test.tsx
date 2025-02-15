import { Session, User } from '@supabase/supabase-js'
import * as QueryParams from 'expo-auth-session/build/QueryParams'
import { handleDeepLink } from '@/src/utils/deepLinking'

import { supabase } from '@/src/utils/supabaseClient'

const mockDispatch = jest.fn()
const mockSetUser = jest.fn()
const mockSetSession = jest.fn()

jest.mock('expo-auth-session/build/QueryParams', () => ({
    getQueryParams: jest.fn(),
}))

jest.mock('@/src/redux/slices/authSlice', () => ({
    setUser: (...args: [User]) => mockSetUser(...args),
    setSession: (...args: [Session]) => mockSetSession(...args),
    setLoading: jest.fn(),
    setError: jest.fn(),
}))

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
            access_token: 'valid_access_token',
            refresh_token: 'valid_refresh_token',
            expires_in: 3600,
            token_type: '',
        }

        jest.spyOn(QueryParams, 'getQueryParams').mockImplementation(() => ({
            params: {
                access_token,
                refresh_token,
            },
            errorCode: null,
        }))

        jest.spyOn(supabase.auth, 'setSession').mockImplementation(() =>
            Promise.resolve({
                data: {
                    user: null,
                    session,
                },
                error: null,
            }),
        )

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
        expect(mockSetUser).toHaveBeenCalledWith(user)
        expect(mockSetSession).toHaveBeenCalledWith(session)
    })
})
