import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import PlayerCard from '../components/PlayerCard'; // Componente de tarjeta para el jugador
import { RootStackParamList } from '../types/types';
import firestore from '@react-native-firebase/firestore';
import { ActivityIndicator } from 'react-native';


type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList, // Usamos el tipo de nuestro stack
  'Home' // Especificamos la pantalla actual
>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp; // Tipamos la propiedad navigation
}

// Definir un tipo para un jugador
interface Player {
    id: string;
    nombre: string;
    posicion: string;
    altura: string;
    apellidos:string;
    edad: number;
    equipo: string;
    foto: string;
    video: string;
  }
const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
    const [players, setPlayers] = useState([]); // Initial empty array of users
  // Aquí simulas la carga de los jugadores (podría venir de una API o base de datos)
  useEffect(() => {
    const subscriber = firestore().collection('players').onSnapshot(querySnapshot => {
      const players = [];

      querySnapshot.forEach(documentSnapshot => {
        players.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id
      });
  });
    setPlayers(players);
    setLoading(false);
});

  // Unsubscribe from events when no longer in use
  return () => subscriber();
/*
    const fetchPlayers = () => {
      // Simulando una lista de jugadores
      const playerList: Player[] = [
        { id: '1', name: 'LeBron James', position: 'Forward', image: 'url_to_image_1' },
        { id: '2', name: 'Stephen Curry', position: 'Guard', image: 'url_to_image_2' },
        // Añade más jugadores
      ];
      setPlayers(playerList);
    };

    fetchPlayers();
    */
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }


  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('PlayerDetails', { playerId: item.key })}>
      <PlayerCard player={item} />
    </TouchableOpacity>
  );

  return (
    
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Jugadores</Text>
      <FlatList
        data={players}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default HomeScreen;
