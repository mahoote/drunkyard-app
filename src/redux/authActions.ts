import { makeRedirectUri } from 'expo-auth-session'
import { setLoading, setError, logout } from './authSlice'
import { AppDispatch } from './store'
import { supabase } from '@/src/utils/supabaseClient'

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

export const signOut = () => async (dispatch: AppDispatch) => {
    await supabase.auth.signOut()
    dispatch(logout())
}
