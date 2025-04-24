// app/screens/PlayerDetails.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { db, storage } from '../../_helpers/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';

export default function PlayerDetails() {
  const { playerId } = useLocalSearchParams<{ playerId: string }>();
  const [player, setPlayer] = useState<any>();
  const [photoUrl, setPhotoUrl] = useState<string>();

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        // 1 · leer documento
        const snap = await getDoc(doc(db, 'players', String(playerId)));
        if (!snap.exists()) return;

        const data = snap.data();
        setPlayer(data);

        // 2 · limpiar la ruta de la foto
        let rawPath = String(data.foto ?? '').trim();   // puede ser "", null, etc.

        if (!rawPath) return;                           // no hay foto

        if (!rawPath.startsWith('http')) {
          // quita "assets/" si quedó grabado así
          rawPath = rawPath.replace(/^assets\//, '');
        }

        console.log('[DEBUG-foto]', `"${rawPath}"`);

        // 3 · obtener URL final
        const url = rawPath.startsWith('http')
          ? rawPath                                    // URL externa
          : await getDownloadURL(ref(storage, rawPath)); // ruta en bucket

        if (mounted) setPhotoUrl(url);

      } catch (err) {
        console.warn('⚠️  Error cargando detalle', err);
      }
    })();

    return () => { mounted = false; };
  }, [playerId]);

  if (!player || !photoUrl) {
    return <ActivityIndicator style={{ marginTop: 40 }} />;
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: photoUrl }} style={styles.image} />
      <Text style={styles.name}>{player.nombre} {player.apellidos}</Text>
      <Text style={styles.position}>{player.posicion}</Text>
      <Text>Edad: {player.edad}</Text>
      <Text>Altura: {player.altura}</Text>
      <Text>Equipo: {player.equipo}</Text>

      <Button
        title="Ver vídeo"
        onPress={() =>
          router.push({
            pathname: '/screens/MediaPlayer',
            params: { mediaPath: player.video },
          })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 16 },
  image: { width: 220, height: 220, borderRadius: 110, marginBottom: 16 },
  name: { fontSize: 26, fontWeight: 'bold' },
  position: { fontSize: 18, color: 'gray', marginBottom: 8 },
});
