import { makeRedirectUri } from 'expo-auth-session'
import { Router } from 'expo-router'
import { setLoading, setError, logout } from '../slices/authSlice'
import { AppDispatch } from '../store'
import { supabase } from '@/src/utils/supabaseClient'

export const signInWithMagicLink =
    (email: string) => async (dispatch: AppDispatch) => {
        dispatch(setLoading(true))

        const redirectUri = makeRedirectUri({
            scheme: 'dev.teigen',
            path: 'profile',
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

/**
 * Signs out from supabase, clears the user session and redirects to the home page.
 */
export const signOut = (router: Router) => async (dispatch: AppDispatch) => {
    await supabase.auth.signOut()
    dispatch(logout())
    router.replace('/')
}
