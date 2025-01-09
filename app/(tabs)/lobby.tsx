import { FontAwesome } from '@expo/vector-icons'
import React from 'react'
import { FlatList, View } from 'react-native'
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
            <PlayerIcon name={item} />
        </View>
    )

    return (
        <View className={`${tabRootStyling} w-full items-center`}>
            <NavButtons
                leftButton={<FontAwesome name="chevron-left" size={24} />}
            />
            <AppText size="display-sm-regular">Martin's spill</AppText>
            <View className="my-4">
                <AppText size="text-sm-regular">TRYKK PÅ QR</AppText>
            </View>
            <View className="items-center gap-6" style={{ width: '90%' }}>
                <AppText size="text-xl-semibold">1/15</AppText>
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
    )
}
