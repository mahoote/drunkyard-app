import { FontAwesome } from '@expo/vector-icons'
import React, { useState } from 'react'
import { View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import AppButton from '@/app/components/buttons/AppButton'
import NavButtons from '@/app/components/buttons/NavButtons'
import AppText from '@/app/components/text/AppText'
import AppTextInput from '@/app/components/text/AppTextInput'
import AppScrollView from '@/app/components/views/AppScrollView'
import AppView from '@/app/components/views/AppView'
import { signInWithMagicLink } from '@/src/redux/authActions'
import { RootState, AppDispatch } from '@/src/redux/store'

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
                <NavButtons
                    leftButton={<FontAwesome name="chevron-left" size={24} />}
                    leftButtonBack={true}
                />
                <View className="flex-1 justify-between">
                    <View className="items-center gap-8">
                        <View className="items-center gap-5 px-6">
                            <AppText
                                size="display-xs-regular"
                                className="text-center"
                            >
                                Bli spillvert – logg inn!
                            </AppText>
                            <AppText
                                size="text-md-regular"
                                className="text-center"
                            >
                                Ingen passord å huske – {'\n'}bare skriv inn
                                e-posten din, så sender vi deg en magisk lenke.{' '}
                                {'\n'}Klikk på den, så er du inne!
                            </AppText>
                        </View>
                    </View>
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

                                {error && (
                                    <AppText
                                        className="text-center"
                                        size="text-sm-regular"
                                    >
                                        {error}
                                    </AppText>
                                )}
                            </View>
                        )}
                    </View>
                    <AppText size="text-sm-regular" className="text-center">
                        Personvern & Vilkår
                    </AppText>
                </View>
            </AppScrollView>
        </AppView>
    )
}
