import { FontAwesome } from '@expo/vector-icons'
import React from 'react'
import { View } from 'react-native'
import NavButtons from '@/app/components/buttons/NavButtons'
import SelectButton from '@/app/components/buttons/SelectButton'
import AppText from '@/app/components/text/AppText'
import AppView from '@/app/components/views/AppView'

const drunkOptions = [
    { label: 'Brisen', value: 'tipsy' },
    { label: 'Full', value: 'drunk' },
    { label: 'Drita', value: 'wasted' },
]

const activityOptions = [
    { label: 'Lav', value: 'low' },
    { label: 'Middels', value: 'medium' },
    { label: 'Høy', value: 'high' },
]

const playerCreativityOptions = [
    { label: 'Av', value: 'off' },
    { label: 'På', value: 'on' },
]

export default function host() {
    return (
        <AppView isRoot={true}>
            <AppView className="items-center justify-between">
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
                        <View>
                            <View className="gap-5">
                                <View className="items-center gap-2">
                                    <AppText size="text-lg-regular">
                                        Promillenivå
                                    </AppText>
                                    <SelectButton
                                        options={drunkOptions}
                                        defaultOption={drunkOptions[1].value}
                                        buttonClassName="min-w-28"
                                    />
                                </View>
                                <View className="items-center gap-2">
                                    <AppText size="text-lg-regular">
                                        Aktivitetsnivå
                                    </AppText>
                                    <SelectButton
                                        options={activityOptions}
                                        defaultOption={activityOptions[1].value}
                                        buttonClassName="min-w-24"
                                    />
                                </View>
                                <View className="items-center gap-2">
                                    <AppText size="text-lg-regular">
                                        Spilleres kreativitet
                                    </AppText>
                                    <SelectButton
                                        options={playerCreativityOptions}
                                        defaultOption={
                                            playerCreativityOptions[1].value
                                        }
                                    />
                                </View>
                            </View>
                        </View>
                    </AppView>
                </View>
            </AppView>
        </AppView>
    )
}
