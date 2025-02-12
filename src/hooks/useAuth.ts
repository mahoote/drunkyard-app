import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppRootState } from '@/src/redux/store'
import { setupDeepLinking } from '@/src/utils/deepLinking'

export function useAuth() {
    const { session, loading } = useSelector(
        (state: AppRootState) => state.auth,
    )
    const dispatch = useDispatch()

    useEffect(() => {
        setupDeepLinking(dispatch) // Ensure deep linking is processed first
    }, [dispatch])

    return { isAuthenticated: !!session, loading }
}
