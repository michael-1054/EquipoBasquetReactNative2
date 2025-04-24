// app/_layout.tsx  (o donde tengas RootLayout)
import { Stack, Link } from 'expo-router';
import { Text } from 'react-native';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: '#0c95f6' },

        // Titular clicable → HomeScreen
        headerTitle: () => (
          <Link
            href="/screens/HomeScreen"   // ruta de tu pantalla
            replace                       // evita duplicar la misma ruta en la pila
            asChild                       // Link solo aporta navegación; deja el aspecto al hijo
          >
            <Text
              style={{
                fontWeight: 'bold',
                color: '#fff',
                fontSize: 28,
              }}
            >
              Equipo Basket
            </Text>
          </Link>
        ),
      }}
    >
      <Stack.Screen name="screens/HomeScreen" options={{ title: 'Inicio' }} />
      <Stack.Screen name="screens/PlayerDetails" options={{ title: 'Detalle' }} />
      <Stack.Screen name="screens/MediaPlayer" options={{ title: 'Reproductor' }} />
    </Stack>
  );
}
