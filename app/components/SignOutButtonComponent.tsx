import { useRouter } from 'expo-router'
import React from 'react'
import AppButton from '@/app/components/buttons/AppButton'
import { signOut } from '@/src/redux/actions/authActions'
import { useAppDispatch } from '@/src/redux/store'

export default function SignOutButtonComponent() {
    const router = useRouter()
    const dispatch = useAppDispatch()

    return (
        <AppButton
            title="Logg ut"
            size="small"
            onPress={() => dispatch(signOut(router))}
        />
    )
}
