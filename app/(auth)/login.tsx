import { FontAwesome } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Alert, View } from 'react-native'
import { useDispatch } from 'react-redux'
import AppButton from '@/app/components/buttons/AppButton'
import AppText from '@/app/components/text/AppText'
import AppTextInput from '@/app/components/text/AppTextInput'
import AppScrollView from '@/app/components/views/AppScrollView'
import AppView from '@/app/components/views/AppView'
import { setLoading } from '@/app/redux/authSlice'
import { supabase } from '@/lib/supabaseClient'

export default function Login() {
    const [email, setEmail] = useState<string>('')
    const dispatch = useDispatch()

    const handleMagicLink = async () => {
        dispatch(setLoading(true))
        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: { emailRedirectTo: 'exp://127.0.0.1:19000' },
        })

        if (error) {
            Alert.alert('Error', error.message)
        } else {
            Alert.alert(
                'Check your email',
                'We have sent you a magic link. Click it to log in.',
            )
        }

        dispatch(setLoading(false))
    }

    return (
        <AppView
            isRoot={true}
            isKeyboardAvoiding={true}
            className="items-center justify-center"
        >
            <AppScrollView
                bounces={false}
                contentContainerClassName="flex-1 min-h-[700px]"
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
                    <View className="gap-10">
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
                            />
                        </View>
                        <AppText size="text-sm-regular" className="text-center">
                            Personvern & Vilkår
                        </AppText>
                    </View>
                </View>
            </AppScrollView>
        </AppView>
    )
}
