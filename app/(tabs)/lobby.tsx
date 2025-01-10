import { FontAwesome } from '@expo/vector-icons'
import React, { useState } from 'react'
import { FlatList, Pressable, View } from 'react-native'
import AppButton from '@/app/components/AppButton'
import AppText from '@/app/components/AppText'
import NavButtons from '@/app/components/NavButtons'
import Overlay from '@/app/components/Overlay'
import PlayerIcon from '@/app/components/PlayerIcon'
import QrComponent from '@/app/components/QrComponent'
import { tabRootStyling } from '@/app/utils/tabRootStyling'

const players = [
    'Martin',
    'Erik',
    'Morten',
    'Jonas',
    /* 'Karl',
    'Marius',
    'Andreas',*/
]

export default function Lobby() {
    const [isOverlayVisible, setOverlayVisible] = useState(false)

    const toggleOverlay = () => setOverlayVisible(prev => !prev)

    const playerAlone = players.length <= 1

    const renderItem = ({ item }: { item: string }) => (
        <View className="m-4">
            <PlayerIcon name={item} size="medium" />
        </View>
    )

    return (
        <>
            <View className={`${tabRootStyling} items-center justify-between`}>
                <View className="w-full items-center">
                    <NavButtons
                        leftButton={
                            <FontAwesome name="chevron-left" size={24} />
                        }
                        leftButtonBack={true}
                    />
                    <AppText size="display-sm-regular">Martin's spill</AppText>
                    <Pressable
                        className="my-4 items-center"
                        onPress={toggleOverlay}
                    >
                        <FontAwesome name="qrcode" size={64} color="#E8E8EA" />
                        <AppText size="text-sm-regular">TRYKK PÅ QR</AppText>
                    </Pressable>
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
                    {playerAlone && (
                        <AppText
                            className="text-center mt-10"
                            size="text-md-regular"
                            color="text-primary-300"
                        >
                            Du er alene i rommet.{'\n'}
                            Trykk på QR-koden for å invitere folk.
                        </AppText>
                    )}
                </View>
                <View className="w-full mb-12 ios:mb-16">
                    <AppButton title="NESTE" />
                </View>
            </View>
            <Overlay
                isVisible={isOverlayVisible}
                toggleVisibility={toggleOverlay}
            >
                <QrComponent />
            </Overlay>
        </>
    )
}
