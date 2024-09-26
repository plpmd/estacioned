import { Dispatch, SetStateAction } from "react";
import { Text, TextInput as RNTextInput, View } from "react-native";

type Props = {
  header: string
  placeholder: string
  value: string
  onChangeText: Dispatch<SetStateAction<string>>
  autoCapitalize?: boolean
}

export default function TextInput({ header, placeholder, value, onChangeText, autoCapitalize = false}: Props) {
  return (
    <View className="mb-2">
      <Text className='text-white font-semibold mb-2 text-lg'>{header}</Text>
      <RNTextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        className='border border-gray-300 p-3 rounded-md text-white'
        placeholderTextColor={'gray'}
        autoCapitalize={autoCapitalize ? 'characters' : 'words'}
      />
    </View>
  )
}
