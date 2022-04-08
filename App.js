import 'react-native-gesture-handler';
import React from 'react';
import AppEntry from './src/AppEntry';

// Custom fonts
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { UserProvider } from './src/context/user/UserProvider';
export default function App() {
    let [fontsLoaded] = useFonts({
        IcoMoon: require('./assets/fonts/icomoon.ttf'),
    });

    return (
        <UserProvider>
            {!fontsLoaded ? <AppLoading /> : <AppEntry />}
        </UserProvider>
    );
}
