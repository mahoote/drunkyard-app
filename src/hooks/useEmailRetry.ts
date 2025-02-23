import React, { useEffect } from 'react'

interface UseEmailRetryProps {
    loading: boolean
    emailSent: boolean
    setEmailSent: React.Dispatch<React.SetStateAction<boolean>>
    secondsToRetry: number
    setSecondsToRetry: React.Dispatch<React.SetStateAction<number>>
    canRetry: boolean
    setCanRetry: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * Hook to retry the email login process.
 * If the email has been sent, and the loading is done, and the user can retry;
 * Set a timer to allow the user to retry the login process.
 * @param loading
 * @param emailSent
 * @param setEmailSent
 * @param secondsToRetry
 * @param setSecondsToRetry
 * @param canRetry
 * @param setCanRetry
 */
export function useEmailRetry({
    loading,
    emailSent,
    setEmailSent,
    secondsToRetry,
    setSecondsToRetry,
    canRetry,
    setCanRetry,
}: UseEmailRetryProps) {
    useEffect(() => {
        let interval: NodeJS.Timeout

        if (loading && !emailSent) {
            setEmailSent(true)
        }

        if (emailSent && !loading && secondsToRetry > 0) {
            interval = setInterval(() => {
                setSecondsToRetry(prev => prev - 1)
            }, 1000) // 1 second
        } else if (secondsToRetry <= 0) {
            setCanRetry(true)
        }

        return () => clearInterval(interval)
    }, [loading, emailSent, canRetry, secondsToRetry])
}
