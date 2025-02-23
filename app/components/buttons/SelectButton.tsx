import React from 'react'
import { Pressable, View } from 'react-native'
import AppText from '@/app/components/text/AppText'

interface SelectButtonProps {
    options: { label: string; value: string | number | boolean }[]
    selectedOption: string | number | boolean
    setSelectedOption: (value: string | number | boolean) => void
    className?: string
    buttonClassName?: string
}

/**
 * A button that allows the user to select between different options.
 * Accepts the value as string, number and boolean.
 * @param options
 * @param defaultOption
 * @param selectedOption
 * @param setSelectedOption
 * @param className
 * @param buttonClassName
 * @constructor
 */
export default function SelectButton({
    options,
    selectedOption,
    setSelectedOption,
    className,
    buttonClassName,
}: SelectButtonProps) {
    const handleSelectOption = (value: string | number | boolean) => {
        setSelectedOption(value)
    }

    return (
        <View className="items-center">
            <View
                className={`bg-primary-950 rounded-full items-center justify-between flex-row self-start ${className}`}
            >
                {options.map((option, index) => (
                    <Pressable
                        key={index}
                        className={`py-2 px-6 items-center rounded-full ${selectedOption === option.value ? 'bg-primary-400' : ''} ${buttonClassName}`}
                        onPress={() => handleSelectOption(option.value)}
                    >
                        <AppText
                            size="text-lg-semibold"
                            verticalAlign={true}
                            color={
                                selectedOption === option.value
                                    ? 'text-background'
                                    : 'text-foreground'
                            }
                        >
                            {option.label}
                        </AppText>
                    </Pressable>
                ))}
            </View>
        </View>
    )
}
