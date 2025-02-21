import { configureStore } from '@reduxjs/toolkit'
import { useRouter } from 'expo-router'
import { signInWithMagicLink, signOut } from '@/src/redux/actions/authActions'
import reducer from '@/src/redux/slices/authSlice'

const mockStore = () =>
    configureStore({
        reducer: {
            auth: reducer,
        },
    })

const mockSignInWithOtp = jest.fn()
const mockSignOut = jest.fn()
const mockMakeRedirectUri = jest.fn()
const mockReplace = jest.fn()

jest.mock('@/src/utils/supabaseClient', () => ({
    supabase: {
        auth: {
            get signInWithOtp() {
                return mockSignInWithOtp
            },
            get signOut() {
                return mockSignOut
            },
        },
    },
}))

jest.mock('expo-auth-session', () => ({
    makeRedirectUri: jest.fn(),
}))

jest.mock('expo-router', () => ({
    useRouter: jest.fn().mockReturnValue({
        get replace() {
            return mockReplace
        },
    }),
}))

describe('authActions', () => {
    let store: ReturnType<typeof mockStore>

    beforeEach(() => {
        jest.clearAllMocks()
        store = mockStore()
    })

    describe('signInWithMagicLink', () => {
        it('dispatches setLoading and setError on error', async () => {
            // Arrange
            const email = 'test@example.com'
            const error = { message: 'Error message' }

            mockSignInWithOtp.mockResolvedValueOnce({ error })
            mockMakeRedirectUri.mockReturnValue('redirectUri')

            // Act
            await store.dispatch(signInWithMagicLink(email) as any)

            // Assert
            const state = store.getState().auth
            expect(state.loading).toBe(false)
            expect(state.error).toBe(error.message)
        })
    })

    describe('signOut', () => {
        it('signs out and redirects to home', async () => {
            // Act
            await store.dispatch(signOut(useRouter()) as any)

            // Assert
            expect(mockSignOut).toHaveBeenCalled()
            expect(mockReplace).toHaveBeenCalledWith('/')
        })
    })
})
