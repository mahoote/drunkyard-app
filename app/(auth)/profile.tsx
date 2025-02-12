import React from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import AppButton from '@/app/components/buttons/AppButton'
import AppText from '@/app/components/text/AppText'
import AppView from '@/app/components/views/AppView'
import { signOut } from '@/src/redux/actions/authActions'
import { AppRootState, useAppDispatch } from '@/src/redux/store'

export default function profile() {
    const dispatch = useAppDispatch()
    const { user, loading } = useSelector((state: AppRootState) => state.auth)

    if (loading) {
        return (
            <AppView className="flex-1 items-center justify-center">
                <AppText>Loading user data...</AppText>
            </AppView>
        )
    }

    if (!user) {
        return (
            <AppView className="flex-1 items-center justify-center">
                <AppText>User not found</AppText>
            </AppView>
        )
    }

    return (
        <View className="flex-1 justify-center items-center">
            <AppText>Welcome {user.email}</AppText>
            <AppButton title="Sign out" onPress={() => dispatch(signOut())} />
        </View>
    )
}
