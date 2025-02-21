import { Dispatch } from '@reduxjs/toolkit'
import * as QueryParams from 'expo-auth-session/build/QueryParams'
import {
    setError,
    setLoading,
    setSession,
    setUser,
} from '@/src/redux/slices/authSlice'
import { supabase } from '@/src/utils/supabaseClient'

/**
 * Handles the deep link event and sets the user and session in the Redux store.
 * Sets the loading state while processing the deep link, but expects the caller to end the loading state.
 * @param event
 * @param dispatch
 */
export const handleDeepLink = async (
    event: { url: string },
    dispatch: Dispatch,
) => {
    if (!event.url.trim()) return

    dispatch(setLoading(true))

    // Extract tokens from URL
    const { params, errorCode } = QueryParams.getQueryParams(event.url)
    if (errorCode) {
        dispatch(setError(errorCode))
        return
    }

    const { access_token, refresh_token } = params
    if (!access_token || !refresh_token) {
        dispatch(setError('Missing authentication tokens'))
        return
    }

    // Set session in Supabase
    const { data, error } = await supabase.auth.setSession({
        access_token,
        refresh_token,
    })

    if (error) {
        dispatch(setError(error.message))
        return
    }

    if (data?.session) {
        dispatch(setUser(data.session.user))
        dispatch(setSession(data.session))
    }
}
