import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import PlayerDetails from '../screens/PlayerDetails';
import MediaPlayer from '../screens/MediaPlayer';
import { RootStackParamList } from '../types/types'; // Importa el tipo de rutas

// Crear el tipo de Stack Navigator con los parámetros de la ruta
const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen 
      name="Home" 
      component={HomeScreen} 
      options={{ 
        title: "Inicio", 
        headerTitleAlign: 'center', // Centrar el título
        headerTitleStyle:{
          fontSize:30,
          fontWeight:'bold'
        } // Centrar el título
      }} 
    />
    <Stack.Screen 
      name="PlayerDetails" 
      component={PlayerDetails} 
      options={{ 
        title: "Detalle del jugador", 
        headerTitleAlign: 'center',
        headerTitleStyle:{
          fontSize:35,
          fontWeight:'bold'
        } // Centrar el título
      }} 
    />
    <Stack.Screen 
      name="MediaPlayer" 
      component={MediaPlayer} 
      options={{ 
        title: "Reproductor de Medios", 
        headerTitleAlign: 'center',
        headerTitleStyle:{
          fontSize:35,
          fontWeight:'bold'
        } // Centrar el título // Centrar el título
      }} 
    />
  </Stack.Navigator>
);

export default AppNavigator;
