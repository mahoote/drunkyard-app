import { configureStore } from '@reduxjs/toolkit'
import reducer, { fetchAppBaseUrl } from '@/src/redux/slices/webUrlSlice'

const PROD_WEB_URL = 'https://splashd.no'
const DEFAULT_LOCAL_PORT = 8081

const MOCK_VALUES = {
    hostUri: 'localhost:19001',
    debuggerHost: 'localhost:8081',
}

// Mocks
const mockStore = () =>
    configureStore({
        reducer: {
            webUrl: reducer,
        },
    })

const mockIsDevelopment = jest.fn()
const mockPlatformOS = jest.fn()
const mockExpoConstants = jest.fn()

jest.mock('expo-constants', () => {
    return {
        get expoConfig() {
            return mockExpoConstants().expoConfig
        },
        get manifest2() {
            return mockExpoConstants().manifest2
        },
    }
})

jest.mock('react-native', () => ({
    get Platform() {
        return { OS: mockPlatformOS() }
    },
}))

jest.mock('@/src/config/applicationConfig', () => ({
    get isDevelopment() {
        return mockIsDevelopment()
    },
}))

describe('webUrlSlice', () => {
    let store: ReturnType<typeof mockStore>

    beforeEach(() => {
        jest.clearAllMocks()
        jest.restoreAllMocks()
        store = mockStore()
    })

    describe('fetchAppBaseUrl', () => {
        /**
         * Sets the environment to production.
         * The expected result is the production URL.
         */
        it('should return production URL if not in development', async () => {
            // Arrange
            mockIsDevelopment.mockReturnValueOnce(false)

            // Act
            const result = await store.dispatch(fetchAppBaseUrl())

            // Assert
            expect(result.payload).toBe(PROD_WEB_URL)
        })

        /**
         * This is the most common scenario.
         * The app is in development and running on a native platform.
         */
        it('should return localhost URL on native platforms', async () => {
            // Arrange
            setupMocks(true, 'ios', MOCK_VALUES.hostUri)

            // Act
            const result = await store.dispatch(fetchAppBaseUrl())

            // Assert
            expect(result.payload).toBe(`localhost:${DEFAULT_LOCAL_PORT}`)
        })

        /**
         * Falls to the default localhost URL when no hostUri is available.
         */
        it('should return localhost when no debugger host is available', async () => {
            // Arrange
            setupMocks(true, 'ios', null, null)

            // Act
            const result = await store.dispatch(fetchAppBaseUrl())

            // Assert
            expect(result.payload).toBe(`127.0.0.1:${DEFAULT_LOCAL_PORT}`)
        })

        /**
         * This test is for web platforms.
         * Mocking the window.location object is necessary.
         */
        it('should return the web hostname on web platforms', async () => {
            // Arrange
            setupMocks(true, 'web', null, MOCK_VALUES.debuggerHost)
            Object.defineProperty(window, 'location', {
                value: { hostname: 'localhost' },
                writable: true,
            })

            // Act
            const result = await store.dispatch(fetchAppBaseUrl())

            // Assert
            expect(result.payload).toBe(`localhost:${DEFAULT_LOCAL_PORT}`)
        })

        /**
         * This test is for unexpected errors.
         */
        it('should return localhost if an unexpected error occurs', async () => {
            // Arrange
            mockIsDevelopment.mockReturnValueOnce(true)
            mockPlatformOS.mockReturnValueOnce('ios')

            mockExpoConstants.mockReturnValueOnce({
                get expoConfig() {
                    throw new Error('Error fetching expoConfig')
                },
                get manifest2() {
                    throw new Error('Error fetching manifest2')
                },
            })

            const consoleSpy = jest
                .spyOn(console, 'error')
                .mockImplementation(() => {})

            // Act
            const result = await store.dispatch(fetchAppBaseUrl())

            // Assert
            expect(consoleSpy).toHaveBeenCalledWith(
                'Error fetching local web URL:',
                expect.any(Error),
            )
            expect(result.payload).toBe(`127.0.0.1:${DEFAULT_LOCAL_PORT}`)
        })
    })

    describe('Reducer', () => {
        it('should handle fetchAppBaseUrl.fulfilled', () => {
            // Arrange
            const previousState = {
                appBaseUrl: `localhost:${DEFAULT_LOCAL_PORT}`,
            }
            const action = {
                type: fetchAppBaseUrl.fulfilled.type,
                payload: `localhost:${DEFAULT_LOCAL_PORT}`,
            }

            // Act
            const newState = reducer(previousState, action)

            // Assert
            expect(newState.appBaseUrl).toBe(`localhost:${DEFAULT_LOCAL_PORT}`)
        })
    })
})

/**
 * All the mocks used in the tests.
 * @param isDevelopment
 * @param platformOs
 * @param hostUri
 * @param debuggerHost
 */
function setupMocks(
    isDevelopment: boolean = true,
    platformOs: 'ios' | 'android' | 'windows' | 'macos' | 'web' | 'unknown',
    hostUri: string | null | undefined,
    debuggerHost?: string | null,
) {
    mockIsDevelopment.mockReturnValueOnce(isDevelopment)
    mockPlatformOS.mockReturnValueOnce(platformOs)

    mockExpoConstants.mockReturnValueOnce({
        get expoConfig() {
            return { hostUri }
        },
        get manifest2() {
            return { debuggerHost }
        },
    })
}
