import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

// Constant imports
import { colors } from '@Colors';
import { fonts } from '@Fonts';
import { config } from '@Config';

import InputField from '@components/Input/InputField';

import { Ionicons } from '@expo/vector-icons';

function LoginDetails({
    formState,
    setFormState,
    errors,
    setErrors,
    fieldValidation,
    submitForm,
}) {
    const [showPassword, setShowPassword] = useState(true);
    const handleChange = async (text, field) => {
        setFormState({ ...formState, [field]: text });
    };

    // error management happens on blur
    const handleBlur = (field) => {
        fieldValidation(field);
    };

    let totalErrors = 0;
    Object.values(errors).forEach((item) => {
        if (item !== '') totalErrors++;
    });

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Create your login details</Text>
            <View style={styles.inputContainer}>
                <InputField
                    placeholder="Min 6 characters"
                    label="Username *"
                    startIcon={'person'}
                    errors={errors.loginID == '' ? null : errors.loginID}
                    value={formState.loginID}
                    onChange={(val) => handleChange(val, 'loginID')}
                    onBlur={() => handleBlur('loginID')}
                />
            </View>
            <View style={styles.inputContainer}>
                <InputField
                    placeholder="Minimum 6 characters"
                    label="Password *"
                    startIcon={'lock-closed'}
                    endIcon={showPassword ? 'eye' : 'eye-off'}
                    errors={errors.password == '' ? null : errors.password}
                    value={formState.password}
                    onChange={(val) => handleChange(val, 'password')}
                    onBlur={() => handleBlur('password')}
                    password={true}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                />

                {formState.password.length > 0 && (
                    <View style={{ marginHorizontal: 20, marginTop: 10 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Ionicons
                                name={'checkmark-circle'}
                                size={config.icon.size - 2}
                                color={
                                    /[a-z].*[A-Z]|[A-Z].*[a-z]/.test(
                                        formState.password
                                    )
                                        ? colors.success.main
                                        : 'grey'
                                }
                                style={{
                                    marginRight: 5,
                                    alignSelf: 'center',
                                    marginVertical: 0,
                                    paddingVertical: 0,
                                }}
                            />
                            <Text style={styles.pText}>
                                Includes lower and upper case letters
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Ionicons
                                name={'checkmark-circle'}
                                size={config.icon.size - 2}
                                color={
                                    /[0-9]/.test(formState.password)
                                        ? colors.success.main
                                        : 'grey'
                                }
                                style={{
                                    marginRight: 5,
                                    alignSelf: 'center',
                                    marginVertical: 0,
                                    paddingVertical: 0,
                                }}
                            />
                            <Text style={styles.pText}>
                                Includes at least one number
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Ionicons
                                name={'checkmark-circle'}
                                size={config.icon.size - 2}
                                color={
                                    formState.password.length >= 6
                                        ? colors.success.main
                                        : 'grey'
                                }
                                style={{
                                    marginRight: 5,
                                    alignSelf: 'center',
                                    marginVertical: 0,
                                    paddingVertical: 0,
                                }}
                            />
                            <Text style={styles.pText}>
                                Must be 6 or more characters
                            </Text>
                        </View>
                    </View>
                )}
            </View>

            <View>
                <TouchableOpacity style={styles.joinBtn} onPress={submitForm}>
                    <Text style={styles.joinBtnText}>Join</Text>
                </TouchableOpacity>
                {totalErrors != 0 && (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>
                            Please fill in all mandatory fields
                        </Text>
                    </View>
                )}
            </View>

            <View style={styles.ackContainer}>
                <Text style={styles.ackText}>
                    By clicking "Join", I acknowlege that I am over 18 and have
                    read and agreed to the{' '}
                    <TouchableOpacity>
                        <Text
                            style={{
                                ...styles.ackText,
                                textDecorationLine: 'underline',
                            }}
                        >
                            Terms & Conditions
                        </Text>
                    </TouchableOpacity>{' '}
                    and{' '}
                    <TouchableOpacity>
                        <Text
                            style={{
                                ...styles.ackText,
                                textDecorationLine: 'underline',
                            }}
                        >
                            Privacy Policy.
                        </Text>
                    </TouchableOpacity>
                </Text>
            </View>

            <View style={{ marginTop: 25, marginBottom: 15 }}>
                <Text style={{ textAlign: 'center', fontSize: fonts.REGUALR }}>
                    Already have an account?
                </Text>
                <TouchableOpacity>
                    <Text
                        style={{
                            textDecorationLine: 'underline',
                            textAlign: 'center',
                            fontSize: fonts.REGUALR,
                            fontWeight: 'bold',
                        }}
                    >
                        Log In
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white.main,
        marginHorizontal: config.margin.body,
        borderRadius: 3,
        padding: 15,
        marginTop: config.margin.body,
    },
    header: {
        fontWeight: 'bold',
        fontSize: fonts.LARGE,
    },

    inputContainer: { marginTop: 10 },

    joinBtn: {
        backgroundColor: colors.success.main,
        alignItems: 'center',
        borderRadius: 3,
        paddingVertical: 5,
        marginTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: colors.black.main,
    },

    joinBtnText: {
        fontSize: fonts.LARGE,
        color: 'white',
        fontWeight: 'bold',
    },

    ackContainer: {
        borderWidth: 1,
        borderColor: colors.grey.dark,
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 15,
        marginTop: 25,
        borderRadius: 3,
    },

    ackText: {
        fontSize: fonts.REGULAR - 1,
        textAlign: 'center',
    },

    pText: {
        fontSize: fonts.REGULAR,
        fontStyle: 'italic',
        color: colors.grey.main,
        textAlignVertical: 'center',
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

export default LoginDetails;
