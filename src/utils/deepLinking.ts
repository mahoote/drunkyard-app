import { Dispatch } from '@reduxjs/toolkit'
import * as QueryParams from 'expo-auth-session/build/QueryParams'
import * as Linking from 'expo-linking'
import {
    setUser,
    setSession,
    setLoading,
    setError,
} from '@/src/redux/slices/authSlice'
import { supabase } from '@/src/utils/supabaseClient'

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

export const setupDeepLinking = async (dispatch: Dispatch) => {
    const initialUrl = await Linking.getInitialURL()
    if (initialUrl) {
        await handleDeepLink({ url: initialUrl }, dispatch)
    }

    // Listen for new deep links
    Linking.addEventListener('url', event => handleDeepLink(event, dispatch))
}
