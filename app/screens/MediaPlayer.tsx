import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { ResizeMode, Video } from 'expo-av'; // Usando la librería de Expo para el reproductor de video
import { RouteProp } from '@react-navigation/native'; // Para los parámetros de la ruta
import { RootStackParamList } from '../types/types'; // Importa el tipo del stack de navegación
import { useNavigation } from '@react-navigation/native';

// Definir el tipo de la ruta para MediaPlayer
type MediaScreenRouteProp = RouteProp<RootStackParamList, 'MediaPlayer'>;

interface MediaScreenProps {
  route: MediaScreenRouteProp; // Tipamos la propiedad route correctamente
}

const MediaPlayer: React.FC<MediaScreenProps> = ({ route }) => {
  const { mediaUrl } = route.params; // Obtiene la URL del video o audio
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reproductor Multimedia</Text>
      <Video
        source={{ uri: mediaUrl }} // Reemplaza con la URL del contenido multimedia
        style={styles.video}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
      />
      <Button title="Cerrar" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  video: {
    width: '100%',
    height: 250,
  },
});

export default MediaPlayer;
