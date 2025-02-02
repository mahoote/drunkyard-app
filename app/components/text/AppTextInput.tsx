import React from 'react'
import { KeyboardTypeOptions, TextInput, View } from 'react-native'

interface AppTextInputProps {
    placeholder?: string
    className?: string
    width?: number
    multiline?: boolean
    maxLength?: number
    keyboardType?: KeyboardTypeOptions
}

export default function AppTextInput({
    placeholder,
    className,
    width,
    multiline,
    maxLength,
    keyboardType,
}: AppTextInputProps) {
    const viewWidth = width ? `w-${width}` : 'w-full'

    return (
        <View className={`${viewWidth}`}>
            <TextInput
                className={`w-full text-lg-regular h-16 rounded-full bg-foreground text-background px-6 ${className}`}
                placeholder={placeholder}
                multiline={multiline}
                textAlignVertical="center"
                maxLength={maxLength}
                keyboardType={keyboardType}
            />
        </View>
    )
}
