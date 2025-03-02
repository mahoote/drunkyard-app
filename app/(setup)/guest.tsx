import { FontAwesome } from '@expo/vector-icons'
import React from 'react'
import { View } from 'react-native'
import AppButton from '@/app/components/buttons/AppButton'
import NavButtons from '@/app/components/buttons/NavButtons'
import GamePreferencesComponent from '@/app/components/GamePreferencesComponent'
import AppPageLayout from '@/app/components/text/AppPageLayout'
import AppText from '@/app/components/text/AppText'

export default function Guest() {
    return (
        <AppPageLayout
            title="Martin's spill"
            subtitle="Dine preferanser"
            navComponent={
                <NavButtons
                    leftButton={<FontAwesome name="chevron-left" size={24} />}
                    leftButtonBack={true}
                />
            }
            footerComponent={<AppButton title="BEKREFT" />}
        >
            <View className="flex-1">
                <View className="gap-5">
                    <GamePreferencesComponent />
                </View>
                <View className="flex-1 justify-center">
                    <AppText
                        size="text-md-regular"
                        color="text-primary-400"
                        className="text-center"
                    >
                        Vi finner spill basert på alles preferanser.
                    </AppText>
                </View>
            </View>
        </AppPageLayout>
    )
}
