import { configureStore } from '@reduxjs/toolkit'
import { render, waitFor } from '@testing-library/react-native'
import React from 'react'
import { Provider } from 'react-redux'
import { MainApp } from '@/app/_layout'

// Constants
const AUTH_ROUTES = ['/some-auth-route']

// Mocks
const mockAppDispatch = jest.fn()
const mockPush = jest.fn()
const mockBack = jest.fn()
const mockAuthStatus = jest.fn()

const mockStore = configureStore({
    reducer: {
        auth: (state = { isAuthenticated: false, loading: false }) => state,
        webUrl: (state = { baseUrl: 'http://example.com' }) => state,
    },
})

// Setup Mocks for external dependencies
jest.mock('@/src/config/authConfig', () => ({
    AUTH_ROUTES,
}))

jest.mock('expo-router', () => ({
    useRouter: () => ({ push: mockPush, back: mockBack }),
    usePathname: () => AUTH_ROUTES[0],
    Stack: jest.fn(() => null),
}))

jest.mock('@/src/hooks/useAuth', () => ({
    useAuth: () => mockAuthStatus(),
}))

jest.mock('@/src/redux/store', () => ({
    useAppDispatch: () => mockAppDispatch,
}))

jest.mock('@/src/redux/slices/webUrlSlice', () => ({
    fetchAppBaseUrl: jest.fn(() => ({ type: 'webUrl/fetchAppBaseUrl' })),
}))

beforeEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
})

describe('useAppLogic', () => {
    /**
     * Makes sure to get the app base URL on mount.
     */
    it('should dispatch fetchAppBaseUrl on mount', async () => {
        mockAuthStatus.mockReturnValueOnce({
            isAuthenticated: false,
            loading: false,
        })

        render(
            <Provider store={mockStore}>
                <MainApp />
            </Provider>,
        )

        await waitFor(() => {
            expect(mockAppDispatch).toHaveBeenCalledWith({
                type: 'webUrl/fetchAppBaseUrl',
            })
        })
    })

    /**
     * Makes sure to redirect to login if the user is not authenticated and trying to access auth routes.
     */
    it('should redirect to login if the user is not authenticated and trying to access auth routes', async () => {
        mockAuthStatus.mockReturnValueOnce({
            isAuthenticated: false,
            loading: false,
        })

        render(
            <Provider store={mockStore}>
                <MainApp />
            </Provider>,
        )

        await waitFor(() => {
            expect(mockBack).toHaveBeenCalled()
            expect(mockPush).toHaveBeenCalledWith('/login')
        })
    })

    /**
     * Lets the user access the route if the user is authenticated.
     */
    it('should not redirect to login if the user is authenticated and accessing auth route', async () => {
        mockAuthStatus.mockReturnValueOnce({
            isAuthenticated: true,
            loading: false,
        })

        render(
            <Provider store={mockStore}>
                <MainApp />
            </Provider>,
        )

        await waitFor(() => {
            expect(mockBack).not.toHaveBeenCalled()
            expect(mockPush).not.toHaveBeenCalled()
        })
    })
})
