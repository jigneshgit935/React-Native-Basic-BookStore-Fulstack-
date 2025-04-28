import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeAreaScreen from '../components/SafeScreen'
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaScreen>
        <Stack screenOptions={{ headerShown: false }}  >
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth )" />
        </Stack>
      </SafeAreaScreen>

      <StatusBar style="dark" />
    </SafeAreaProvider>
  )
}
