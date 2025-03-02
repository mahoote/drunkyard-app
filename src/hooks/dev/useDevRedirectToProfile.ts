import { useRouter } from 'expo-router'
import { useEffect } from 'react'
import { isProduction } from '@/src/utils/environmentUtils'

/**
 * Redirect to profile page after 2 seconds if not in production
 */
export function useDevRedirectToProfile() {
    const router = useRouter()

    useEffect(() => {
        if (!isProduction()) {
            setTimeout(() => {
                router.replace('/profile')
            }, 2000)
        }
    }, [])
}
