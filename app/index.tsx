import React  , { useEffect, useState }from 'react';
import AppNavigator from './navigation/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import firebase from '@react-native-firebase/app';
import { enableScreens } from 'react-native-screens';


  // Your secondary Firebase project credentials...
  const firebaseConfig = {
    apiKey: "AIzaSyAirSTyEyT-L-sUgyzLhAxDnarXyn_M4wg",
    authDomain: "equipobasketuoc.firebaseapp.com",
    projectId: "equipobasketuoc",
    storageBucket: "equipobasketuoc.firebasestorage.app",
    messagingSenderId: "104990418626",
    appId: "1:104990418626:web:8fcc96952ac603f1637d5b",
    databaseURL: "https://equipobasketuoc.firebaseio.com"
  };

const App = () => {
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);

  useEffect(() => {
    const initFirebase = async () => {
      if (!firebase.apps.length) {
        await firebase.initializeApp(firebaseConfig);
      }
      setFirebaseInitialized(true);
    };
    initFirebase();
  }, []);

  if (!firebaseInitialized) {
    return null; // o un <Loading /> si quieres
  }
  return (
    <SafeAreaProvider>
    <AppNavigator />
  </SafeAreaProvider>
  );
};

export default App;
