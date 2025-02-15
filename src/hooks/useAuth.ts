import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { setUser, setSession, setLoading } from '@/src/redux/slices/authSlice'
import { AppRootState, useAppDispatch } from '@/src/redux/store'
import { AuthStatus } from '@/src/types/auth'
import { setupDeepLinking } from '@/src/utils/deepLinking'
import { supabase } from '@/src/utils/supabaseClient'

export function useAuth(): AuthStatus {
    const { session, loading } = useSelector(
        (state: AppRootState) => state.auth,
    )
    const dispatch = useAppDispatch()

    /**
     * Happens only once when the component is mounted,
     * since the dispatch is stable and doesn't change.
     */
    useEffect(() => {
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
        setupDeepLinking(dispatch)
    }, [dispatch])

    return { isAuthenticated: !!session, loading }
}
