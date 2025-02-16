import { configureStore } from '@reduxjs/toolkit'
import { renderHook, act } from '@testing-library/react'
import { Provider } from 'react-redux'
import { jestMockAuth } from '@/src/__mocks__/jestMockAuth'
import sessionMockData from '@/src/__mocks__/sessionMockData'
import { useAuth } from '@/src/hooks/useAuth'
import { setupDeepLink } from '@/src/utils/deepLink/setupDeepLink'
import { supabase } from '@/src/utils/supabaseClient'

const mockAppDispatch = jest.fn()

jestMockAuth()

jest.mock('@/src/redux/store', () => ({
    useAppDispatch: () => mockAppDispatch,
}))

jest.mock('@/src/utils/supabaseClient', () => ({
    supabase: {
        auth: {
            getSession: jest.fn(),
        },
    },
}))

jest.mock('@/src/utils/deepLink/setupDeepLink', () => ({
    setupDeepLink: jest.fn(),
}))

describe('useAuth', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        jest.restoreAllMocks()
    })

    it('should restore session from supabase and run setupDeepLink', async () => {
        // Arrange
        const { session } = sessionMockData()

        const mockStore = configureStore({
            reducer: {
                auth: (state = { session, loading: false }) => state,
            },
        })

        jest.spyOn(supabase.auth, 'getSession').mockResolvedValueOnce({
            data: { session },
            error: null,
        })

        // Act
        await act(async () => {
            renderHook(() => useAuth(), {
                wrapper: ({ children }) => (
                    <Provider store={mockStore}>{children}</Provider>
                ),
            })
        })

        // Assert
        expect(mockAppDispatch).toHaveBeenCalledWith({
            type: 'auth/setLoading',
            payload: true,
        })
        expect(mockAppDispatch).toHaveBeenCalledWith({
            type: 'auth/setUser',
            payload: session.user,
        })
        expect(mockAppDispatch).toHaveBeenCalledWith({
            type: 'auth/setSession',
            payload: session,
        })
        expect(mockAppDispatch).toHaveBeenCalledWith({
            type: 'auth/setLoading',
            payload: false,
        })

        expect(setupDeepLink).toHaveBeenCalled()
    })
})
