import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { colors } from '@Colors';
import { config } from '@Config';
import { fonts } from '@Fonts';
import SubHeader from '../../components/Common/SubHeader';
import AccountNavigation from '../../components/MyAccount/AccountNavigation';
import AccountMyDetail from '../../components/MyAccount/AccountMyDetail';
import AccountUserSettings from '../../components/MyAccount/AccountUserSettings';
import AccountChangePassword from '../../components/MyAccount/AccountChangePassword';
import AccountBenefitsRewards from '../../components/MyAccount/AccountBenefitsRewards';
import AccountVerification from '../../components/MyAccount/AccountVerification';
import AccountGambling from '../../components/MyAccount/AccountGambling';
import AccountForotPassword from '../../components/MyAccount/AccountForgotPassword';

import GamblingDepositLimit from '../../components/MyAccount/GamblingDepositLimit';
import GamblingSelfExclude from '../../components/MyAccount/GamblingSelfExclude';
import HeaderLeft from '../../components/shared/HeaderLeft';
import HeaderRight from '../../components/shared/HeaderRight';
import HeaderRight2 from '../../components/shared/HeaderRight2';
const Stack = createStackNavigator();

function Index() {
    return <View></View>;
}
export default function MyAccountStack() {
    return (
        <Stack.Navigator
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
                    headerRight: () => <HeaderRight2 route={route} />,

                    headerTitle: '',
                };
            }}
        >
            <Stack.Screen name="index" component={AccountNavigation} />
            <Stack.Screen name="navigation" component={AccountNavigation} />
            <Stack.Screen
                name="mydetails"
                initialParams={{ title: 'My Detail' }}
                component={AccountMyDetail}
            />
            <Stack.Screen name="password" component={AccountChangePassword} />
            <Stack.Screen name="usersettings" component={AccountUserSettings} />
            <Stack.Screen
                name="benefitsrewards"
                component={AccountBenefitsRewards}
            />
            <Stack.Screen name="verification" component={AccountVerification} />
            <Stack.Screen name="gambling" component={AccountGambling} />

            <Stack.Screen
                name="forgotPassword"
                component={AccountForotPassword}
            />
            <Stack.Screen name="selfexclude" component={GamblingSelfExclude} />
            <Stack.Screen
                name="depositlimit"
                component={GamblingDepositLimit}
            />
        </Stack.Navigator>
    );
}
