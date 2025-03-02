import { FontAwesome } from '@expo/vector-icons'
import React, { useState } from 'react'
import { TextInput, TouchableOpacity, View } from 'react-native'
import AppText, { AppTextProps } from '@/app/components/text/AppText'

interface EditableTextProps extends AppTextProps {
    maxLength?: number
}

/**
 * EditableText combines the AppText component with the
 * TextInput component to create an editable text field.
 * - Default size: text-xl-regular
 * - Default color: text-foreground
 * @param children
 * @param size
 * @param color
 * @param maxLength
 * @param props
 * @constructor
 */
export default function EditableText({
    children,
    size = 'text-xl-regular',
    color = 'text-foreground',
    maxLength,
    ...props
}: EditableTextProps) {
    const [text, setText] = useState<string>(children as string)
    const [isEditing, setIsEditing] = useState<boolean>(false)

    const handleEditText = (editing: boolean) => {
        setIsEditing(editing)
    }

    return (
        <View>
            {isEditing ? (
                <TextInput
                    className={`${color} ${size}`}
                    value={text}
                    onChangeText={setText}
                    onBlur={() => handleEditText(false)}
                    autoFocus={true}
                    maxLength={maxLength}
                />
            ) : (
                <View className="relative">
                    <AppText color={color} size={size} {...props}>
                        {text}
                    </AppText>
                    <TouchableOpacity
                        className="absolute right-[-26px]"
                        onPress={() => handleEditText(true)}
                    >
                        <AppText>
                            <FontAwesome name="pencil" size={20} />
                        </AppText>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    )
}
