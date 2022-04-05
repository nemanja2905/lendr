import { createStackNavigator } from '@react-navigation/stack';

import RaceHome from '@components/screens/Race/RHome';
import RaceDetail from '@components/screens/Race/RDetail';
import RaceMeeting from '@components/screens/Race/RMeeting';

import Header from '@components/shared/Header';

const Stack = createStackNavigator();

function RaceStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="RHome" component={RaceHome} />
            <Stack.Screen name="RMeeting" component={RaceMeeting} />
            <Stack.Screen name="RDetail" component={RaceDetail} />
        </Stack.Navigator>
    );
}

export default RaceStack;
