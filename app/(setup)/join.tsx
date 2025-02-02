import React from 'react'
import { View } from 'react-native'
import NavButtons from '@/app/components/buttons/NavButtons'
import AppText from '@/app/components/text/AppText'
import AppTextInput from '@/app/components/text/AppTextInput'
import AppView from '@/app/components/views/AppView'

export default function Join() {
    return (
        <AppView isRoot={true} className="items-center">
            <AppView className="items-center px-10">
                <NavButtons />
                <AppText size="display-sm-regular">Bli med i spill</AppText>
                <View className="w-full mt-20">
                    <View className="gap-4">
                        <View className="items-center gap-2">
                            <AppText>Spill som gjest</AppText>
                            <AppTextInput placeholder="Skriv inn navn" />
                        </View>
                        <View className="items-center gap-2">
                            <AppText>Kode</AppText>
                            <AppTextInput
                                className="bg-primary-300 text-lg-semibold text-center tracking-[6px]"
                                keyboardType="number-pad"
                                placeholder="-"
                                width={40}
                                maxLength={6}
                            />
                        </View>
                    </View>
                </View>
            </AppView>
        </AppView>
    )
}
