import '../global.css' // Ensure global styles are correctly imported
import { Stack, usePathname, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { AUTH_ROUTES } from '@/src/config/authConfig'
import { useAuth } from '@/src/hooks/useAuth'
import { fetchAppBaseUrl } from '@/src/redux/slices/webUrlSlice'
import { store, useAppDispatch } from '@/src/redux/store'

export default function RootLayout() {
    return (
        <Provider store={store}>
            <MainApp />
        </Provider>
    )
}

export function MainApp() {
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

    return (
        <>
            <Stack
                screenOptions={{
                    headerShown: false,
                    animation: 'none',
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
