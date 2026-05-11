import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="phone-login" options={{ headerShown: false }} />
      <Stack.Screen name="client" options={{ headerShown: false }} />
      <Stack.Screen name="worker" options={{ headerShown: false }} />
      <Stack.Screen name="admin" options={{ headerShown: false }} />
      <Stack.Screen name="create-order" options={{ headerShown: false }} />
      <Stack.Screen name="orders-list" options={{ headerShown: false }} />
    </Stack>
  );
}