import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { setUser, setSession, setLoading } from '@/src/redux/slices/authSlice'
import { AppRootState, useAppDispatch } from '@/src/redux/store'
import { AuthStatus } from '@/src/types/auth'
import { setupDeepLink } from '@/src/utils/deepLink/setupDeepLink'
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
                dispatch(setLoading(true))
                const { data } = await supabase.auth.getSession()
                if (data?.session) {
                    dispatch(setUser(data.session.user))
                    dispatch(setSession(data.session))
                }
                dispatch(setLoading(false))
            }

            restoreSessionFromSupabase()
            setupDeepLink(dispatch)
        }
    }, [dispatch])

    return { isAuthenticated: isWeb() ? false : !!session, loading }
}
