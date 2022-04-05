import { createStackNavigator } from '@react-navigation/stack';

import Join from '@components/Join/Join';
import MyAccount from '@components/MyAccount/MyAccount';
const Stack = createStackNavigator();

function NullComp() {
    return;
}

function Account() {
    return <View>Account</View>;
}
function Promotions() {
    return <View>Promotions</View>;
}
function Settings() {
    return <View>Settings</View>;
}
function DrawerStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Account" component={Account} />
            <Stack.Screen name="MyAccount" component={MyAccount} />
            <Stack.Screen name="Join" component={Join} />
            <Stack.Screen name="Promotions" component={Promotions} />
            <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
    );
}

export default DrawerStack;
