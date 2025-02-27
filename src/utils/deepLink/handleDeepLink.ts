import * as QueryParams from 'expo-auth-session/build/QueryParams'
import { setPlayerSessionData } from '@/src/redux/actions/authActions'
import { setError, setLoading } from '@/src/redux/slices/authSlice'
import { AppDispatch } from '@/src/redux/store'
import { supabase } from '@/src/utils/supabaseClient'

/**
 * Validates the URL parameters and returns the access and refresh tokens.
 * We want to check the error description first, as it's more specific.
 * If there's no description, check for the error.
 * If there are no tokens, we can't proceed.
 * @param params
 * @param dispatch
 */
const validateUrlTokens = (
    params: Record<string, string>,
    dispatch: AppDispatch,
) => {
    const {
        access_token,
        refresh_token,
        error: urlError,
        error_description: urlErrorDescription,
    } = params

    if (urlErrorDescription) {
        dispatch(setError(urlErrorDescription))
        return { access_token: undefined, refresh_token: undefined }
    }

    if (urlError) {
        dispatch(setError(urlError))
        return { access_token: undefined, refresh_token: undefined }
    }

    return { access_token, refresh_token }
}

/**
 * Handles the deep link event and sets the user and session in the Redux store.
 * Sets the loading state while processing the deep link, but expects the caller to end the loading state.
 * @param event
 * @param dispatch
 */
export const handleDeepLink = async (
    event: { url: string },
    dispatch: AppDispatch,
) => {
    if (!event.url.trim()) return

    dispatch(setLoading({ loading: true }))

    // Extract tokens from URL
    const { params, errorCode } = QueryParams.getQueryParams(event.url)
    if (errorCode) {
        dispatch(setError(errorCode))
        return
    }

    const { access_token, refresh_token } = validateUrlTokens(params, dispatch)

    if (!access_token || !refresh_token) {
        return
    }

    // Set session in Supabase
    const { data, error: supabaseError } = await supabase.auth.setSession({
        access_token,
        refresh_token,
    })

    if (supabaseError) {
        dispatch(setError(supabaseError.message))
        return
    }

    if (data?.session) {
        dispatch(setPlayerSessionData(data.session))
    }
}
