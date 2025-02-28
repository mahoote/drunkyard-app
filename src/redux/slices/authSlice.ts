import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User, Session } from '@supabase/supabase-js'
import { AuthState } from '@/src/types/auth'
import { Player } from '@/src/types/player'

const initialState: AuthState = {
    user: null,
    player: null,
    session: null,
    loading: true,
    loadingMessage: '',
    deepLinkProcessed: false,
    error: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload
        },
        setPlayer: (state, action: PayloadAction<Player | null>) => {
            state.player = action.payload
        },
        setSession: (state, action: PayloadAction<Session | null>) => {
            state.session = action.payload
            state.loading = false // Auth is now done loading
        },
        setDeepLinkProcessed: (state, action: PayloadAction<boolean>) => {
            state.deepLinkProcessed = action.payload
        },
        setLoading: (
            state,
            action: PayloadAction<{
                loading: boolean
                loadingMessage?: string
            }>,
        ) => {
            state.loading = action.payload.loading
            state.loadingMessage =
                action.payload.loadingMessage ?? 'Laster inn...'
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload
            state.loading = false
        },
        logout: state => {
            state.user = null
            state.session = null
            state.error = null
            state.deepLinkProcessed = false
            state.player = null
        },
    },
})

export const {
    setUser,
    setPlayer,
    setSession,
    setDeepLinkProcessed,
    setLoading,
    setError,
    logout,
} = authSlice.actions
export default authSlice.reducer
