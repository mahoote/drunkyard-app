import { FontAwesome } from '@expo/vector-icons'
import React, { useState } from 'react'
import { View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import AppButton from '@/app/components/buttons/AppButton'
import AppText from '@/app/components/text/AppText'
import AppTextInput from '@/app/components/text/AppTextInput'
import AppScrollView from '@/app/components/views/AppScrollView'
import AppView from '@/app/components/views/AppView'
import { signInWithMagicLink } from '@/app/redux/authActions'
import { AppDispatch } from '@/app/redux/store'

export default function Login() {
    const [email, setEmail] = useState<string>('martin@teigen.dev')
    const { user, loading, error } = useSelector(
        (state: RootState) => state.auth,
    )
    const dispatch = useDispatch<AppDispatch>()

    return (
        <AppView
            isRoot={true}
            isKeyboardAvoiding={true}
            className="items-center justify-center"
        >
            <AppScrollView
                bounces={false}
                contentContainerClassName="flex-1 min-h-[500px]"
            >
                <View className="flex-1 justify-evenly">
                    <View className="items-center gap-8">
                        <AppText>
                            <FontAwesome name="lock" size={110} />
                        </AppText>
                        <View className="items-center gap-5 px-6">
                            <AppText
                                size="display-xs-regular"
                                className="text-center"
                            >
                                Logg inn for å være spillvert
                            </AppText>
                            <AppText
                                size="text-md-regular"
                                className="text-center"
                            >
                                Vi sender deg en epost med en lenke for å logge
                                inn!
                            </AppText>
                        </View>
                    </View>
                    {error && (
                        <AppText className="text-center" size="text-sm-regular">
                            {error}
                        </AppText>
                    )}
                    <View className="gap-10">
                        {user ? (
                            <AppText>Logged in as {user.email}</AppText>
                        ) : (
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

                                {loading ? (
                                    <AppText className="text-center">
                                        Loading...
                                    </AppText>
                                ) : (
                                    <AppButton
                                        title="Logg Inn / Registrer"
                                        size="small"
                                        onPress={() =>
                                            dispatch(signInWithMagicLink(email))
                                        }
                                    />
                                )}
                            </View>
                        )}
                        <AppText size="text-sm-regular" className="text-center">
                            Personvern & Vilkår
                        </AppText>
                    </View>
                </View>
            </AppScrollView>
        </AppView>
    )
}
