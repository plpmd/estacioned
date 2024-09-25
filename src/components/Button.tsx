import { View, Pressable, Text, ActivityIndicator } from "react-native";

type Props = {
  text: string
  onPress: () => void,
  loading: boolean
}

export default function Button({ text, onPress, loading }: Props) {
  return (
    <Pressable disabled={loading} onPress={onPress} className='bg-blue-500 w-full p-3 items-center rounded-md'>
      {
        loading ?
          <ActivityIndicator color={'white'} />
          :
          <Text className='text-white font-semibold'>{text}</Text>
      }
    </Pressable>
  )
}
