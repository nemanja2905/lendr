import {
    View,
    StyleSheet,
    Text,
    TextInput,
    Platform,
    TouchableOpacity,
} from 'react-native';

import { useRef } from 'react';
import { Ionicons, Foundation } from '@expo/vector-icons';
// Constant imports
import { colors } from '@Colors';
import { fonts } from '@Fonts';
import { config } from '@Config';
import { FullWindowOverlay } from 'react-native-screens';

export default function MyFormHelperText(props) {
    const { children, type = undefined, ...rest } = props;
    const isError = !children || children.status === 200 ? false : true;
    const msg = children?.msg || '';
    // alert(msg);
    if (msg === '') return <></>;

    return (
        <View
            style={{
                marginHorizontal: type === 1 ? 0 : 15,
                paddingVertical: 5,

                display: 'flex',
                // marginStart: 10,
                backgroundColor: isError
                    ? colors.error.light
                    : colors.success.light,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {type === 1 ? (
                isError ? (
                    <>
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Ionicons
                                name="alert-circle"
                                size={config.icon.size}
                                color={colors.error.main}
                                style={{
                                    alignSelf: 'center',
                                    marginRight: 5,
                                }}
                            />
                            <Text style={styles.errorText}>{msg}</Text>
                        </View>
                    </>
                ) : (
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingVertical: 10,
                            paddingHorizontal: 12,
                        }}
                    >
                        {/* <Foundation
                            name="check"
                            size={config.icon.size}
                            color={colors.success.main}
                            style={{
                                alignSelf: 'center',
                                marginRight: 5,
                            }}
                        /> */}
                        <Text style={styles.successText}>{msg}</Text>
                    </View>
                )
            ) : isError ? (
                <Text style={styles.errorText}>{msg}</Text>
            ) : (
                <>
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Foundation
                            name="check"
                            size={config.icon.size}
                            color={colors.success.main}
                            style={{
                                alignSelf: 'center',
                                marginRight: 5,
                            }}
                        />
                        <Text style={styles.successText}>Success!</Text>
                    </View>
                    <Text style={styles.successText}>{msg}</Text>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    errorText: {
        color: colors.error.main,
        fontSize: fonts.REGULAR,
    },

    successText: {
        color: colors.success.main,
        fontSize: fonts.REGULAR,
    },
});
