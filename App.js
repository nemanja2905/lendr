import 'react-native-gesture-handler';
import React from 'react';
import AppEntry from './src/AppEntry';

// Custom fonts
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

export default function App() {
    let [fontsLoaded] = useFonts({
        IcoMoon: require('./assets/fonts/icomoon.ttf'),
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }
    return <AppEntry />;
}
