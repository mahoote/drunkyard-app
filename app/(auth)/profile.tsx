import { FontAwesome } from '@expo/vector-icons'
import React from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import AppLoader from '@/app/components/AppLoader'
import NavButtons from '@/app/components/buttons/NavButtons'
import SignOutButtonComponent from '@/app/components/SignOutButtonComponent'
import AppText from '@/app/components/text/AppText'
import AppView from '@/app/components/views/AppView'
import { AppRootState } from '@/src/redux/store'

export default function Profile() {
    const { user, loading, player } = useSelector(
        (state: AppRootState) => state.auth,
    )

    if (loading) {
        return <AppLoader />
    }

    if (!user || !player) {
        return (
            <AppView className="flex-1 items-center justify-center gap-5">
                <AppText>Det var et problem med å hente din data.</AppText>
                <SignOutButtonComponent />
            </AppView>
        )
    }

    return (
        <AppView isRoot={true} className="items-center">
            <AppView className="flex-1">
                <NavButtons
                    leftButton={<FontAwesome name="chevron-left" size={24} />}
                    leftButtonHref="/"
                />
                <View className="flex-1 items-center justify-evenly">
                    {player.username && (
                        <AppText className="text-center">
                            Username:{'\n'} {player.username}
                        </AppText>
                    )}
                    <AppText className="text-center">
                        Signed in as:{'\n'} {user.email}
                    </AppText>
                    <SignOutButtonComponent />
                </View>
            </AppView>
        </AppView>
    )
}
