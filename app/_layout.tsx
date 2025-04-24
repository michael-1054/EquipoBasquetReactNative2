import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: 'center',
        headerTitle: 'Equipo Basket',
        headerStyle: { backgroundColor: '#0c95f6' },
        headerTitleStyle: { fontWeight: 'bold', color: '#fff', fontSize: 28 },
      }}
    >
      {/* Nombres de ruta = nombres de archivo */}
      <Stack.Screen name="screens/HomeScreen" options={{ title: 'Inicio' }} />
      <Stack.Screen name="screens/PlayerDetails" options={{ title: 'Detalle' }} />
      <Stack.Screen name="screens/MediaPlayer" options={{ title: 'Reproductor' }} />
    </Stack>
  );
}
