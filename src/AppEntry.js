import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootDrawer from './navigators/RootDrawer';

export default function AppEntry() {
    return (
        <NavigationContainer>
            <RootDrawer />
        </NavigationContainer>
    );
}
