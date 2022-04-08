import React, { useEffect, useRef, useState, useContext } from 'react';
import {
    View,
    Modal,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    Platform,
} from 'react-native';

import { SvgUri } from 'react-native-svg';

import userLogin from '../../authentication/login';

import { useNavigation } from '@react-navigation/native';

// User Context
import { UserContext } from '../../context/user/UserProvider';

// Checkbox import
import BouncyCheckbox from 'react-native-bouncy-checkbox';

import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Ionicons } from '@expo/vector-icons';
import { colors } from '@Colors';
import { fonts } from '@Fonts';
import { config } from '@Config';
import ForgotPass from './ForgotPass';

function Login(props) {
    let value = {};
    const [loginID, setLoginID] = useState('');
    const [password, setPassword] = useState('');
    const [allowBiometricLogin, setAllowBiometricLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(true);
    const [error, setError] = useState('');
    const [errorLogin, setErrorLogin] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [savedBiometricType, setSavedBiometricType] = useState('');
    const [isBiometricSupported, setIsBiometricSupported] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);

    // const [forgotDetails, setForgotDetails] = useState(false);

    const { forgotDetails, setForgotDetails } = props;

    let passwordRef = useRef(null);
    let userRef = useRef(null);

    const { AddUser } = useContext(UserContext);

    const navigation = useNavigation();

    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

    useEffect(() => {
        if (props.visible) {
            // checking if the device supports biometrics
            (async () => {
                const compatible = await LocalAuthentication.hasHardwareAsync();

                // testing to see which auth types are supported
                const savedBiometrics =
                    await LocalAuthentication.supportedAuthenticationTypesAsync();
                if (savedBiometrics.length > 0) {
                    let fingerprint = false;
                    let faceid = false;
                    for (var i = 0; i < savedBiometrics.length; i++) {
                        if (savedBiometrics[i] == 1) fingerprint = true;
                        if (savedBiometrics[i] == 2) faceid = true;
                    }

                    setSavedBiometricType(
                        faceid
                            ? 'Face ID'
                            : fingerprint
                            ? 'Touch ID'
                            : 'Biometrics'
                    );
                    // if (savedBiometrics.includes[2]) {
                    //     setSavedBiometricType('Touch ID');
                    // } else if (savedBiometrics.includes[1]) {
                    //     setSavedBiometricType('Touch ID');
                    // } else {
                    //     setSavedBiometricType('Biometrics');
                    // }
                }
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

            if (biometricAuth.success) {
                // use the user login function to log the user in
                setLoading(true);
                let res = await userLogin(
                    details.loginID,
                    details.password,
                    AddUser
                );
                if (!res.success) {
                    setError(res.errorMessage);
                } else {
                    if (allowBiometricLogin) {
                        // save user details to Async Storage
                        if (details.loginID !== '' && details.password !== '') {
                        }
                        if (
                            details.loginID !== '' &&
                            details.password !== '' &&
                            isEnabled
                        ) {
                            await AsyncStorage.setItem(
                                '@loginDetails',
                                JSON.stringify({
                                    loginID: details.loginID,
                                    password: details.password,
                                })
                            );
                        }
                        // TODO: move to parent function
                        setLoginID('');
                        setPassword('');
                        props.onClick(false);
                    }
                }
                setLoading(false);
            } else if (
                !biometricAuth.success &&
                biometricAuth.error === 'user_cancel'
            ) {
                await AsyncStorage.removeItem('@loginDetails');
                setPassword('');
                setLoginID('');
            }
        }
    };

    async function userLoginCallback(loginID, password) {
        setLoading(true);

        let res = await userLogin(loginID, password, AddUser);
        if (!res.success) {
            setError(res.errorMessage);
        } else {
            if (allowBiometricLogin) {
                // save user details to Async Storage
                if (loginID !== '' && password !== '' && isEnabled) {
                    await AsyncStorage.setItem(
                        '@loginDetails',
                        JSON.stringify({
                            loginID,
                            password,
                        })
                    );
                }
                // TODO: move to parent function
                setLoginID('');
                setPassword('');
                props.onClick(false);
            }
        }
        setLoading(false);
    }

    // const userLogin = async (userID, pass) => {
    //     setLoading(true);
    //     setError('');
    //     try {
    //         const url = `${config.domain}/oAuth/login`;
    //         const response = await fetch(url, {
    //             method: 'POST',
    //             mode: 'cors',
    //             headers: {
    //                 Accept: 'application/json',
    //                 'Content-Type': 'application/json',
    //                 XAPIGTO: config.appBrand,
    //             },
    //             body: JSON.stringify({
    //                 username: userID,
    //                 password: pass,
    //             }),
    //         });

    //         const user = await response.json();
    //         if (user.ERROBJ.ERROR > 0) {
    //             setError(user.ERROBJ.ERRORDESC);
    //         } else {
    //             if (allowBiometricLogin) {
    //                 // save user details to Async Storage
    //                 if (loginID !== '' && password !== '' && isEnabled) {
    //                     await AsyncStorage.setItem(
    //                         '@loginDetails',
    //                         JSON.stringify({ loginID, password })
    //                     );
    //                 }
    //                 setLoginID('');
    //                 setPassword('');
    //                 props.onClick(false);
    //             }

    //             Login({
    //                 isLoggedIn: true,
    //                 userID: user.USERID,
    //                 accessToken: user.ACCESSTOKEN,
    //                 refreshToken: user.REFRESH_TOKEN,
    //                 activeTips: user.ACTIVETIPS,
    //                 pendingTips: user.PENDINGTIPS,
    //                 pendingBetsBal: user.PENDINGBETSBAL,
    //                 proWeb: user.PROWEB,
    //                 puntActive: user.PUNTACTIVE,
    //                 rememberMe: user.REMEMBERME,
    //                 roles: user.ROLES,
    //                 showBalance: user.SHOWBALANCE,
    //                 singleTap: user.SINGLETAP,
    //                 verified: user.VERIFIED,
    //             });
    //         }
    //     } catch (e) {
    //         setError('Login details incorrect');
    //         setLoading(false);
    //     }

    //     setLoading(false);
    // };

    function _JoinNow() {
        props.onClick(false);
        navigation.navigate('Root-More', {
            screen: 'Join',
        });
    }

    // function LoginComponent() {
    //     return (

    //     );
    // }
    return (
        <View>
            <Modal
                animationType="slide"
                visible={props.visible}
                presentationStyle="pageSheet"
            >
                <ScrollView style={styles.body}>
                    <View
                        style={{
                            flexDirection: 'row',
                            paddingHorizontal: 15,
                        }}
                    >
                        {forgotDetails ? (
                            <TouchableOpacity
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 20,
                                }}
                                onPress={() => setForgotDetails(false)}
                            >
                                <Ionicons
                                    name="chevron-back"
                                    color="white"
                                    size={25}
                                />
                            </TouchableOpacity>
                        ) : (
                            <View
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 20,
                                }}
                            ></View>
                        )}
                        <View
                            style={{
                                alignItems: 'center',
                                flex: 1,
                                maxHeight: 40,
                                paddingLeft: 0,
                            }}
                        >
                            {/* <Image
                                style={styles.image}
                                source={require('../../../assets/eb-logo.png')}
                            /> */}
                            <SvgUri
                                width={'50%'}
                                height={'95%'}
                                uri={
                                    'https://cdnstage.thegreattipoff.com/eb/images/logo/logo.svg'
                                }
                            />
                        </View>
                        <TouchableOpacity
                            style={{
                                flex: 0.1,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            onPress={() => {
                                props.onClick(false);
                                setForgotDetails(false);
                            }}
                        >
                            <Ionicons
                                name="close"
                                color={'white'}
                                size={config.icon.size + 10}
                            />
                        </TouchableOpacity>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            paddingVertical: 3,
                            marginTop: 20,
                            backgroundColor: colors.primary.main,
                        }}
                    >
                        <Text
                            style={{
                                fontWeight: '700',
                                fontSize: fonts.HEADING - 1,
                            }}
                        >
                            {forgotDetails
                                ? 'Recover your login details'
                                : 'Login to your account'}
                        </Text>
                    </View>

                    {forgotDetails ? (
                        <ForgotPass setForgotDetails={setForgotDetails} />
                    ) : (
                        <>
                            <View
                                style={{
                                    paddingVertical: 5,
                                    marginHorizontal: 20,
                                    borderRadius: 10,
                                    marginTop: 25,
                                    backgroundColor: 'white',
                                }}
                            >
                                <View
                                    style={{
                                        marginHorizontal: 20,
                                        marginTop: 20,
                                    }}
                                >
                                    <Text
                                        style={{
                                            paddingBottom: 5,
                                            fontSize: fonts.MEDIUM,
                                        }}
                                    >
                                        Username
                                    </Text>
                                    <View
                                        style={{
                                            ...styles.inputContainer,
                                            borderColor: errorLogin
                                                ? 'red'
                                                : colors.grey.dark,
                                        }}
                                        ref={userRef}
                                    >
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
                                                    borderColor:
                                                        colors.primary.main,
                                                });
                                            }}
                                            onChange={() => {
                                                if (
                                                    loginID !== '' &&
                                                    errorLogin
                                                ) {
                                                    setErrorLogin(false);
                                                }
                                            }}
                                            onBlur={() => {
                                                userRef.current.setNativeProps({
                                                    borderColor:
                                                        colors.grey.dark,
                                                });

                                                if (
                                                    loginID !== '' &&
                                                    errorLogin
                                                ) {
                                                    setErrorLogin(false);
                                                }
                                            }}
                                            textContentType="username"
                                            placeholder="Enter your username..."
                                        />
                                    </View>
                                    {errorLogin && (
                                        <View
                                            style={{
                                                backgroundColor:
                                                    colors.error.light,
                                                marginTop: 8,
                                                paddingVertical: 8,
                                                paddingHorizontal: 10,
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: colors.error.main,
                                                    fontSize: fonts.REGULAR,
                                                }}
                                            >
                                                Username is required.
                                            </Text>
                                        </View>
                                    )}
                                </View>

                                <View
                                    style={{
                                        marginHorizontal: 20,
                                        marginTop: 15,
                                    }}
                                >
                                    <Text
                                        style={{
                                            paddingBottom: 5,
                                            fontSize: fonts.MEDIUM,
                                        }}
                                    >
                                        Password
                                    </Text>
                                    <View
                                        style={{
                                            ...styles.inputContainer,
                                            borderColor: errorPassword
                                                ? 'red'
                                                : colors.grey.dark,
                                        }}
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
                                                passwordRef.current.setNativeProps(
                                                    {
                                                        borderColor:
                                                            colors.primary.main,
                                                    }
                                                );
                                            }}
                                            secureTextEntry={showPassword}
                                            onChange={() => {
                                                if (
                                                    password !== '' &&
                                                    errorPassword &&
                                                    !errorLogin
                                                ) {
                                                    setErrorPassword(false);
                                                    setError('');
                                                }
                                            }}
                                            onBlur={() => {
                                                passwordRef.current.setNativeProps(
                                                    {
                                                        borderColor:
                                                            colors.grey.dark,
                                                    }
                                                );

                                                if (
                                                    password !== '' &&
                                                    errorPassword &&
                                                    !errorLogin
                                                ) {
                                                    setErrorPassword(false);
                                                    setError('');
                                                }
                                            }}
                                            placeholder="Enter your password..."
                                        />
                                        <TouchableOpacity
                                            onPress={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            style={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Ionicons
                                                name={
                                                    showPassword
                                                        ? 'eye'
                                                        : 'eye-off'
                                                }
                                                size={config.icon.size}
                                                color={colors.grey.main}
                                                style={{
                                                    marginHorizontal: 10,
                                                    alignSelf: 'center',
                                                }}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    {(error !== '' || errorPassword) && (
                                        <View
                                            style={{
                                                backgroundColor:
                                                    colors.error.light,

                                                paddingVertical: 8,
                                                paddingHorizontal: 10,
                                                marginTop: 10,

                                                borderRadius: 3,
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: colors.error.main,
                                                    fontSize: fonts.REGULAR,
                                                }}
                                            >
                                                {errorPassword
                                                    ? 'Password is required.'
                                                    : error}
                                            </Text>
                                        </View>
                                    )}
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
                                            iconComponent={
                                                isEnabled ? (
                                                    <Ionicons
                                                        name="checkmark"
                                                        color="green"
                                                        size={20}
                                                    />
                                                ) : (
                                                    <></>
                                                )
                                            }
                                            iconStyle={{
                                                borderRadius: 5,
                                                borderColor: colors.grey.main,
                                                backgroundColor: 'white',
                                            }}
                                        />
                                        {/* <View
                                style={{
                                    borderWidth: 1,
                                    height: 50,
                                    width: 50,
                                }}
                            >
                                <Checkbox
                                    status={isEnabled ? 'checked' : 'unchecked'}
                                    onPress={toggleSwitch}
                                    color={colors.primary.main}
                                />
                            </View> */}
                                        <Text
                                            style={{
                                                fontSize: fonts.MEDIUM,
                                                alignSelf: 'center',
                                            }}
                                        >
                                            Use {savedBiometricType}
                                        </Text>
                                    </View>
                                    <TouchableOpacity
                                        style={{
                                            justifyContent: 'center',
                                        }}
                                        onPress={() => setForgotDetails(true)}
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

                                <View
                                    style={{
                                        marginHorizontal: config.margin.body,
                                        marginTop: 15,
                                    }}
                                >
                                    <TouchableOpacity
                                        style={{
                                            ...styles.btn,
                                            marginBottom: 20,
                                            backgroundColor: loading
                                                ? colors.grey.dark
                                                : colors.success.main,
                                        }}
                                        onPress={() => {
                                            if (
                                                loginID !== '' &&
                                                password !== '' &&
                                                !loading
                                            ) {
                                                userLoginCallback(
                                                    loginID,
                                                    password
                                                );
                                            } else {
                                                if (loginID === '')
                                                    setErrorLogin(true);
                                                if (password === '')
                                                    setErrorPassword(true);
                                            }
                                        }}
                                    >
                                        <View style={{ flexDirection: 'row' }}>
                                            {loading ? (
                                                <>
                                                    <View
                                                        style={{
                                                            alignItems:
                                                                'center',
                                                            justifyContent:
                                                                'center',
                                                        }}
                                                    >
                                                        <ActivityIndicator
                                                            size={'small'}
                                                            color="grey"
                                                        />
                                                    </View>
                                                    <Text
                                                        style={{
                                                            ...styles.btnText,
                                                            color: !loading
                                                                ? 'grey'
                                                                : 'white',
                                                            marginLeft: 10,
                                                        }}
                                                    >
                                                        Please wait...
                                                    </Text>
                                                </>
                                            ) : (
                                                <Text
                                                    style={{
                                                        ...styles.btnText,
                                                        color: 'white',
                                                    }}
                                                >
                                                    Log In
                                                </Text>
                                            )}
                                        </View>
                                        {/* <Text style={styles.btnText}>Log In</Text> */}
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
                                    style={{
                                        fontSize: fonts.MEDIUM,
                                        color: 'white',
                                    }}
                                >
                                    Don't have an account yet?
                                </Text>
                            </View>

                            <View
                                style={{ marginHorizontal: 20, marginTop: 5 }}
                            >
                                <TouchableOpacity
                                    style={{
                                        ...styles.btn,
                                        backgroundColor: 'black',
                                        borderWidth: 1,
                                        paddingVertical: 8,
                                        borderColor: colors.primary.main,
                                        marginHorizontal: 25,
                                    }}
                                    onPress={_JoinNow}
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
                        </>
                    )}
                </ScrollView>
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
        paddingVertical: 10,
        borderBottomWidth: 1,
        marginTop: 15,
    },
    btnText: {
        color: 'white',
        fontWeight: '700',
        fontSize: fonts.EXTRA_LARGE,
    },
    image: {
        width: 135,
        height: 40,
        marginHorizontal: 'auto',
    },
});

export default Login;
