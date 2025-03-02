import { FontAwesome } from '@expo/vector-icons'
import React, { useState } from 'react'
import { TextInput, TouchableOpacity, View } from 'react-native'
import AppText, { AppTextProps } from '@/app/components/text/AppText'

interface EditableTextProps extends AppTextProps {
    onSave: (text: string) => void
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
 * @param onSave
 * @param props
 * @constructor
 */
export default function EditableText({
    children,
    size = 'text-xl-regular',
    color = 'text-foreground',
    maxLength,
    onSave,
    ...props
}: EditableTextProps) {
    const originalText = children as string

    const [text, setText] = useState<string>(originalText)
    const [isEditing, setIsEditing] = useState<boolean>(false)

    /**
     * Handles the text editing.
     * If the text is less than 3 characters, the original text is restored.
     * @param editing
     */
    const handleEditText = (editing: boolean) => {
        if (text.trim().length < 3) {
            setText(originalText)
            onSave(originalText)
        } else {
            onSave(text)
        }
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
