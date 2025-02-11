import { useRouter } from 'expo-router'
import React from 'react'
import { View } from 'react-native'
import AppButton from '@/app/components/buttons/AppButton'
import NavButtons from '@/app/components/buttons/NavButtons'
import AppText from '@/app/components/text/AppText'
import AppTextInput from '@/app/components/text/AppTextInput'
import AppView from '@/app/components/views/AppView'

export default function Join() {
    const router = useRouter()

    return (
        <AppView isRoot={true} className="items-center">
            <AppView className="flex-1 items-center px-10">
                <NavButtons />
                <AppText size="display-sm-regular">Bli med i spill</AppText>
                <View className="w-full flex-1 justify-between mt-20 pb-10">
                    <View className="gap-4">
                        <View className="items-center gap-2">
                            <AppText>Spill som gjest</AppText>
                            <AppTextInput
                                placeholder="Skriv inn navn"
                                hasButton={true}
                                buttonAction={() => {}}
                                maxLength={16}
                                width="w-72"
                            />
                        </View>
                        <View className="items-center gap-2">
                            <AppText>Kode</AppText>
                            <AppTextInput
                                className="text-lg-semibold text-center tracking-[6px]"
                                keyboardType="number-pad"
                                placeholder="-"
                                width="w-40"
                                maxLength={6}
                            />
                        </View>
                    </View>
                    <View className="gap-10">
                        <View className="gap-2">
                            <AppText className="text-center">Bruker?</AppText>
                            <AppText
                                className="text-center"
                                size="text-md-regular"
                            >
                                Ønsker du å beholde premier og lagre prosessen
                                din, kan du{' '}
                                <AppText size="text-md-semibold">
                                    logge inn i appen!
                                </AppText>
                            </AppText>
                        </View>
                        <AppButton
                            title="Logg inn"
                            size="small"
                            color="primary-400"
                            onPress={() => router.navigate('/login')}
                        />
                    </View>
                </View>
            </AppView>
        </AppView>
    )
}
