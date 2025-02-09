import React from 'react'
import {
    KeyboardTypeOptions,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'
import ArrowRightIcon from '@/assets/icons/arrow-right-solid.svg'

interface AppTextInputProps {
    placeholder?: string
    className?: string
    width?: string
    multiline?: boolean
    maxLength?: number
    keyboardType?: KeyboardTypeOptions
    hasButton?: boolean
    buttonAction?: () => void
}

export default function AppTextInput({
    placeholder,
    className,
    width,
    multiline,
    maxLength,
    keyboardType,
    hasButton,
    buttonAction,
}: AppTextInputProps) {
    const viewWidth = width ?? 'w-full'

    if (hasButton && !buttonAction) {
        throw new Error(
            'AppTextInput: hasButton is true, but no buttonAction is provided.',
        )
    }

    return (
        <View
            className={`${viewWidth} flex-row items-center rounded-full bg-foreground px-4`}
        >
            <TextInput
                className={`flex-1 text-lg-regular h-14 text-background py-0 ${className}`}
                placeholder={placeholder}
                multiline={multiline}
                textAlignVertical="center"
                maxLength={maxLength}
                keyboardType={keyboardType}
            />
            {hasButton && (
                <TouchableOpacity
                    className="bg-secondary-900 p-2 rounded-full ml-2"
                    onPress={buttonAction}
                >
                    <Text className="w-6 h-6 text-center">
                        <ArrowRightIcon width={16} height={21} fill="#E8E8EA" />
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    )
}
