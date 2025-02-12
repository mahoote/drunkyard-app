import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Constants from 'expo-constants'

const PROD_WEB_URL = 'https://splashd.no'
const DEFAULT_LOCAL_PORT = 8081

/**
 * Fetches the URL of the web app based on the environment.
 * In development, it will try to fetch the IP from the debugger host.
 * In production, it will return the production URL.
 * @returns The URL of the web app.
 */
export const fetchWebAppUrl = createAsyncThunk('webUrl/fetch', async () => {
    if (!__DEV__) return PROD_WEB_URL

    try {
        const debuggerHost =
            Constants.expoConfig?.hostUri || Constants.manifest2?.debuggerHost

        if (debuggerHost) {
            const ip = debuggerHost.split(':')[0] // Extract IP
            return `http://${ip}:${DEFAULT_LOCAL_PORT}`
        }
    } catch (error) {
        console.error('Error fetching local web URL:', error)
    }

    return `http://127.0.0.1:${DEFAULT_LOCAL_PORT}`
})

/**
 * Slice for the web URL.
 */
const webUrlSlice = createSlice({
    name: 'webUrl',
    initialState: { webAppUrl: 'http://127.0.0.1:8081' },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchWebAppUrl.fulfilled, (state, action) => {
            state.webAppUrl = action.payload
        })
    },
})

export default webUrlSlice.reducer
