import { makeRedirectUri } from 'expo-auth-session'
import { Router } from 'expo-router'
import {
    setLoading,
    setError,
    logout,
    setUser,
    setSession,
} from '../slices/authSlice'
import { AppDispatch } from '../store'
import { supabase } from '@/src/utils/supabaseClient'

/**
 * Used in production for auth.
 * You only need e-mail to sign in.
 * @param email
 */
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
 * Signs in with e-mail and password.
 * Used in development as there are issues with local magic link.
 * @param email
 * @param password
 */
export const signInWithEmailAndPassword =
    (email: string, password: string) => async (dispatch: AppDispatch) => {
        dispatch(setLoading(true))

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            dispatch(setError(error.message))
        }

        if (data?.session) {
            dispatch(setUser(data.session.user))
            dispatch(setSession(data.session))
        }

        dispatch(setLoading(false))
    }

/**
 * Signs out from supabase, clears the user session and redirects to the home page.
 */
export const signOut = (router: Router) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true))
    await supabase.auth.signOut()
    dispatch(logout())
    router.replace('/')
    dispatch(setLoading(false))
}
