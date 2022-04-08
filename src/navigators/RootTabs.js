import React, { useState, useCallback, useEffect, useContext } from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '@components/screens/Home';
import HeaderRight from '@components/shared/HeaderRight';
import HeaderRight2 from '@components/shared/HeaderRight2';
import HeaderLeft from '@components/shared/HeaderLeft';

import { colors } from '@Colors';
import { config } from '@Config';

import DrawerStack from './Stacks/DrawerStack';
import RaceStack from './Stacks/RacingStack';

import CustomIcon from '@components/Icon/Icon';
import MyAccountStack from './Stacks/MyAccountStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../context/user/UserProvider';
const Tab = createBottomTabNavigator();

function SettingsScreen() {
    return (
        <View>
            <Text>Settings</Text>
        </View>
    );
}

export default function RootTabs(props) {
    const { user } = useContext(UserContext);
    // console.log('RootTabs user=', user);
    const [userInfo, setUserInfo] = useState({});
    const loadUserInfo = useCallback(async () => {
        const value = await AsyncStorage.getItem('@userInfo');
        const userInfo2 = JSON.parse(value);
        // console.log('RootTabs::, userInfo2=', userInfo2);
        console.log(
            'userInfo=',
            userInfo.CLIENTID,
            ',userinfo2=',
            userInfo2.CLIENTID
        );
        if (userInfo2.CLIENTID !== userInfo.CLIENTID || userInfo === {}) {
            setUserInfo(userInfo2);
        }
    }, []);
    let interval;
    // console.log('RootTabs userInfo=', userInfo);
    useEffect(() => {
        interval = setInterval(() => {
            if (!userInfo.CLIENTID || userInfo.CLIENTID === undefined) {
                loadUserInfo();
            } else {
                // console.log('Cleared');
                return () => clearInterval(interval);
            }
        }, 3000);
        return () => clearInterval(interval);
    }, [userInfo]);

    // console.log('RootTabs prop=', props);
    return (
        <Tab.Navigator
            screenOptions={({ route }) => {
                return {
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconname;

                        if (route.name === 'Home') {
                            iconname = focused ? 'home' : 'home';
                        } else if (route.name === 'Root-Sports') {
                            iconname = focused ? 'sports' : 'sports';
                        } else if (route.name === 'Root-More') {
                            iconname = focused ? 'menu' : 'menu';
                            return (
                                <CustomIcon
                                    name={iconname}
                                    size={size - 4}
                                    color={color}
                                />
                            );
                        } else if (route.name == 'Root-Notifications') {
                            iconname = focused ? 'alarm' : 'alarm';
                        } else if (route.name == 'Root-Racing') {
                            iconname = focused ? 'horse' : 'horse';
                        }

                        return (
                            <CustomIcon
                                name={iconname}
                                size={size}
                                color={color}
                            />
                        );
                    },
                    tabBarActiveTintColor: colors.primary.main,
                    tabBarInactiveTintColor: 'gray',
                    headerStyle: {
                        backgroundColor: config.header.headerColor,
                    },
                    //header: (navigation, route, back) => <Header back={back} />, // if you want to add a custom Header
                    headerTintColor: 'white',
                    headerLeft: () => <HeaderLeft route={route} />,
                    headerRight: () =>
                        user.isLoggedIn === false ? (
                            <HeaderRight route={route} />
                        ) : (
                            <HeaderRight2 route={route} userInfo={userInfo} />
                        ),
                    headerTitle: '',
                };
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={() => {
                    return {
                        title: 'Home',
                    };
                }}
            />
            <Tab.Screen
                name="Root-Racing"
                options={() => {
                    return {
                        title: 'Racing',
                    };
                }}
                component={RaceStack}
            />
            <Tab.Screen
                name="Root-Sports"
                component={SettingsScreen}
                options={() => {
                    return {
                        title: 'Sports',
                    };
                }}
            />

            <Tab.Screen
                name="Root-Notifications"
                options={() => {
                    return {
                        title: 'Next up',
                    };
                }}
                component={SettingsScreen}
            />
            <Tab.Screen
                name="Root-More"
                component={DrawerStack}
                listeners={({ navigation }) => ({
                    tabPress: (e) => {
                        e.preventDefault();
                        navigation.openDrawer();
                    },
                })}
                options={() => {
                    return { title: 'More' };
                }}
            />
            {/* <Tab.Screen
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
            /> */}
        </Tab.Navigator>
    );
}
