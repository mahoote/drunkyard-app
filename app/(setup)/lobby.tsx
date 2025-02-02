import { FontAwesome } from '@expo/vector-icons'
import React, { useState } from 'react'
import { FlatList, Pressable, View } from 'react-native'
import AppButton from '@/app/components/buttons/AppButton'
import NavButtons from '@/app/components/buttons/NavButtons'
import Overlay from '@/app/components/Overlay'
import PlayerIcon from '@/app/components/PlayerIcon'
import QrComponent from '@/app/components/QrComponent'
import AppText from '@/app/components/text/AppText'
import AppView from '@/app/components/views/AppView'

const players = [
    'Martin',
    'Erik',
    'Morten',
    'Jonas',
    'Karl',
    'Marius',
    'Ulrikke',
    'Andreas',
    'Morten',
    'Jonas',
    'Karl',
    'Nina',
    'Johanne',
    'Andreas',
]

export default function Lobby() {
    const [isOverlayVisible, setOverlayVisible] = useState(false)

    const toggleOverlay = () => setOverlayVisible(prev => !prev)

    const isPlayerAlone = players.length <= 1

    return (
        <>
            <AppView isRoot={true} className="items-center justify-between">
                <FlatList
                    className="w-full"
                    contentContainerClassName="pb-10"
                    columnWrapperClassName="justify-center"
                    data={players}
                    numColumns={3}
                    keyExtractor={(_, index) => index.toString()}
                    bounces={false}
                    ListHeaderComponent={
                        <AppView className="items-center">
                            <NavButtons
                                leftButton={
                                    <FontAwesome
                                        name="chevron-left"
                                        size={24}
                                    />
                                }
                                leftButtonBack={true}
                            />
                            <AppText size="display-sm-regular">
                                Martin's spill
                            </AppText>
                            <Pressable
                                className="my-4 items-center"
                                onPress={toggleOverlay}
                            >
                                <FontAwesome
                                    name="qrcode"
                                    size={64}
                                    color="#E8E8EA"
                                />
                                <AppText size="text-sm-regular">
                                    TRYKK PÅ QR
                                </AppText>
                            </Pressable>
                            <View className="items-center w-full mt-6 mb-4">
                                <AppText size="text-xl-semibold">
                                    {players.length} / 15
                                </AppText>
                            </View>
                        </AppView>
                    }
                    renderItem={({ item }) => (
                        <View className="w-1/3 py-2 items-center">
                            <PlayerIcon name={item} size="medium" />
                        </View>
                    )}
                    ListFooterComponent={
                        <AppView>
                            {isPlayerAlone && (
                                <AppText
                                    className="text-center mt-10"
                                    size="text-md-regular"
                                    color="text-primary-300"
                                >
                                    Du er alene i rommet.{'\n'}
                                    Trykk på QR-koden for å invitere folk.
                                </AppText>
                            )}
                        </AppView>
                    }
                />
                <AppButton title="NESTE" gradientBackgroundColor={[3, 3, 35]} />
            </AppView>
            <Overlay
                isVisible={isOverlayVisible}
                toggleVisibility={toggleOverlay}
            >
                <QrComponent />
            </Overlay>
        </>
    )
}
