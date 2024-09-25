import { Redirect, Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import NotificationProvider from '@/src/providers/NotificationProvider';
import { StatusBar, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#02051f',
  },
  header: {
    backgroundColor: '#040a38',
  }
});

export default function TabsLayout() {
  return (
    <NotificationProvider>
      <StatusBar barStyle="light-content" backgroundColor="#040a38" />

      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBar,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            headerTitle: 'Buscar placa',
            headerTitleAlign: 'center',
            tabBarIcon: ({ color }) => (
              <Ionicons name="notifications" size={26} color={color} />
            ),
            headerStyle: styles.header,
            headerTintColor: '#ffffff',
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
            headerStyle: styles.header,
            headerTintColor: '#ffffff',
          }}
        />
      </Tabs>
    </NotificationProvider>
  );
}
