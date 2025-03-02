import { FontAwesome } from '@expo/vector-icons'
import React, { useState } from 'react'
import { View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import EmailConfirmationComponent from '@/app/(auth)/components/emailConfirmationComponent'
import LoginErrorComponent from '@/app/(auth)/components/loginErrorComponent'
import LoginFormComponent from '@/app/(auth)/components/loginFormComponent'
import NavButtons from '@/app/components/buttons/NavButtons'
import AppText from '@/app/components/text/AppText'
import AppKeyboardAvoidingView from '@/app/components/views/AppKeyboardAvoidingView'
import AppView from '@/app/components/views/AppView'
import { useEmailRetry } from '@/src/hooks/useEmailRetry'

import { AppDispatch, AppRootState } from '@/src/redux/store'
import { isProduction } from '@/src/utils/environmentUtils'
import { handleLogin, handleLoginReset } from '@/src/utils/loginUtils'

const RETRY_SECONDS = 20

export default function Login() {
    const dispatch = useDispatch<AppDispatch>()

    const { loading, error } = useSelector((state: AppRootState) => state.auth)
    const [email, setEmail] = useState<string>('admin@email.com')
    const [password, setPassword] = useState<string>('qwer1234')
    const [emailSent, setEmailSent] = useState<boolean>(false)

    const [canRetry, setCanRetry] = useState<boolean>(false)
    const [secondsToRetry, setSecondsToRetry] = useState(RETRY_SECONDS)

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
                                    onPress={() =>
                                        handleLoginReset(
                                            dispatch,
                                            setEmailSent,
                                            setCanRetry,
                                            setSecondsToRetry,
                                            RETRY_SECONDS,
                                        )
                                    }
                                />
                            ) : emailSent && !loading ? (
                                <EmailConfirmationComponent
                                    canRetry={canRetry}
                                    onPress={() =>
                                        handleLoginReset(
                                            dispatch,
                                            setEmailSent,
                                            setCanRetry,
                                            setSecondsToRetry,
                                            RETRY_SECONDS,
                                        )
                                    }
                                    secondsToRetry={secondsToRetry}
                                />
                            ) : (
                                <LoginFormComponent
                                    email={email}
                                    setEmail={setEmail}
                                    onPress={() =>
                                        handleLogin(dispatch, email, password)
                                    }
                                    loading={loading}
                                    password={
                                        isProduction() ? undefined : password
                                    }
                                    setPassword={
                                        isProduction() ? undefined : setPassword
                                    }
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
