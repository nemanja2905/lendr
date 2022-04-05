import { Platform } from 'react-native';

import { useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';

// Constant imports
import { colors } from '@Colors';
import { fonts } from '@Fonts';
import { config } from '@Config';
import { ThemeProvider } from '@react-navigation/native';
// import { Switch } from 'react-native-switch';
import { Switch } from './Switch';

export default function CustomSwitch(props) {
    return (
        <Switch
            backgroundActive={colors.track.main}
            backgroundInactive={colors.grey.light}
            thumbColor={'#f4f3f4'}
            activeText={'YES'}
            circleBorderWidth={0}
            circleSize={28}
            switchWidthMultiplier={2.2}
            inActiveText={'       '}
            style={{
                transform: [
                    {
                        scaleX: Platform.OS == 'ios' ? 0.7 : 1,
                    },
                    {
                        scaleY: Platform.OS == 'ios' ? 0.7 : 1,
                    },
                ],
            }}
            ios_backgroundColor={colors.grey.light}
            onValueChange={props.onChange}
            value={props.value}
        />
    );
}
