import React from 'react'
import { View } from 'react-native'
import AppButton from '@/app/components/buttons/AppButton'
import AppText from '@/app/components/text/AppText'
import AppTextInput from '@/app/components/text/AppTextInput'

interface LoginFormComponentProps {
    email: string
    password?: string
    setEmail: React.Dispatch<React.SetStateAction<string>>
    setPassword?: React.Dispatch<React.SetStateAction<string>>
    onPress: () => void
    loading: boolean
}

export default function LoginFormComponent({
    email,
    setEmail,
    onPress,
    loading,
    password,
    setPassword,
}: LoginFormComponentProps) {
    return (
        <>
            <View className="gap-5 pt-16">
                <View className="gap-2 items-center">
                    <AppText>E-post</AppText>
                    <AppTextInput
                        value={email}
                        onChangeText={setEmail}
                        placeholder="E-post"
                        keyboardType="email-address"
                    />
                    {password && (
                        <AppTextInput
                            value={password}
                            onChangeText={setPassword}
                            placeholder="Passord"
                            secureTextEntry={true}
                        />
                    )}
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
