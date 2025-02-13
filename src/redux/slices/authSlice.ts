import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User, Session } from '@supabase/supabase-js'

interface AuthState {
    user: User | null
    session: Session | null
    loading: boolean
    deepLinkProcessed: boolean
    error: string | null
}

const initialState: AuthState = {
    user: null,
    session: null,
    loading: true,
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
        setSession: (state, action: PayloadAction<Session | null>) => {
            state.session = action.payload
            state.loading = false // Auth is now done loading
        },
        setDeepLinkProcessed: (state, action: PayloadAction<boolean>) => {
            state.deepLinkProcessed = action.payload
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload
            state.loading = false
        },
        logout: state => {
            state.user = null
            state.session = null
        },
    },
})

export const {
    setUser,
    setSession,
    setDeepLinkProcessed,
    setLoading,
    setError,
    logout,
} = authSlice.actions
export default authSlice.reducer
