import { FontAwesome } from '@expo/vector-icons'
import React from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import AppButton from '@/app/components/buttons/AppButton'
import NavButtons from '@/app/components/buttons/NavButtons'
import GamePreferencesComponent from '@/app/components/GamePreferencesComponent'
import { SignOutButtonComponent } from '@/app/components/SignOutButtonComponent'
import AppPageLayout from '@/app/components/text/AppPageLayout'
import AppText from '@/app/components/text/AppText'
import AppView from '@/app/components/views/AppView'
import { AppRootState } from '@/src/redux/store'

/**
 * The guest page where the guest will decide their preferences.
 * @constructor
 */
export default function Guest() {
    const { room } = useSelector((state: AppRootState) => state.game)

    if (!room) {
        return (
            <AppView className="flex-1 items-center justify-center gap-5">
                <AppText>Det oppstod en feil.</AppText>
                <SignOutButtonComponent />
            </AppView>
        )
    }

    return (
        <AppPageLayout
            title={room.name}
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
