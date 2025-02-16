import { usePathname, useRouter } from 'expo-router'
import { useEffect } from 'react'
import { AUTH_ROUTES } from '@/src/config/authConfig'
import { useAuth } from '@/src/hooks/useAuth'
import { fetchAppBaseUrl } from '@/src/redux/slices/webUrlSlice'
import { useAppDispatch } from '@/src/redux/store'

/**
 * Gets the app base URL on mount.
 * Redirects to /login if not authenticated and trying to access an auth route.
 */
export function useAppLogic() {
    const dispatch = useAppDispatch()

    const router = useRouter()
    const pathname = usePathname()
    const { isAuthenticated, loading } = useAuth()

    const isAuthRoute = AUTH_ROUTES.includes(pathname)

    useEffect(() => {
        dispatch(fetchAppBaseUrl())
    }, [dispatch])

    useEffect(() => {
        if (!loading && isAuthRoute && !isAuthenticated) {
            router.replace('/login') // Redirect only if deep linking and auth are both done
        }
    }, [pathname, isAuthenticated, loading])
}
