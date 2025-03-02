import {
    signInWithEmailAndPassword,
    signInWithMagicLink,
} from '@/src/redux/actions/authActions'
import { logout } from '@/src/redux/slices/authSlice'
import { AppDispatch } from '@/src/redux/store'
import { isProduction } from '@/src/utils/environmentUtils'

/**
 * Handles login based on environment.
 * @param dispatch
 * @param email
 * @param password
 */
export function handleLogin(
    dispatch: AppDispatch,
    email: string,
    password: string,
) {
    if (isProduction()) {
        dispatch(signInWithMagicLink(email))
    } else {
        dispatch(signInWithEmailAndPassword(email, password))
    }
}

/**
 * Resets the login state.
 * @param dispatch
 * @param setEmailSent
 * @param setCanRetry
 * @param setSecondsToRetry
 * @param retrySeconds
 */
export function handleLoginReset(
    dispatch: AppDispatch,
    setEmailSent: (value: boolean) => void,
    setCanRetry: (value: boolean) => void,
    setSecondsToRetry: (value: number) => void,
    retrySeconds: number,
) {
    setEmailSent(false)
    setCanRetry(false)
    setSecondsToRetry(retrySeconds)
    dispatch(logout())
}
