import { View, Pressable, Text, ActivityIndicator } from "react-native";

type Props = {
  text: string
  onPress: () => void,
  loading: boolean
}

export default function Button({ text, onPress, loading }: Props) {
  return (
    <Pressable disabled={loading} onPress={onPress} className='bg-[#1A80E5] w-full p-3 items-center rounded-xl'>
      {
        loading ?
          <ActivityIndicator color={'white'} />
          :
          <Text className='font-Manrope-Bold text-white font-semibold'>{text}</Text>
      }
    </Pressable>
  )
}
