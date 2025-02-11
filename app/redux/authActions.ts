import { makeRedirectUri } from 'expo-auth-session'
import { setUser, setSession, setLoading, setError, logout } from './authSlice'
import { AppDispatch } from './store'
import { supabase } from '@/app/utils/supabaseClient'

// Listen for authentication changes
export const listenToAuthChanges = () => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true))

    // Get the current session
    const {
        data: { session },
    } = await supabase.auth.getSession()
    if (session) {
        dispatch(setUser(session.user))
        dispatch(setSession(session))
    }

    // Listen for auth changes
    supabase.auth.onAuthStateChange((_event, session) => {
        if (session) {
            dispatch(setUser(session.user))
            dispatch(setSession(session))
        } else {
            dispatch(logout())
        }
    })

    dispatch(setLoading(false))
}

// Sign in with Magic Link
export const signInWithMagicLink =
    (email: string) => async (dispatch: AppDispatch) => {
        dispatch(setLoading(true))

        const redirectUri = makeRedirectUri({
            scheme: 'dev.teigen',
            path: 'login',
        })

        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: redirectUri,
            },
        })

        if (error) {
            dispatch(setError(error.message))
        }

        dispatch(setLoading(false))
    }

// Sign out
export const signOut = () => async (dispatch: AppDispatch) => {
    await supabase.auth.signOut()
    dispatch(logout())
}
