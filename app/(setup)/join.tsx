import React from 'react'
import { TextInput, View } from 'react-native'
import AppText from '@/app/components/AppText'
import NavButtons from '@/app/components/buttons/NavButtons'
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
                            <View className="w-full">
                                <TextInput
                                    className="bg-foreground text-background rounded-full w-full px-4 py-3 text-lg-regular"
                                    placeholder="Skriv inn navn"
                                />
                            </View>
                        </View>
                        <View className="items-center gap-2">
                            <AppText>Kode</AppText>
                            <View className="w-40">
                                <TextInput
                                    className="bg-primary-300 text-background text-lg-semibold rounded-full w-full px-4 py-3 text-center tracking-[6px]"
                                    placeholder="-"
                                    keyboardType="number-pad"
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </AppView>
        </AppView>
    )
}
