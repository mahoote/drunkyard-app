import { Stack, usePathname, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect } from 'react'
import { useAuth } from '@/src/hooks/useAuth'
import { fetchWebAppUrl } from '@/src/redux/slices/webUrlSlice'
import { useAppDispatch } from '@/src/redux/store'
import { isProtectedRoute } from '@/src/utils/authUtils'
import { setupDeepLinking } from '@/src/utils/deepLinking'

export function MainApp() {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const pathname = usePathname()
    const { isAuthenticated, loading } = useAuth()

    useEffect(() => {
        dispatch(fetchWebAppUrl())
        return setupDeepLinking(dispatch)
    }, [dispatch])

    // Redirect if user is not authenticated
    useEffect(() => {
        if (!loading && isProtectedRoute(pathname) && !isAuthenticated) {
            router.replace('/login')
        }
    }, [pathname, isAuthenticated, loading])

    return (
        <>
            <Stack
                screenOptions={{
                    headerShown: false,
                    animation: 'ios_from_right',
                    animationDuration: 250,
                    contentStyle: {
                        backgroundColor: '#030323',
                        alignItems: 'center',
                    },
                }}
            />
            <StatusBar style="light" />
        </>
    )
}
