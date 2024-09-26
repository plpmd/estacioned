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
      <RNTextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        className='border-none p-3 rounded-xl bg-[#243647]  text-white font-Manrope-Regular'
        placeholderTextColor={'#93adc7'}
        autoCapitalize={autoCapitalize ? 'characters' : 'words'}
      />
    </View>
  )
}
