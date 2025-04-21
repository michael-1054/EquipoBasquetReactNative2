import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native'; // Importa RouteProp
import { RootStackParamList } from '../types/types'; // Importa el tipo de parámetros
import firestore from '@react-native-firebase/firestore';

// Tipo para las props, incluyendo 'route'
type PlayerDetailsRouteProp = RouteProp<RootStackParamList, 'PlayerDetails'>;

interface PlayerDetailsProps {
  route: PlayerDetailsRouteProp; // Tipamos la propiedad 'route' correctamente
}

const PlayerDetails: React.FC<PlayerDetailsProps> = ({ route }) => {
  const { playerId } = route.params; // Obtiene el ID del jugador desde la navegación
  const [player, setPlayer] = useState(null); // Cambié el estado inicial a null para simplificar la verificación
  // Simula la carga de detalles de un jugador
  useEffect(() => {
    const fetchPlayerDetails = async () => {
      try {
        const documentSnapshot = await firestore()
          .collection('players')
          .doc(playerId) // Recupera un documento específico
          .get();

        if (documentSnapshot.exists) {
          setPlayer(documentSnapshot.data()); // Establece los datos del jugador en el estado
        } else {
          console.error("No se encontró ningún jugador con el ID proporcionado.");
        }
      } catch (error) {
        console.error("Error al recuperar los detalles del jugador: ", error);
      }
    };

    fetchPlayerDetails();
  }, [playerId]);

  if (!player) {
    return (
      <View style={styles.container}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: 'url_to_image' }} style={styles.image} />
      <Text style={styles.name}>{player.nombre}</Text>
      <Text style={styles.name}>{player.apellidos}</Text>
      <Text style={styles.position}>{player.posicion}</Text>
      <Text style={styles.bio}>Edad: {player.edad}</Text>
      <Text style={styles.bio}>Altura: {player.altura}</Text>
      <Text style={styles.bio}>Equipo: {player.equipo}</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  position: {
    fontSize: 18,
    color: 'gray',
  },
  bio: {
    fontSize: 16,
    marginTop: 16,
  },
});

export default PlayerDetails;
