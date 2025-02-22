import React, { useState } from 'react'
import { Pressable, View } from 'react-native'
import AppText from '@/app/components/text/AppText'

interface SelectButtonProps {
    options: { label: string; value: string }[]
    defaultOption: string
    className?: string
    buttonClassName?: string
}

/**
 * A button that allows the user to select between different options.
 * @param options
 * @param defaultOption
 * @param className
 * @param buttonClassName
 * @constructor
 */
export default function SelectButton({
    options,
    defaultOption,
    className,
    buttonClassName,
}: SelectButtonProps) {
    const [selectedOption, setSelectedOption] = useState<string>(defaultOption)

    const handleSelectOption = (value: string) => {
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
                            color="text-background"
                        >
                            {option.label}
                        </AppText>
                    </Pressable>
                ))}
            </View>
        </View>
    )
}
