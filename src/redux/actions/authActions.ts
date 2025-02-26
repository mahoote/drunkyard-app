import { Session, User } from '@supabase/supabase-js'
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
 * Combined sign in and sign up with e-mail and password.
 * Used in development as there are issues with local magic link.
 * If the user doesn't exist, we sign them up so the flow is similar to magic link.
 * @param email
 * @param password
 */
export const signInWithEmailAndPassword =
    (email: string, password: string) => async (dispatch: AppDispatch) => {
        dispatch(setLoading(true))

        let responseData: { user: User | null; session: Session | null }

        // Try sign in.
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        responseData = { session: data.session, user: data.user }

        if (error) {
            // Sign them up
            if (error.message.includes('Invalid login credentials')) {
                const { data: signUpData, error: signUpError } =
                    await supabase.auth.signUp({
                        email,
                        password,
                    })

                if (signUpError) {
                    dispatch(setError(signUpError.message))
                    dispatch(setLoading(false))
                    return
                }

                if (signUpData) {
                    // Use the newly created user
                    responseData = signUpData
                }
            } else {
                dispatch(setError(error.message))
                dispatch(setLoading(false))
                return
            }
        }

        if (responseData?.user) {
            dispatch(setUser(responseData.user))
            dispatch(setSession(responseData.session))
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
