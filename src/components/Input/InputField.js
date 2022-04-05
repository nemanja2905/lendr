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

function InputField(props) {
    let inputRef = useRef();
    // console.log('InputField, (name, disabled) ', props.name, props.disabled);
    return (
        <View
            style={{
                marginTop: 5,
                minWidth: props.width ? props.width : 100,
            }}
            {...props.style}
        >
            {props.label && (
                <Text style={styles.label}>
                    {props.label}
                    {props.important && (
                        <Text style={{ color: 'darkmagenta' }}>&nbsp;*</Text>
                    )}
                </Text>
            )}
            <View
                ref={inputRef}
                style={
                    props.errors
                        ? {
                              ...styles.textInputContainer,
                              borderColor: colors.error.main,
                          }
                        : props.disabled
                        ? {
                              ...styles.textInputContainer,
                              backgroundColor: colors.grey.light,
                              //   borderColor: colors.success.main,
                          }
                        : {
                              ...styles.textInputContainer,
                              //   borderColor: colors.success.main,
                          }
                }
            >
                {props.startIcon &&
                    (props.startIcon == 'dollar' ? (
                        <Text style={{ alignSelf: 'center', marginRight: 8 }}>
                            $
                        </Text>
                    ) : (
                        <Ionicons
                            name={props.startIcon}
                            size={config.icon.size - 2}
                            color={'black'}
                            style={{
                                marginRight: 8,
                                alignSelf: 'center',
                                marginVertical: 0,
                                paddingVertical: 0,
                            }}
                        />
                    ))}
                {props.field && props.field == 'btn' ? (
                    <TouchableOpacity
                        style={{ flex: 1 }}
                        onPress={props.onClick}
                    >
                        <Text
                            style={{
                                ...styles.input,
                            }}
                        >
                            {props.value}
                        </Text>
                    </TouchableOpacity>
                ) : (
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
                            if (props.onBlur) props.onBlur();
                        }}
                        editable={props.disabled && false}
                        selectTextOnFocus={props.disabled && false}
                        placeholder={props.placeholder}
                        style={styles.input}
                        keyboardType={props.type ? props.type : 'default'}
                        value={props.value}
                        onChangeText={props.onChange}
                        secureTextEntry={
                            props.password ? props.showPassword : false
                        }
                    />
                )}
                {props.errors && (
                    <Ionicons
                        name={'alert-circle'}
                        size={config.icon.size}
                        color={colors.error.main}
                        style={{
                            marginHorizontal: 5,
                            alignSelf: 'center',
                        }}
                    />
                )}
                {props.endIcon &&
                    !props.errors &&
                    (props.password ? (
                        <TouchableOpacity
                            onPress={() =>
                                props.setShowPassword(!props.showPassword)
                            }
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
                    ))}
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
        paddingVertical: Platform.OS == 'ios' ? 8 : 3,
        paddingHorizontal: 15,
        borderRadius: 3,
        backgroundColor: colors.error.light,
    },
    errorText: {
        color: colors.error.main,
        fontSize: fonts.REGULAR,
    },
});

export default InputField;
