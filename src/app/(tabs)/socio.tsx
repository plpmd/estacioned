import { Alert, FlatList, Image, View } from 'react-native';
import { useEffect, useState } from 'react';
import { supabase } from '@/src/lib/supabase';
import TextInput from '@/src/components/TextInput';
import Button from '@/src/components/Button';
import { useExpoPushToken } from '@/src/providers/NotificationProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SocioScreen() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [placa, setPlaca] = useState('')
  const [loading, setLoading] = useState(false)
  const [storedPlaca, setStoredPlaca] = useState('')

  const push_notification = useExpoPushToken()

  const getStoredPlaca = async () => {
    const sPlaca = await AsyncStorage.getItem('estacioned-logged');
    return sPlaca
  }

  useEffect(() => {
    getRegisteredSocios()
  }, [])

  const getRegisteredSocios = async () => {
    const sPlaca = await getStoredPlaca()
    if (sPlaca) {
      setStoredPlaca(sPlaca)
      const { data } = await supabase.from('socios').select('*').eq('placa', sPlaca);
      if (data && data[0]) {
        setName(data[0].name)
        setPhone(data[0].phone)
        setPlaca(data[0].placa)
      }
    }
  }

  const registerSocio = async () => {
    setLoading(true)

    let { error } = await supabase.from('socios')
      .upsert([
        {
          name,
          phone: phone.replace(/[()\s-]/g, ''),
          placa,
          push_notification
        },
      ])
      .select()

    if (!error) {
      await AsyncStorage.setItem('estacioned-logged', JSON.stringify({ name, placa }));
      setStoredPlaca(placa)
      Alert.alert('Cadastro realizado!')
    }

    setLoading(false)
  }
  return (
    <View className='bg-[#040a38] gap-3 p-3 flex-1'>
      <TextInput
        header={'Qual é seu nome?'}
        placeholder={'Digite aqui'}
        value={name}
        onChangeText={(newName) => setName(newName)}
      />

      <TextInput
        header={'Qual é seu telefone?'}
        placeholder={'DDD+Número'}
        value={phone}
        onChangeText={(newPhone) => setPhone(newPhone)}
      />
      <TextInput
        header={'Qual é a placa do seu carro?'}
        placeholder={'Digite aqui'}
        value={placa}
        onChangeText={(newPlaca) => setPlaca(newPlaca)}
        autoCapitalize
      />

      <View className='mt-3'>
        <Button
          text={storedPlaca.length > 0 ? 'Atualizar ' : 'Cadastrar'}
          onPress={registerSocio}
          loading={loading}
        />
      </View>
    </View>
  );
}
