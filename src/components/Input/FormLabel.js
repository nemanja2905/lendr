import {
    View,
    StyleSheet,
    Text,
    TextInput,
    Platform,
    TouchableOpacity,
} from 'react-native';

import { useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';

// Constant imports
import { colors } from '@Colors';
import { fonts } from '@Fonts';
import { config } from '@Config';
import { ThemeProvider } from '@react-navigation/native';

export default function FormLabel(props) {
    return (
        <View
            style={{
                marginVertical: 5,
                minWidth: props.width ? props.width : 100,
                display: 'flex',
                // marginStart: 10,
                flexDirection: 'row',
                alignItems: 'center',
            }}
        >
            {props.startIcon ? (
                <View
                    style={
                        props.type === 'verify'
                            ? props.verified
                                ? styles.verifiedIconContainer
                                : styles.verifyIconContainer
                            : styles.iconContainer
                    }
                >
                    <Ionicons
                        name={props.startIcon}
                        size={config.icon.size - 8}
                        color={
                            props.type === 'verify' ? 'white' : colors.grey.main
                        }
                    />
                </View>
            ) : (
                void 0
            )}

            <Text style={styles.text}>{props.label}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        flex: 1,
        color: 'white',
        fontWeight: 'bold',
        fontSize: fonts.REGULAR + 2,
    },
    verifyIconContainer: {
        width: 12,
        height: 12,
        // padding: 2,

        marginRight: 4,
        borderRadius: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    verifiedIconContainer: {
        width: 12,
        height: 12,
        // padding: 2,

        marginRight: 4,
        borderRadius: 10,
        backgroundColor: colors.success.main,
    },
    iconContainer: {
        width: 12,
        height: 12,

        marginRight: 4,
        // padding: 2,
    },
    text: {
        fontSize: fonts.REGULAR,
        fontStyle: 'italic',
    },
});
