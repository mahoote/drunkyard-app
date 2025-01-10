import { FontAwesome } from '@expo/vector-icons'
import React from 'react'
import { FlatList, View } from 'react-native'
import AppButton from '@/app/components/AppButton'
import AppText from '@/app/components/AppText'
import NavButtons from '@/app/components/NavButtons'
import PlayerIcon from '@/app/components/PlayerIcon'
import { tabRootStyling } from '@/app/utils/tabRootStyling'

const players = [
    'Martin',
    'Erik',
    'Morten',
    'Jonas',
    'Karl',
    'Marius',
    'Andreas',
]

export default function Lobby() {
    const renderItem = ({ item }: { item: string }) => (
        <View className="m-4">
            <PlayerIcon name={item} size="medium" />
        </View>
    )

    return (
        <View className={`${tabRootStyling} items-center justify-between`}>
            <View className="w-full items-center">
                <NavButtons
                    leftButton={<FontAwesome name="chevron-left" size={24} />}
                />
                <AppText size="display-sm-regular">Martin's spill</AppText>
                <View className="my-4 items-center gap-2">
                    <View className="py-6 bg-foreground w-14 h-14 rounded-lg"></View>
                    <AppText size="text-sm-regular">TRYKK PÅ QR</AppText>
                </View>
                <View className="items-center w-full mt-6">
                    <AppText size="text-xl-semibold">
                        {players.length} / 15
                    </AppText>
                    <FlatList
                        className="w-full"
                        data={players}
                        renderItem={renderItem}
                        keyExtractor={item => item}
                        numColumns={3}
                        columnWrapperStyle={{
                            justifyContent: 'space-evenly',
                        }}
                        bounces={false}
                    />
                </View>
            </View>
            <View className="w-full mb-12 ios:mb-16">
                <AppButton title="NESTE" />
            </View>
        </View>
    )
}
