import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabaseClient'

export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const checkSession = async () => {
            const { data } = await supabase.auth.getSession()
            setIsAuthenticated(!!data?.session)
            setLoading(false)
        }

        checkSession()

        const { data: authListener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setIsAuthenticated(!!session)
            },
        )

        return () => authListener.subscription.unsubscribe()
    }, [])

    return { isAuthenticated, loading }
}
