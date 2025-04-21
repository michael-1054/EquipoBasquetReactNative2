import { Stack } from "expo-router";
import { Text, View } from "react-native";

export default function RootLayout() {
  return (
    <Stack 
      screenOptions={{
        headerTitle: "Equipo Basket", 
        headerTitleAlign: "center",  // Centrar el título
        headerStyle: {
          backgroundColor: '#0c95f6',  // Fondo azul claro
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          color: "#fff",
          fontSize:35  // Opcional: para hacerlo más destacado
        },
      }}
    />
  );
}