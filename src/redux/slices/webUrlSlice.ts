import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Constants from 'expo-constants'
import { Platform } from 'react-native'
import applicationConfig from '@/src/config/applicationConfig'

const PROD_WEB_URL = 'https://splashd.no'
const DEFAULT_LOCAL_PORT = 8081

/**
 * Fetches the URL of the web app based on the environment.
 * In development, it will try to fetch the IP from the debugger host.
 * In production, it will return the production URL.
 * @returns The URL of the web app.
 */
export const fetchAppBaseUrl = createAsyncThunk('webUrl/fetch', async () => {
    if (!applicationConfig.isDevelopment) return PROD_WEB_URL

    try {
        if (Platform.OS === 'web') {
            const { hostname } = window.location
            return `${hostname}:${DEFAULT_LOCAL_PORT}`
        }

        const debuggerHost =
            Constants.expoConfig?.hostUri || Constants.manifest2?.debuggerHost

        if (debuggerHost) {
            const ip = debuggerHost.split(':')[0] // Extract IP
            return `${ip}:${DEFAULT_LOCAL_PORT}`
        }
    } catch (error) {
        console.error('Error fetching local web URL:', error)
    }

    return `127.0.0.1:${DEFAULT_LOCAL_PORT}`
})

/**
 * Slice for the web URL.
 */
const webUrlSlice = createSlice({
    name: 'webUrl',
    initialState: { appBaseUrl: '127.0.0.1:8081' },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchAppBaseUrl.fulfilled, (state, action) => {
            state.appBaseUrl = action.payload
        })
    },
})

export default webUrlSlice.reducer
