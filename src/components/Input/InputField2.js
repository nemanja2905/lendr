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

export default function InputField2(props) {
    let inputRef = useRef();
    const [isFocused, setFocused] = useState(false);
    // if (props.name === 'email') {
    //     console.log('InputField2, email, ', props.errors);
    // }
    return (
        <View
            style={{
                marginTop: 5,
                minWidth: props.width ? props.width : 100,
            }}
            {...props.style}
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
                    onFocus={() => {
                        inputRef.current.setNativeProps({
                            borderColor: colors.success.main,
                            backgroundColor: colors.white.main,
                        });
                        setFocused(true);
                    }}
                    onBlur={() => {
                        props.onBlur();
                        inputRef.current.setNativeProps({
                            borderColor: colors.grey.dark,
                            backgroundColor: colors.grey.light,
                        });

                        setFocused(false);
                    }}
                    disabled={props.disabled}
                    placeholder={props.placeholder}
                    style={styles.input}
                    keyboardType={props.type ? props.type : 'default'}
                    value={props.value}
                    onChangeText={props.onChange}
                    secureTextEntry={
                        props.password ? props.showPassword : false
                    }
                />
                {isFocused ? (
                    <TouchableOpacity
                        onPress={() => props.endAction()}
                        style={{
                            justifyContent: 'center',
                        }}
                    >
                        <Ionicons
                            name="close-circle"
                            size={config.icon.size}
                            color={colors.grey.main}
                            style={{
                                alignSelf: 'center',
                            }}
                        />
                    </TouchableOpacity>
                ) : props.errors ? (
                    <Ionicons
                        name="alert-circle"
                        size={config.icon.size}
                        color={colors.error.main}
                        style={{
                            alignSelf: 'center',
                        }}
                    />
                ) : props.value === '' ? (
                    void 0
                ) : (
                    <Ionicons
                        name="checkmark-circle"
                        size={config.icon.size}
                        color={colors.success.main}
                        style={{
                            alignSelf: 'center',
                        }}
                    />
                )}
            </View>
            {props.errors && (
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
        backgroundColor: 'white',
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
