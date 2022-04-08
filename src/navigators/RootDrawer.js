import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import RootTabs from './RootTabs';
import MyAccountStack from './Stacks/MyAccountStack';
import Join from '@components/Join/Join';
import PromotionPage from '../components/screens/Promotion/PromotionPage';
import ForgotPassword from '../components/screens/Login/ForgotPassword';

const Drawer = createDrawerNavigator();

function NullComponent() {
    return null;
}

export default function RootDrawer() {
    return (
        <Drawer.Navigator
            screenOptions={{
                drawerType: 'front',
                headerShown: false,
            }}
        >
            <Drawer.Screen
                name="HomeDrawer"
                component={RootTabs}
                options={{ title: 'Home' }}
                listeners={({ navigation }) => ({
                    drawerItemPress: (e) => {
                        e.preventDefault();
                        navigation.closeDrawer();
                        navigation.navigate('Root-More');
                    },
                })}
            />
            <Drawer.Screen
                name="PromotionPage"
                component={PromotionPage}
                options={{ title: 'PromotionPage' }}
                listeners={({ navigation }) => ({
                    drawerItemPress: (e) => {
                        e.preventDefault();
                        navigation.closeDrawer();
                        navigation.navigate('PromotionPage');
                    },
                })}
            />
            <Drawer.Screen
                name="MyAccount"
                component={MyAccountStack}
                listeners={({ navigation }) => ({
                    tabPress: (e) => {
                        e.preventDefault();
                        navigation.openDrawer();
                    },
                })}
            />

            {/**
             * <Tab.Screen
                name="MyAccount"
                component={MyAccountStack}
                listeners={({ navigation }) => ({
                    tabPress: (e) => {
                        e.preventDefault();
                        navigation.openDrawer();
                    },
                })}
                options={() => {
                    return { title: 'MyAccount - Index' };
                }}
            />
             */}

            {/* <Drawer.Screen
                name="ForgotPassword"
                component={ForgotPassword}
                options={{ title: 'ForgotPassword' }}
                listeners={({ navigation }) => ({
                    drawerItemPress: (e) => {
                        e.preventDefault();
                        navigation.closeDrawer();
                        navigation.navigate('ForgotPassword');
                    },
                })}
            /> */}
            <Drawer.Screen
                name="RacingDrawer"
                component={NullComponent}
                options={{ title: 'Racing' }}
                listeners={({ navigation }) => ({
                    drawerItemPress: (e) => {
                        e.preventDefault();
                        navigation.closeDrawer();
                        navigation.navigate('Root-Racing');
                    },
                })}
            />
            <Drawer.Screen
                name="SportsDrawer"
                component={NullComponent}
                options={{ title: 'Sports' }}
                listeners={({ navigation }) => ({
                    drawerItemPress: (e) => {
                        e.preventDefault();
                        navigation.closeDrawer();
                        navigation.navigate('Root-Sports');
                    },
                })}
            />
            <Drawer.Screen
                name="AlertDrawer"
                component={NullComponent}
                options={{ title: 'Alerts' }}
                listeners={({ navigation }) => ({
                    drawerItemPress: (e) => {
                        e.preventDefault();
                        navigation.closeDrawer();
                        navigation.navigate('Root-Notifications');
                    },
                })}
            />
            <Drawer.Screen
                name="JoinDrawer"
                component={NullComponent}
                options={{ title: 'Join' }}
                listeners={({ navigation }) => ({
                    drawerItemPress: (e) => {
                        e.preventDefault();
                        navigation.closeDrawer();
                        navigation.navigate('Root-More', { screen: 'Join' });
                    },
                })}
            />
        </Drawer.Navigator>
    );
}
