import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import NotificationProvider from '@/src/providers/NotificationProvider';
import { StatusBar, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#1A2633',
    height: 50,
    borderTopColor: '#243647'
  },
});

export default function TabsLayout() {
  return (
    <NotificationProvider>
      <StatusBar barStyle="light-content" translucent backgroundColor="#121A21" />
      <View className='flex-1 pt-8'>
        <Tabs
          screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: styles.tabBar,
            headerShown: false,
            tabBarActiveTintColor: "white",
            tabBarInactiveTintColor:'#94ADC7'
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              tabBarIcon: ({ color }) => (
                <Ionicons name="notifications" size={26} color={color} />
              ),
            }}
          />

          <Tabs.Screen
            name="socio"
            options={{
              headerTitle: 'Cadastro',
              headerTitleAlign: 'center',
              tabBarIcon: ({ color }) => (
                <FontAwesome name="user" size={26} color={color} />
              ),
            }}
          />
        </Tabs>
      </View>
    </NotificationProvider>
  );
}
