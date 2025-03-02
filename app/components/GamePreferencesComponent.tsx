import React from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import SelectButton from '@/app/components/buttons/SelectButton'
import AppText from '@/app/components/text/AppText'
import { setPlayerPreferences } from '@/src/redux/slices/gameSlice'
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

/**
 * The common preferences for the host and guest.
 */
export default function GamePreferencesComponent() {
    const dispatch = useAppDispatch()

    const { playerPreferences } = useSelector(
        (state: AppRootState) => state.game,
    )

    return (
        <View className="gap-5">
            <View className="items-center gap-2">
                <AppText size="text-lg-regular">Promillenivå</AppText>
                <SelectButton
                    options={drunkOptions}
                    buttonClassName="min-w-28"
                    selectedOption={playerPreferences.drunkLevel}
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
                <AppText size="text-lg-regular">Aktivitetsnivå</AppText>
                <SelectButton
                    options={activityOptions}
                    buttonClassName="min-w-24"
                    selectedOption={playerPreferences.activityLevel}
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
        </View>
    )
}
