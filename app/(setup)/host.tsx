import { FontAwesome } from '@expo/vector-icons'
import React from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import AppButton from '@/app/components/buttons/AppButton'
import NavButtons from '@/app/components/buttons/NavButtons'
import SelectButton from '@/app/components/buttons/SelectButton'
import GamePreferencesComponent from '@/app/components/GamePreferencesComponent'
import { SignOutButtonComponent } from '@/app/components/SignOutButtonComponent'
import AppPageLayout from '@/app/components/text/AppPageLayout'
import AppText from '@/app/components/text/AppText'
import AppView from '@/app/components/views/AppView'
import { setGameGenericPreferences } from '@/src/redux/slices/gameSlice'
import { AppRootState, useAppDispatch } from '@/src/redux/store'

const playerCreativityOptions = [
    { label: 'Av', value: false },
    { label: 'På', value: true },
]

const gameDurationMinutes = [
    { label: '10 min', value: 10 },
    { label: '30 min', value: 30 },
    { label: '1 time', value: 60 },
]

/**
 * The host page where the host will decide their preferences and also
 * the more generic game preferences.
 */
export default function Host() {
    const dispatch = useAppDispatch()

    const { room, gameGenericPreferences } = useSelector(
        (state: AppRootState) => state.game,
    )

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
            footerComponent={<AppButton title="START" />}
        >
            <View className="gap-5">
                <GamePreferencesComponent />
                <View className="items-center gap-2">
                    <AppText size="text-lg-regular">
                        Spilleres kreativitet
                    </AppText>
                    <SelectButton
                        options={playerCreativityOptions}
                        selectedOption={gameGenericPreferences.isPlayerCreative}
                        setSelectedOption={value =>
                            dispatch(
                                setGameGenericPreferences({
                                    ...gameGenericPreferences,
                                    isPlayerCreative: value as boolean,
                                }),
                            )
                        }
                    />
                </View>
                <View className="items-center gap-2 mt-8">
                    <AppText size="text-lg-regular">Spillelengde</AppText>
                    <SelectButton
                        options={gameDurationMinutes}
                        selectedOption={gameGenericPreferences.durationMinutes}
                        setSelectedOption={value =>
                            dispatch(
                                setGameGenericPreferences({
                                    ...gameGenericPreferences,
                                    durationMinutes: value as number,
                                }),
                            )
                        }
                    />
                </View>
            </View>
        </AppPageLayout>
    )
}
