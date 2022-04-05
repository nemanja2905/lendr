import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Modal,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    Switch,
    Alert,
    Platform,
} from 'react-native';

// Checkbox import
import BouncyCheckbox from 'react-native-bouncy-checkbox';

import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Ionicons } from '@expo/vector-icons';
import { colors } from '@Colors';
import { fonts } from '@Fonts';
import { config } from '@Config';

function Login(props) {
    let value = {};
    const [loginID, setLoginID] = useState('');
    const [password, setPassword] = useState('');
    const [allowBiometricLogin, setAllowBiometricLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(true);

    let passwordRef = useRef(null);
    let userRef = useRef(null);

    const [isBiometricSupported, setIsBiometricSupported] = useState(false);

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

    useEffect(() => {
        if (props.visible) {
            // checking if the device supports biometrics
            (async () => {
                const compatible = await LocalAuthentication.hasHardwareAsync();
                // testing to see which auth types are supported
                const savedBiometrics =
                    await LocalAuthentication.supportedAuthenticationTypesAsync();
                setIsBiometricSupported(compatible);
                try {
                    value = await AsyncStorage.getItem('@loginDetails');

                    if (value !== null) {
                        // only if the values exists then handle biometrics
                        const details = JSON.parse(value);
                        if (details) {
                            setIsEnabled(true);
                            setLoginID(details.loginID);
                            setPassword(details.password);
                            handleBiometricAuth(details);
                        }
                    }
                } catch (e) {
                    // error reading value
                }
            })();
        }

        // check if the user has login and password saved in Async Storage
    }, [props]);

    const alertComponent = (title, mess, btnTxt, btnFunc) => {
        return Alert.alert(title, mess, [
            {
                text: btnTxt,
                onPress: btnFunc,
            },
        ]);
    };

    const fallBackToDefaultAuth = () => {
        console.log('fall back to password authentication');
    };

    const handleBiometricAuth = async (details) => {
        if (isBiometricSupported) {
            const supportedBiometrics =
                await LocalAuthentication.supportedAuthenticationTypesAsync();
            const savedBiometrics = await LocalAuthentication.isEnrolledAsync();

            if (!savedBiometrics)
                return alertComponent(
                    'You need to set up your biometrics in the phone settings',
                    'Please login with your password',
                    'OK',
                    () => fallBackToDefaultAuth()
                );

            // Login with the provided biometrics
            const biometricAuth = await LocalAuthentication.authenticateAsync({
                promptMessage: 'Login with Touch id or Face id',
                cancelLabel: 'Cancel',
                disableDeviceFallback: true,
            });
            console.log(biometricAuth);
            if (biometricAuth.success) {
                console.log('Biometrics success');
                // use the user login function to log the user in
                userLogin(details.loginID, details.password);
            }
        }
    };

    const userLogin = async (userID, pass) => {
        try {
            const url = `${config.domain}/oAuth/login`;
            const response = await fetch(url, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    XAPIGTO: config.appBrand,
                },
                body: JSON.stringify({
                    username: userID,
                    password: pass,
                }),
            });

            const user = await response.json();
            if (user.ERROBJ.ERROR === 1) {
                throw new Error(user.ERROBJ.ERRORDESC);
            } else {
                if (allowBiometricLogin) {
                    // save user details to Async Storage
                    if (loginID !== '' && password !== '' && isEnabled) {
                        await AsyncStorage.setItem(
                            '@loginDetails',
                            JSON.stringify({ loginID, password })
                        );
                    }
                    setLoginID('');
                    setPassword('');
                    props.onClick(false);
                }
            }
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <View>
            <Modal
                animationType="slide"
                visible={props.visible}
                presentationStyle="pageSheet"
            >
                <View style={styles.body}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 15,
                        }}
                    >
                        <View
                            style={{
                                alignItems: 'center',
                                flex: 1,
                            }}
                        >
                            <Image
                                style={styles.image}
                                source={require('../../../assets/eb-logo.png')}
                            />
                        </View>
                        <TouchableOpacity onPress={() => props.onClick(false)}>
                            <Ionicons
                                name="close"
                                color={'white'}
                                size={config.icon.size - 5}
                            />
                        </TouchableOpacity>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            paddingVertical: 5,
                            marginTop: 20,
                            backgroundColor: colors.primary.main,
                        }}
                    >
                        <Text
                            style={{
                                fontWeight: '700',
                                fontSize: fonts.LARGE,
                            }}
                        >
                            Login to your account
                        </Text>
                    </View>

                    <View
                        style={{
                            paddingVertical: 5,
                            marginHorizontal: 20,
                            borderRadius: 10,
                            marginTop: 25,
                            backgroundColor: 'white',
                        }}
                    >
                        <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                            <Text
                                style={{
                                    paddingBottom: 5,
                                    fontSize: fonts.MEDIUM,
                                }}
                            >
                                Username
                            </Text>
                            <View style={styles.inputContainer} ref={userRef}>
                                <Ionicons
                                    name="person"
                                    size={config.icon.size}
                                    color={'black'}
                                    style={{
                                        marginHorizontal: 10,
                                        alignSelf: 'center',
                                    }}
                                />
                                <TextInput
                                    style={styles.input}
                                    value={loginID}
                                    onChangeText={setLoginID}
                                    onFocus={() => {
                                        userRef.current.setNativeProps({
                                            borderColor: colors.primary.main,
                                        });
                                    }}
                                    onBlur={() => {
                                        userRef.current.setNativeProps({
                                            borderColor: colors.grey.dark,
                                        });
                                    }}
                                    textContentType="username"
                                    placeholder="Enter your username..."
                                />
                            </View>
                        </View>

                        <View style={{ marginHorizontal: 20, marginTop: 15 }}>
                            <Text
                                style={{
                                    paddingBottom: 5,
                                    fontSize: fonts.MEDIUM,
                                }}
                            >
                                Password
                            </Text>
                            <View
                                style={styles.inputContainer}
                                ref={passwordRef}
                            >
                                <Ionicons
                                    name="lock-closed"
                                    size={config.icon.size}
                                    color={'black'}
                                    style={{
                                        marginHorizontal: 10,
                                        alignSelf: 'center',
                                    }}
                                />
                                <TextInput
                                    onChangeText={setPassword}
                                    value={password}
                                    textContentType="password"
                                    style={styles.input}
                                    onFocus={() => {
                                        passwordRef.current.setNativeProps({
                                            borderColor: colors.primary.main,
                                        });
                                    }}
                                    secureTextEntry={showPassword}
                                    onBlur={() => {
                                        passwordRef.current.setNativeProps({
                                            borderColor: colors.grey.dark,
                                        });
                                    }}
                                    placeholder="Enter your password..."
                                />
                                <TouchableOpacity
                                    onPress={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    <Ionicons
                                        name={showPassword ? 'eye' : 'eye-off'}
                                        size={config.icon.size}
                                        color={'black'}
                                        style={{
                                            marginHorizontal: 10,
                                            alignSelf: 'center',
                                        }}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View
                            style={{
                                marginHorizontal: 20,
                                marginTop: 15,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: 'row',
                                }}
                            >
                                <BouncyCheckbox
                                    onPress={toggleSwitch}
                                    isChecked={isEnabled}
                                    iconStyle={{
                                        borderRadius: 8,
                                        borderColor: colors.primary.main,
                                        backgroundColor: isEnabled
                                            ? colors.primary.main
                                            : 'white',
                                    }}
                                />
                                <Text
                                    style={{
                                        fontSize: fonts.MEDIUM,
                                        alignSelf: 'center',
                                    }}
                                >
                                    Use touch id
                                </Text>
                            </View>
                            <View
                                style={{
                                    justifyContent: 'center',
                                }}
                            >
                                <TouchableOpacity
                                    onPress={() => props.onClick(false, true)}
                                >
                                    <Text
                                        style={{
                                            fontSize: fonts.MEDIUM,
                                            textDecorationLine: 'underline',
                                        }}
                                    >
                                        Forgot your details
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ marginHorizontal: 20, marginTop: 15 }}>
                            <TouchableOpacity
                                style={styles.btn}
                                onPress={() => userLogin(loginID, password)}
                            >
                                <Text style={styles.btnText}>Log In</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View
                        style={{
                            marginHorizontal: 20,
                            marginTop: 40,
                            alignItems: 'center',
                        }}
                    >
                        <Text
                            style={{ fontSize: fonts.MEDIUM, color: 'white' }}
                        >
                            Don't have an account yet?
                        </Text>
                    </View>

                    <View style={{ marginHorizontal: 20, marginTop: 5 }}>
                        <TouchableOpacity
                            style={{
                                ...styles.btn,
                                backgroundColor: 'black',
                                borderWidth: 1,
                                paddingVertical: 5,
                                borderColor: colors.primary.main,
                                marginHorizontal: 25,
                            }}
                        >
                            <Text
                                style={{
                                    ...styles.btnText,
                                    color: colors.primary.main,
                                }}
                            >
                                Join Now
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

//keyboardType="numeric"
const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
    },
    body: {
        flex: 1,
        paddingTop: 10,
        backgroundColor: colors.black.main,
    },
    inputContainer: {
        flexDirection: 'row',
        paddingVertical: Platform.OS == 'ios' ? 10 : 5,
        borderWidth: 1,
        borderColor: colors.grey.dark,
        backgroundColor: colors.grey.light,
        borderRadius: 3,
        height: 40,
    },
    input: {
        flex: 1,
        fontSize: fonts.MEDIUM,
    },
    btn: {
        backgroundColor: colors.success.main,
        borderRadius: 5,
        alignItems: 'center',
        paddingVertical: 5,
        marginTop: 15,
        marginBottom: 20,
    },
    btnText: {
        color: 'white',
        fontWeight: '700',
    },
    image: {
        width: 135,
        height: 40,
        marginHorizontal: 'auto',
    },
});

export default Login;
