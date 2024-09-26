import { Alert, FlatList, Image, Text, View } from 'react-native';
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
  const [userId, setUserId] = useState()

  const push_notification = useExpoPushToken()

  const getStoredUser = async () => {
    const storedUser = await AsyncStorage.getItem('estacioned-logged');
    return JSON.parse(storedUser || '{}')
  }

  useEffect(() => {
    getRegisteredSocios()
  }, [])

  const getRegisteredSocios = async () => {
    const storedUser = await getStoredUser()
    if (storedUser && storedUser.placa) {
      const { data } = await supabase.from('socios').select('*').eq('placa', storedUser.placa);
      if (data && data[0]) {
        setUserId(data[0].id)
        setName(data[0].name)
        setPhone(data[0].phone)
        setPlaca(data[0].placa)
      }
    }
  }

  const handlePhoneNumber = () => {
    const onlyNumberPhone = phone.replace(/[()\s-]/g, '')
    if (onlyNumberPhone.length < 10) return false
    if (onlyNumberPhone.length === 10) {
      return onlyNumberPhone.slice(0, 2) + '9' + onlyNumberPhone.slice(2);
    }
    return onlyNumberPhone
  }

  const registerSocio = async () => {
    setLoading(true)
    const phoneNumber = handlePhoneNumber()
    if (phoneNumber) {
      let { error } = await supabase.from('socios')
        .upsert([
          {
            id: userId,
            name,
            phone: phoneNumber,
            placa,
            push_notification
          },
        ])
        .select()

      if (!error) {
        await AsyncStorage.setItem('estacioned-logged', JSON.stringify({ name, placa }));
        Alert.alert(userId? 'Cadastrdo atualizado':'Cadastro realizado!', 'Seus dados estão guardados.')
      }

    } else {
      Alert.alert('Número de telefone inválido', 'Por gentileza, insira DDD e número.')
    }

    setLoading(false)
  }
  return (
    <View className='bg-[#121A21] gap-10 p-3 flex-1'>
      <Text className='font-Manrope-Bold text-white text-[22px] leading-tight tracking-[-0.015em] px-4 text-center pb-3 pt-5'>Cadastro</Text>
      <View className='gap-3'>
        <TextInput
          header={'Nome:'}
          placeholder={'Escreva seu nome.'}
          value={name}
          onChangeText={(newName) => setName(newName)}
        />

        <TextInput
          header={'Telefone:'}
          placeholder={'Escreva seu telfone =(DDD + Número).'}
          value={phone}
          onChangeText={(newPhone) => setPhone(newPhone)}
        />

        <TextInput
          header={'Placa:'}
          placeholder={'Escreva a placa de seu carro.'}
          value={placa}
          onChangeText={(newPlaca) => setPlaca(newPlaca)}
          autoCapitalize
        />

      </View>
      <Button
        text={userId ? 'Atualizar ' : 'Cadastrar'}
        onPress={registerSocio}
        loading={loading}
      />
    </View>
  );
}
