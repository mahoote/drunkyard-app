import { useRouter } from 'expo-router'
import LottieView from 'lottie-react-native'
import React, { useEffect } from 'react'
import { TouchableOpacity, View } from 'react-native'
import AppText from '@/app/components/text/AppText'
import { isProduction } from '@/src/utils/environmentUtils'

export default function EmailConfirmationComponent({
    canRetry,
    onPress,
    secondsToRetry,
}: {
    canRetry: boolean
    onPress: () => void
    secondsToRetry: number
}) {
    const router = useRouter()

    /**
     * Redirect to profile page after 2 seconds if not in production
     */
    useEffect(() => {
        if (!isProduction()) {
            setTimeout(() => {
                router.replace('/profile')
            }, 2000)
        }
    }, [])

    return (
        <>
            <View className="items-center">
                <View className={`w-[200] h-[200]`}>
                    <LottieView
                        source={require('@/assets/animations/email-received.json')}
                        autoPlay
                        loop
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                    />
                </View>
                <View className="items-center gap-5">
                    <AppText>Sjekk inboksen din!</AppText>
                    <AppText size="text-md-regular" className="text-center">
                        Klikk på lenken, så er du inne!
                    </AppText>
                </View>
            </View>
            <View className="py-8">
                <AppText
                    size="text-md-regular"
                    className="text-center"
                    color="text-primary-400"
                >
                    Fikk ikke mail?
                </AppText>

                {canRetry ? (
                    <TouchableOpacity onPress={onPress}>
                        <AppText
                            size="text-md-regular"
                            className="text-center underline"
                            color="text-primary-400"
                        >
                            Prøv på nytt
                        </AppText>
                    </TouchableOpacity>
                ) : (
                    <AppText
                        size="text-md-regular"
                        className="text-center"
                        color="text-primary-400"
                    >
                        Prøv på nytt om {secondsToRetry}{' '}
                        {secondsToRetry === 1 ? 'sekund' : 'sekunder'}
                    </AppText>
                )}
            </View>
        </>
    )
}
