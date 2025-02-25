import { FontAwesome } from '@expo/vector-icons'
import LottieView from 'lottie-react-native'
import React, { useState } from 'react'
import { Linking, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import AppButton from '@/app/components/buttons/AppButton'
import NavButtons from '@/app/components/buttons/NavButtons'
import AppText from '@/app/components/text/AppText'
import AppTextInput from '@/app/components/text/AppTextInput'
import AppKeyboardAvoidingView from '@/app/components/views/AppKeyboardAvoidingView'
import AppView from '@/app/components/views/AppView'
import { useEmailRetry } from '@/src/hooks/useEmailRetry'
import { signInWithMagicLink } from '@/src/redux/actions/authActions'
import { logout } from '@/src/redux/slices/authSlice'
import { AppRootState, AppDispatch } from '@/src/redux/store'
import { isProduction } from '@/src/utils/environmentUtils'

const RETRY_SECONDS = 20

function LoginErrorComponent({
    error,
    onPress,
}: {
    error: string
    onPress: () => void
}) {
    return (
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
            <AppButton title="Prøv igjen" onPress={onPress} />
        </View>
    )
}

function EmailConfirmationComponent({
    canRetry,
    onPress,
    secondsToRetry,
}: {
    canRetry: boolean
    onPress: () => void
    secondsToRetry: number
}) {
    const openDevMail = () => {
        // TODO: Set real URL.
        Linking.openURL('http://192.168.0.106:54324/monitor')
    }

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
                    {!isProduction() && (
                        <TouchableOpacity onPress={openDevMail}>
                            <AppText
                                size="text-md-regular"
                                className="text-center underline"
                            >
                                DEV MAIL INBOX
                            </AppText>
                        </TouchableOpacity>
                    )}
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

function LoginFormComponent({
    value,
    onChangeText,
    onPress,
    loading,
}: {
    value: string
    onChangeText: (value: ((prevState: string) => string) | string) => void
    onPress: () => void
    loading: any
}) {
    return (
        <>
            <View className="gap-5 pt-16">
                <View className="gap-2 items-center">
                    <AppText>E-post</AppText>
                    <AppTextInput
                        value={value}
                        onChangeText={onChangeText}
                        placeholder="Epost"
                        keyboardType="email-address"
                    />
                </View>

                <AppButton
                    title="Logg Inn / Registrer"
                    size="small"
                    onPress={onPress}
                    loading={loading}
                />
            </View>
            <View className="py-8">
                <AppText size="text-md-regular" className="text-center">
                    Ingen passord å huske –{'\n'} bare skriv inn e-posten din,
                    så sender vi deg en magisk lenke.
                    {'\n\n'}Klikk på den, så er du inne!
                </AppText>
            </View>
        </>
    )
}

export default function Login() {
    const dispatch = useDispatch<AppDispatch>()

    const { loading, error } = useSelector((state: AppRootState) => state.auth)
    const [email, setEmail] = useState<string>('martin@teigen.dev')
    const [emailSent, setEmailSent] = useState<boolean>(false)

    const [canRetry, setCanRetry] = useState<boolean>(false)
    const [secondsToRetry, setSecondsToRetry] = useState(RETRY_SECONDS)

    const handleLogin = () => {
        dispatch(signInWithMagicLink(email))
    }

    const handleReset = () => {
        setEmailSent(false)
        setCanRetry(false)
        setSecondsToRetry(RETRY_SECONDS)
        dispatch(logout())
    }

    useEmailRetry({
        loading,
        emailSent,
        setEmailSent,
        secondsToRetry,
        setSecondsToRetry,
        canRetry,
        setCanRetry,
    })

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
                        <View className="items-center gap-5">
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
                                <LoginErrorComponent
                                    error={error}
                                    onPress={handleReset}
                                />
                            ) : emailSent && !loading ? (
                                <EmailConfirmationComponent
                                    canRetry={canRetry}
                                    onPress={handleReset}
                                    secondsToRetry={secondsToRetry}
                                />
                            ) : (
                                <LoginFormComponent
                                    value={email}
                                    onChangeText={setEmail}
                                    onPress={handleLogin}
                                    loading={loading}
                                />
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
