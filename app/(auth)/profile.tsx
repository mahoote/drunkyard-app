import { FontAwesome } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import AppLoader from '@/app/components/AppLoader'
import AppButton from '@/app/components/buttons/AppButton'
import NavButtons from '@/app/components/buttons/NavButtons'
import AppText from '@/app/components/text/AppText'
import AppView from '@/app/components/views/AppView'
import { signOut } from '@/src/redux/actions/authActions'
import { AppRootState, useAppDispatch } from '@/src/redux/store'

export default function Profile() {
    const dispatch = useAppDispatch()
    const { user, loading, player } = useSelector(
        (state: AppRootState) => state.auth,
    )
    const router = useRouter()

    if (loading) {
        return <AppLoader />
    }

    if (!user || !player) {
        return (
            <AppView className="flex-1 items-center justify-center gap-5">
                <AppText>Det var et problem med å hente din data.</AppText>
                <AppButton
                    title="Logg ut"
                    size="small"
                    onPress={() => dispatch(signOut(router))}
                />
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
                    <AppButton
                        title="Sign out"
                        size="small"
                        onPress={() => dispatch(signOut(router))}
                    />
                </View>
            </AppView>
        </AppView>
    )
}
