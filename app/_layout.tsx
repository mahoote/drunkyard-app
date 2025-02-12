import '../global.css' // Ensure global styles are correctly imported
import { Stack, usePathname, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { AUTH_ROUTES } from '@/src/config/authConfig'
import { useAuth } from '@/src/hooks/useAuth'
import { store } from '@/src/redux/store'

export default function RootLayout() {
    return (
        <Provider store={store}>
            <MainApp />
        </Provider>
    )
}

function MainApp() {
    const router = useRouter()
    const pathname = usePathname()
    const { isAuthenticated, loading } = useAuth()

    const isAuthRoute = AUTH_ROUTES.includes(pathname)

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
