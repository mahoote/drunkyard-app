import { FontAwesome } from '@expo/vector-icons'
import LottieView from 'lottie-react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import AppButton from '@/app/components/buttons/AppButton'
import NavButtons from '@/app/components/buttons/NavButtons'
import AppText from '@/app/components/text/AppText'
import AppTextInput from '@/app/components/text/AppTextInput'
import AppKeyboardAvoidingView from '@/app/components/views/AppKeyboardAvoidingView'
import AppView from '@/app/components/views/AppView'
import { signInWithMagicLink } from '@/src/redux/actions/authActions'
import { logout } from '@/src/redux/slices/authSlice'
import { AppRootState, AppDispatch } from '@/src/redux/store'

export default function Login() {
    const dispatch = useDispatch<AppDispatch>()

    const { loading, error } = useSelector((state: AppRootState) => state.auth)
    const [email, setEmail] = useState<string>('martin@teigen.dev')
    const [emailSent, setEmailSent] = useState<boolean>(false)

    const [canRetry, setCanRetry] = useState<boolean>(false)
    const [secondsToRetry, setSecondsToRetry] = useState(20)

    const handleLogin = () => {
        dispatch(signInWithMagicLink(email))
    }

    const handleReset = () => {
        setEmailSent(false)
        setCanRetry(false)
        setSecondsToRetry(20)
        dispatch(logout())
    }

    useEffect(() => {
        let interval: NodeJS.Timeout

        if (loading && !emailSent) {
            setEmailSent(true)
        }

        // If the email has been sent, and the loading is done, and the user can retry
        // Set a timer to allow the user to retry the login process.
        if (emailSent && !loading && secondsToRetry > 0) {
            interval = setInterval(() => {
                setSecondsToRetry(prev => prev - 1)
            }, 1000) // Update every second
        } else if (secondsToRetry <= 0) {
            setCanRetry(true)
        }

        // Cleanup the interval when the component unmounts or when the timer stops
        return () => clearInterval(interval)
    }, [loading, emailSent, canRetry, secondsToRetry])

    return (
        <AppView isRoot={true}>
            <AppKeyboardAvoidingView>
                <AppView className="flex-1 items-center">
                    <NavButtons
                        leftButton={
                            <FontAwesome name="chevron-left" size={24} />
                        }
                        leftButtonBack={true}
                    />
                    <AppView className="flex-auto justify-between">
                        <View className="items-center gap-5 pb-16">
                            <AppText
                                size="display-sm-regular"
                                className="text-center"
                            >
                                Bli spillvert
                            </AppText>
                            <AppText>LOGG INN</AppText>
                        </View>
                        <View className="flex-1 justify-between">
                            {error ? (
                                <View className="items-center justify-evenly flex-1">
                                    <View className="gap-5">
                                        <AppText className="text-center">
                                            Det oppstod et problem.
                                        </AppText>
                                        <AppText
                                            size="text-md-semibold"
                                            color="text-primary-400"
                                            className="text-center"
                                        >
                                            ({error})
                                        </AppText>
                                    </View>
                                    <AppButton
                                        title="Prøv igjen"
                                        onPress={handleReset}
                                    />
                                </View>
                            ) : emailSent && !loading ? (
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
                                            <AppText>
                                                Sjekk inboksen din!
                                            </AppText>
                                            <AppText
                                                size="text-md-regular"
                                                className="text-center"
                                            >
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
                                            <TouchableOpacity
                                                onPress={handleReset}
                                            >
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
                                                {secondsToRetry === 1
                                                    ? 'sekund'
                                                    : 'sekunder'}
                                            </AppText>
                                        )}
                                    </View>
                                </>
                            ) : (
                                <>
                                    <View className="gap-5">
                                        <View className="gap-2 items-center">
                                            <AppText>Epost</AppText>
                                            <AppTextInput
                                                value={email}
                                                onChangeText={setEmail}
                                                placeholder="Epost"
                                                keyboardType="email-address"
                                            />
                                        </View>

                                        <AppButton
                                            title="Logg Inn / Registrer"
                                            size="small"
                                            onPress={handleLogin}
                                            loading={loading}
                                        />
                                    </View>
                                    <View className="py-8">
                                        <AppText
                                            size="text-md-regular"
                                            className="text-center"
                                        >
                                            Ingen passord å huske –{'\n'} bare
                                            skriv inn e-posten din, så sender vi
                                            deg en magisk lenke.
                                            {'\n\n'}Klikk på den, så er du inne!
                                        </AppText>
                                    </View>
                                </>
                            )}

                            <AppText
                                size="text-sm-regular"
                                className="text-center"
                            >
                                Personvern & Vilkår
                            </AppText>
                        </View>
                    </AppView>
                </AppView>
            </AppKeyboardAvoidingView>
        </AppView>
    )
}
