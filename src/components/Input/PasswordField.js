import {
    View,
    StyleSheet,
    Text,
    TextInput,
    Platform,
    TouchableOpacity,
} from 'react-native';

import { useRef, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
// Constant imports
import { colors } from '@Colors';
import { fonts } from '@Fonts';
import { config } from '@Config';

export default function PasswordField(props) {
    const [showPassword, setShowPassword] = useState(false);
    let inputRef = useRef();
    return (
        <View
            style={{
                marginTop: 5,
                minWidth: props.width ? props.width : 100,
            }}
        >
            {props.label && <Text style={styles.label}>{props.label}</Text>}
            <View
                ref={inputRef}
                style={
                    props.errors
                        ? {
                              ...styles.textInputContainer,
                              borderColor: colors.error.main,
                          }
                        : styles.textInputContainer
                }
            >
                <TextInput
                    onFocus={() =>
                        inputRef.current.setNativeProps({
                            borderColor: colors.success.main,
                            backgroundColor: colors.white.main,
                        })
                    }
                    onBlur={() => {
                        inputRef.current.setNativeProps({
                            borderColor: colors.grey.dark,
                            // backgroundColor: colors.grey.light,
                        });
                        props.onBlur();
                    }}
                    placeholder={props.placeholder}
                    style={styles.input}
                    keyboardType="default"
                    type="password"
                    value={props.value}
                    onChangeText={props.onChange}
                    secureTextEntry={!showPassword}
                />
                {props.endIcon ? (
                    props.endAction ? (
                        <TouchableOpacity
                            onPress={props.endAction}
                            style={{
                                justifyContent: 'center',
                            }}
                        >
                            <Ionicons
                                name={props.endIcon}
                                size={config.icon.size}
                                color={colors.grey.main}
                                style={{
                                    alignSelf: 'center',
                                }}
                            />
                        </TouchableOpacity>
                    ) : (
                        <Ionicons
                            name={props.endIcon}
                            size={config.icon.size}
                            color={colors.grey.main}
                            style={{
                                alignSelf: 'center',
                            }}
                        />
                    )
                ) : (
                    <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                        style={{
                            justifyContent: 'center',
                        }}
                    >
                        <Ionicons
                            name={showPassword ? 'eye' : 'eye-off'}
                            size={config.icon.size}
                            color={colors.grey.main}
                            style={{
                                alignSelf: 'center',
                            }}
                        />
                    </TouchableOpacity>
                )}
            </View>

            {props.errors && props.errors !== '' && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{props.errors}</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    label: {
        fontSize: fonts.MEDIUM,
    },
    textInputContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 5,
        // backgroundColor: colors.grey.light,
        borderColor: colors.grey.dark,
        paddingVertical: Platform.OS == 'ios' ? 8 : 3,
        paddingStart: 15,
        paddingEnd: 5,
        height: 40,
    },
    input: {
        flex: 1,
        fontSize: fonts.REGULAR + 1,
    },
    errorContainer: {
        marginTop: 10,
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 3,
        backgroundColor: colors.error.light,
    },
    errorText: {
        color: colors.error.main,
        fontSize: fonts.REGULAR,
    },
});
