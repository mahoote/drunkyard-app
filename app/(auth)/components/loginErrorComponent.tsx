import React from 'react'
import { View } from 'react-native'
import AppButton from '@/app/components/buttons/AppButton'
import AppText from '@/app/components/text/AppText'

export default function LoginErrorComponent({
    error,
    onPress,
}: {
    error: string
    onPress: () => void
}) {
    return (
        <View className="items-center justify-evenly flex-1">
            <View className="gap-5">
                <AppText className="text-center">
                    Det oppstod et problem.
                </AppText>
                <AppText
                    size="text-md-semibold"
                    color="text-primary-400"
                    className="text-center"
                >
                    ({error})
                </AppText>
            </View>
            <AppButton title="Prøv igjen" onPress={onPress} />
        </View>
    )
}
