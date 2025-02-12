import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUser, setSession, setLoading } from '@/src/redux/slices/authSlice'
import { AppRootState } from '@/src/redux/store'
import { setupDeepLinking } from '@/src/utils/deepLinking'
import { supabase } from '@/src/utils/supabaseClient'

export function useAuth() {
    const { session, loading } = useSelector(
        (state: AppRootState) => state.auth,
    )
    const dispatch = useDispatch()

    useEffect(() => {
        // Restore user session from Supabase
        const restoreSession = async () => {
            dispatch(setLoading(true))
            const { data } = await supabase.auth.getSession()
            if (data?.session) {
                dispatch(setUser(data.session.user))
                dispatch(setSession(data.session))
            }
            dispatch(setLoading(false))
        }

        restoreSession()

        // Setup deep linking
        setupDeepLinking(dispatch)
    }, [dispatch])

    return { isAuthenticated: !!session, loading }
}
