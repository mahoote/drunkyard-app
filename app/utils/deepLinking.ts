import { Dispatch } from '@reduxjs/toolkit'
import * as QueryParams from 'expo-auth-session/build/QueryParams'
import * as Linking from 'expo-linking'
import { setUser, setSession, setLoading, setError } from '../redux/authSlice'
import { supabase } from './supabaseClient'

export const handleDeepLink = async (
    event: { url: string },
    dispatch: Dispatch,
) => {
    if (!event?.url) return

    dispatch(setLoading(true))

    // Extract tokens from URL
    const { params, errorCode } = QueryParams.getQueryParams(event.url)
    if (errorCode) {
        dispatch(setError(errorCode))
        dispatch(setLoading(false))
        return
    }

    const { access_token, refresh_token } = params

    if (!access_token || !refresh_token) {
        dispatch(setError('Missing authentication tokens'))
        dispatch(setLoading(false))
        return
    }

    // Set the session in Supabase
    const { data, error } = await supabase.auth.setSession({
        access_token,
        refresh_token,
    })

    if (error) {
        dispatch(setError(error.message))
        dispatch(setLoading(false))
        return
    }

    if (data?.session) {
        dispatch(setUser(data.session.user))
        dispatch(setSession(data.session))
    }

    dispatch(setLoading(false))
}

export const setupDeepLinking = (dispatch: Dispatch) => {
    const subscription = Linking.addEventListener('url', event =>
        handleDeepLink(event, dispatch),
    )

    return () => subscription.remove() // Cleanup function
}
