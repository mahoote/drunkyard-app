import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { setPlayerSessionData } from '@/src/redux/actions/authActions'
import { setLoading } from '@/src/redux/slices/authSlice'
import { AppRootState, useAppDispatch } from '@/src/redux/store'
import { AuthStatus } from '@/src/types/auth'
import { setupDeepLink } from '@/src/utils/deepLink/setupDeepLink'
import { isProduction } from '@/src/utils/environmentUtils'
import { isDevice, isWeb } from '@/src/utils/platformUtils'
import { supabase } from '@/src/utils/supabaseClient'

export function useAuth(): AuthStatus {
    const { session, loading } = useSelector(
        (state: AppRootState) => state.auth,
    )
    const dispatch = useAppDispatch()

    /**
     * Happens only on device, as web version doesn't allow auth.
     */
    useEffect(() => {
        if (isDevice()) {
            const restoreSessionFromSupabase = async () => {
                dispatch(setLoading({ loading: true }))
                const { data } = await supabase.auth.getSession()
                if (data?.session) {
                    dispatch(setPlayerSessionData(data.session))
                }
                dispatch(setLoading({ loading: false }))
            }

            restoreSessionFromSupabase()

            // Only use deep link on production.
            if (isProduction()) {
                setupDeepLink(dispatch)
            }
        } else {
            dispatch(setLoading({ loading: false }))
        }
    }, [dispatch])

    return { isAuthenticated: isWeb() ? false : !!session, loading }
}
