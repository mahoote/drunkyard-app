import { FontAwesome } from '@expo/vector-icons'
import React from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import AppButton from '@/app/components/buttons/AppButton'
import NavButtons from '@/app/components/buttons/NavButtons'
import SelectButton from '@/app/components/buttons/SelectButton'
import AppText from '@/app/components/text/AppText'
import AppView from '@/app/components/views/AppView'
import {
    setGameGenericPreferences,
    setPlayerPreferences,
} from '@/src/redux/slices/gameSlice'
import { AppRootState, useAppDispatch } from '@/src/redux/store'

const drunkOptions = [
    { label: 'Brisen', value: 0 },
    { label: 'Full', value: 1 },
    { label: 'Drita', value: 2 },
]

const activityOptions = [
    { label: 'Lav', value: 0 },
    { label: 'Middels', value: 1 },
    { label: 'Høy', value: 2 },
]

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
export default function host() {
    const dispatch = useAppDispatch()

    const { gameGenericPreferences, playerPreferences } = useSelector(
        (state: AppRootState) => state.game,
    )

    return (
        <AppView isRoot={true} className="h-full">
            <AppView className="items-center justify-between flex-1">
                <View className="items-center">
                    <NavButtons
                        leftButton={
                            <FontAwesome name="chevron-left" size={24} />
                        }
                        leftButtonBack={true}
                    />
                    <AppView className="gap-8">
                        <View className="gap-5">
                            <AppText
                                size="display-sm-regular"
                                className="text-center"
                            >
                                Martin's spill
                            </AppText>
                            <AppText className="text-center">
                                Dine preferanser
                            </AppText>
                        </View>
                        <View className="gap-5">
                            <View className="items-center gap-2">
                                <AppText size="text-lg-regular">
                                    Promillenivå
                                </AppText>
                                <SelectButton
                                    options={drunkOptions}
                                    buttonClassName="min-w-28"
                                    selectedOption={
                                        playerPreferences.drunkLevel
                                    }
                                    setSelectedOption={value =>
                                        dispatch(
                                            setPlayerPreferences({
                                                ...playerPreferences,
                                                drunkLevel: value as number,
                                            }),
                                        )
                                    }
                                />
                            </View>
                            <View className="items-center gap-2">
                                <AppText size="text-lg-regular">
                                    Aktivitetsnivå
                                </AppText>
                                <SelectButton
                                    options={activityOptions}
                                    buttonClassName="min-w-24"
                                    selectedOption={
                                        playerPreferences.activityLevel
                                    }
                                    setSelectedOption={value =>
                                        dispatch(
                                            setPlayerPreferences({
                                                ...playerPreferences,
                                                activityLevel: value as number,
                                            }),
                                        )
                                    }
                                />
                            </View>
                            <View className="items-center gap-2">
                                <AppText size="text-lg-regular">
                                    Spilleres kreativitet
                                </AppText>
                                <SelectButton
                                    options={playerCreativityOptions}
                                    selectedOption={
                                        gameGenericPreferences.isPlayerCreative
                                    }
                                    setSelectedOption={value =>
                                        dispatch(
                                            setGameGenericPreferences({
                                                ...gameGenericPreferences,
                                                isPlayerCreative:
                                                    value as boolean,
                                            }),
                                        )
                                    }
                                />
                            </View>
                            <View className="items-center gap-2 mt-8">
                                <AppText size="text-lg-regular">
                                    Spillelengde
                                </AppText>
                                {/* TODO: Use correct design */}
                                <SelectButton
                                    options={gameDurationMinutes}
                                    selectedOption={
                                        gameGenericPreferences.durationMinutes
                                    }
                                    setSelectedOption={value =>
                                        dispatch(
                                            setGameGenericPreferences({
                                                ...gameGenericPreferences,
                                                durationMinutes:
                                                    value as number,
                                            }),
                                        )
                                    }
                                />
                            </View>
                        </View>
                    </AppView>
                </View>
                <AppButton title="Start" />
            </AppView>
        </AppView>
    )
}
