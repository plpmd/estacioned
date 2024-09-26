import { useFonts } from 'expo-font';
import { Redirect } from 'expo-router';

export default function Home() {
  const [fontsLoaded] = useFonts({
    'Manrope-Bold': require('../../assets/fonts/Manrope-Bold.ttf'),
    'Manrope-Regular': require('../../assets/fonts/Manrope-Regular.ttf')
  });

  if (!fontsLoaded) {
    return null;
  }

  return <Redirect href="/(tabs)" />;
}
