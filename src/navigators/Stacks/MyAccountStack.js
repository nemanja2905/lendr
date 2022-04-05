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
import AccountNavigationMenu from '../../components/MyAccount/AccountNavigationMenu';
import GamblingDepositLimit from '../../components/MyAccount/GamblingDepositLimit';
import GamblingSelfExclude from '../../components/MyAccount/GamblingSelfExclude';
const Stack = createStackNavigator();

function Index() {
    return <View></View>;
}
export default function MyAccountStack() {
    return (
        <Stack.Navigator
            screenOptions={({ route }) => {
                return {
                    // header: () => <SubHeader />,
                    // // component: () => (
                    // //     <View>
                    // //         <Text>A</Text>
                    // //     </View>
                    // // ),
                    // headerShown: true,
                    // cardOverlayEnabled: true,
                    // cardStyle: {
                    //     backgroundColor: 'white',
                    //     transform: [{ translateY: -30 }],
                    // },
                    headerShown: false,
                };
            }}
        >
            <Stack.Screen name="index" component={Index} />
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
            <Stack.Screen name="navmenu" component={AccountNavigationMenu} />
        </Stack.Navigator>
    );
}
