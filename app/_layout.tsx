import '../global.css' // Ensure global styles are correctly imported
import { Stack, usePathname, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { useAuth } from '@/src/hooks/useAuth'
import { fetchWebAppUrl } from '@/src/redux/slices/webUrlSlice'
import { store, useAppDispatch } from '@/src/redux/store'
import { isProtectedRoute } from '@/src/utils/authUtils'
import { setupDeepLinking } from '@/src/utils/deepLinking'

export default function RootLayout() {
    return (
        <Provider store={store}>
            <MainApp />
        </Provider>
    )
}

function MainApp() {
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
