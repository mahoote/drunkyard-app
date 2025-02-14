import { configureStore } from '@reduxjs/toolkit'
import { render, waitFor } from '@testing-library/react-native'
import React from 'react'
import { Provider } from 'react-redux'
import { MainApp } from '@/app/_layout'
import { AuthStatus } from '@/src/types/auth'

// Mock variables
const mockAppDispatch = jest.fn()
const mockReplace = jest.fn()
const mockAuthStatus = jest.fn()

const AUTH_ROUTES = ['/some-auth-route']

const mockStore = configureStore({
    reducer: {
        auth: (
            state = { isAuthenticated: false, loading: false },
            action: any,
        ) => state,
        webUrl: (state = { baseUrl: 'http://example.com' }, action: any) =>
            state,
    },
})

// Setup mocks
jest.mock('@/src/config/authConfig', () => ({
    AUTH_ROUTES,
}))

jest.mock('expo-router', () => ({
    useRouter: () => ({ replace: mockReplace }),
    usePathname: () => AUTH_ROUTES[0],
    Stack: jest.fn(() => null),
}))

jest.mock('@/src/hooks/useAuth', () => ({
    useAuth: (): AuthStatus => mockAuthStatus(),
}))

jest.mock('@/src/redux/store', () => ({
    useAppDispatch: () => mockAppDispatch,
}))

jest.mock('@/src/redux/slices/webUrlSlice', () => ({
    fetchAppBaseUrl: jest.fn(() => ({ type: 'webUrl/fetchAppBaseUrl' })),
}))

// Tests
describe('MainApp', () => {
    beforeEach(() => {
        mockAuthStatus.mockReset()
        mockReplace.mockReset()
    })

    it('dispatches fetchAppBaseUrl on mount', async () => {
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

    it('redirects to login if the user is not authenticated and trying to access auth routes', async () => {
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
            expect(mockReplace).toHaveBeenCalledWith('/login')
        })
    })

    it('should not redirect to login if the user is authenticated and accessing auth route.', async () => {
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
            expect(mockReplace).not.toHaveBeenCalled()
        })
    })
})
