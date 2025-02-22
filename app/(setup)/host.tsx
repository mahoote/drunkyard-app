import { FontAwesome } from '@expo/vector-icons'
import React from 'react'
import { View } from 'react-native'
import NavButtons from '@/app/components/buttons/NavButtons'
import AppText from '@/app/components/text/AppText'
import AppView from '@/app/components/views/AppView'

export default function host() {
    return (
        <AppView isRoot={true}>
            <AppView className="items-center justify-between">
                <View>
                    <NavButtons
                        leftButton={
                            <FontAwesome name="chevron-left" size={24} />
                        }
                        leftButtonBack={true}
                    />
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
                </View>
            </AppView>
        </AppView>
    )
}
