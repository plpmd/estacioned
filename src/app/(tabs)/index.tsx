import TextInput from '@/src/components/TextInput';
import { supabase } from '@/src/lib/supabase';
import { sendCarNotification } from '@/src/util/notifications';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SetStateAction, useState } from 'react';
import { Alert, FlatList, Linking, Pressable, Text, View } from 'react-native';

export default function CreatePost() {
  const [placa, setPlaca] = useState('')
  const [possiblePlacas, setPossiblePlacas] = useState<any>([])

  const onChangePlaca = async (newPlaca: SetStateAction<string>) => {
    setPlaca(newPlaca)

    const pattern = `${newPlaca}%`;
    const { data } = await supabase.from('socios').select('*').ilike('placa', pattern);
    if (data) {
      setPossiblePlacas(data)
    }
  }

  const onSelectedPlaca = async (selectedPlaca: any) => {
    setPossiblePlacas([selectedPlaca])
    
    const loggedString = await AsyncStorage.getItem('estacioned-logged');
    const logged = JSON.parse(loggedString || '{}')
    const nameWantToLeave = logged?.name || 'alguém'

    sendCarNotification(selectedPlaca.push_notification, nameWantToLeave)
    
    Alert.alert(`O dono do carro é ${selectedPlaca.name}`, `Enviamos uma notificação para o app do dono do carro. \n\nQuer iniciar uma conversa no Whatsapp com ${selectedPlaca.name} - ${selectedPlaca.phone}?`, [
      {
        text: 'Não',
      },
      {text: 'Sim', onPress: () =>{
        const whatsappUrl = `https://wa.me/${selectedPlaca.phone}`;
        Linking.openURL(whatsappUrl)
      }},
    ]);
  }

  return (
    <View className='bg-[#040a38] gap-3 p-3 flex-1'>
      <TextInput
        header={'Qual é a placa do carro que está travando sua saída?'}
        placeholder={'Digite aqui'}
        value={placa}
        onChangeText={onChangePlaca}
      />
      {
        possiblePlacas.length > 0 &&
        <Text className='text-white'>Resultados:</Text>
      }
      <FlatList
        data={possiblePlacas}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => onSelectedPlaca(item)}
            className='border border-gray-500 p-6 rounded-md mt-3 flex-row justify-between'>
            <Text className='text-white'>{item.placa}</Text>
            <Ionicons name="notifications" size={20} color={'white'} />
          </Pressable>
        )}
        contentContainerStyle={{ alignContent: 'center', width: '100%' }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )

}
