import * as Linking from 'expo-linking'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setError, setSession, setUser } from '@/app/redux/authSlice'
import { AppDispatch } from '@/app/redux/store'
import { supabase } from '@/app/utils/supabaseClient'

const handleDeepLink = async (url: string, dispatch: AppDispatch) => {
    if (!url) return

    try {
        const { data, error } = await supabase.auth.exchangeCodeForSession(url)

        if (error) {
            console.error('Deep Link Error:', error.message)
            dispatch(setError(error.message))
            return
        }

        if (data.session) {
            dispatch(setUser(data.session.user))
            dispatch(setSession(data.session))
        }
    } catch (err) {
        console.error('Unexpected Error:', err)
    }
}

const useDeepLinking = () => {
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        const subscription = Linking.addEventListener('url', event => {
            if (event.url) {
                handleDeepLink(event.url, dispatch)
            }
        })

        return () => {
            subscription.remove()
        }
    }, [dispatch])
}

export default useDeepLinking
