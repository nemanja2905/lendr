import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Platform, ActivityIndicator } from 'react-native';

import { colors } from '@Colors';
import { fonts } from '@Fonts';
import { config } from '@Config';

function ForgotPass({ setForgotDetails }) {
    const dateRef = useRef();
    const monthRef = useRef();
    const yearRef = useRef();

    const [emailMob, setEmailMob] = useState('');
    const [searchAccount, setSearchAccount] = useState(true);

    const [loading, setLoading] = useState(false);
    const [errorSearch, setErrorSearch] = useState('');
    const [errorEmail, setErrorEmail] = useState('');

    const [emailSuccess, setEmailSuccess] = useState(false);

    const [detail, setDetails] = useState({});

    const [dateDob, setDateDob] = useState({
        date: '',
        month: '',
        year: '',
    });

    let allowSearch = false;
    if (emailMob !== '' && dateDob.date !== '' && dateDob.month !== '' && dateDob.year !== '') {
        allowSearch = true;
    }
    function Search({ name, callback, active }) {
        return (
            <TouchableOpacity
                style={{
                    backgroundColor: active ? colors.success.main : colors.grey.bg,
                    borderRadius: 5,
                    height: 35,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                onPress={() => {
                    if (active && !loading) {
                        // TODO: make the api call and see if there is an error or not here
                        callback();
                    }
                }}
            >
                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                    }}
                >
                    {loading && (
                        <View style={{ marginRight: 10 }}>
                            <ActivityIndicator size="small" color="white" />
                        </View>
                    )}
                    <Text style={active ? styles.textInActive : styles.textActive}>{name}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    function Help({ name }) {
        return (
            <View
                style={{
                    marginTop: 30,
                    borderTopWidth: 1,
                    borderTopColor: colors.grey.light,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 15,
                }}
            >
                <Text style={{ marginBottom: 10, color: colors.grey.main }}>{name}</Text>
                <Text
                    style={{
                        textDecorationLine: 'underline',
                        color: colors.grey.main,
                    }}
                >
                    Contact customer support here
                </Text>
            </View>
        );
    }

    function ConfirmationEmail() {
        return (
            <View style={{ marginHorizontal: 20, marginVertical: 15 }}>
                <Text style={{ marginVertical: 10 }}>Your username or password will be sent to the email below. Please ensure you check your junk/spam folder.</Text>
                <Text style={{ marginVertical: 10 }}>Once you receive the email, enter your login details into the following screen.</Text>
                <Text style={{ fontWeight: 'bold', paddingVertical: 30 }}>
                    Email Address: <Text style={{ fontWeight: 'normal' }}>{detail.maskemail || ''}</Text>
                </Text>

                {emailSuccess && (
                    <View style={styles.confirmationContainer}>
                        <Text style={styles.confirmationText}>Your login details have been sent to the email above.</Text>

                        <TouchableOpacity
                            onPress={() => {
                                setEmailSuccess(false);
                                setForgotDetails(false);
                            }}
                        >
                            <Text style={{ ...styles.confirmationText, textDecorationLine: 'underline', fontWeight: 'bold', textAlign: 'center', marginTop: 15 }}>Login to your account here.</Text>
                        </TouchableOpacity>
                    </View>
                )}

                <View>
                    <Search name="Send Email" active={true} callback={SendEmail} />
                    <Help name="No longer have access to this email address?" />
                </View>
            </View>
        );
    }

    async function SendEmail() {
        setLoading(true);

        let email = emailMob.includes('@');
        let dateOfBirth = `${dateDob.year}-${dateDob.month}-${dateDob.date}`;
        let options = {
            method: 'POST',
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                XAPIGTO: config.appBrand,
            },
            body: JSON.stringify({
                email: email ? emailMob : '',
                mobile: !email ? emailMob : '',
                dob: dateOfBirth,
                confirm: 1,
            }),
        };
        const url = `${config.domain}/user/forgotpassword`;
        try {
            const response = await (await fetch(url, options)).json();
            if (response.success == true) {
                setErrorEmail('');
                setEmailSuccess(true);
                //setForgotDetails(false);
                setLoading(false);
                return;
            } else {
                if (response.success == 'NO' || response.ERROBJ.ERROR !== 0) {
                    if (response.ERROBJ.ERROR == 515) {
                        setErrorEmail('Incorrect Email/Mobile Number or DOB. Try again or contact support below');
                    } else {
                        setErrorEmail(response.ERROBJ.ERRORDESC);
                    }
                }
            }
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    }

    async function validateUser() {
        // validate the user and set the state to loading
        setLoading(true);

        let email = emailMob.includes('@');
        let dateOfBirth = `${dateDob.year}-${dateDob.month}-${dateDob.date}`;
        let options = {
            method: 'POST',
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                XAPIGTO: config.appBrand,
            },
            body: JSON.stringify({
                email: email ? emailMob : '',
                mobile: !email ? emailMob : '',
                dob: dateOfBirth,
            }),
        };
        const url = `${config.domain}/user/forgotpassword`;
        try {
            const response = await (await fetch(url, options)).json();
            if (response.success == true) {
                setErrorSearch('');
                setSearchAccount(false);
                setDetails(response.forgot);
            } else {
                if (response.success == 'NO' || response.ERROBJ.ERROR !== 0) {
                    if (response.ERROBJ.ERROR == 515) {
                        setErrorSearch('Incorrect Email/Mobile Number or DOB. Try again or contact support below');
                    } else {
                        setErrorSearch(response.ERROBJ.ERRORDESC);
                    }
                }
            }
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    }

    function Error({ msg }) {
        return (
            <View
                style={{
                    backgroundColor: colors.error.light,
                    padding: 8,
                    marginTop: 10,
                    borderRadius: 3,
                }}
            >
                <Text
                    style={{
                        fontSize: fonts.SMALL + 1,
                        color: colors.error.main,
                    }}
                >
                    {msg}
                </Text>
            </View>
        );
    }

    return (
        <View
            style={{
                paddingTop: 10,
                marginHorizontal: 20,
                borderRadius: 10,
                marginTop: 25,
                backgroundColor: 'white',
                minHeight: 380,
            }}
        >
            {/*  */}
            {!searchAccount ? (
                <ConfirmationEmail />
            ) : (
                <View style={{ marginHorizontal: 20, marginVertical: 15 }}>
                    <Text>Enter your email address or mobile number, and your date of birth so we can identify you.</Text>

                    <View style={{ marginTop: 20 }}>
                        <Text>Email / Mobile number</Text>
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.input} placeholder="Enter here" value={emailMob} onChangeText={(val) => setEmailMob(val)} />
                        </View>
                    </View>

                    <View style={{ marginTop: 20 }}>
                        <Text>Date of Birth</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ ...styles.inputDob, marginRight: 15 }}>
                                <TextInput
                                    style={styles.input}
                                    value={dateDob.date}
                                    placeholder="DD"
                                    keyboardType="number-pad"
                                    ref={dateRef}
                                    onChangeText={(val) => {
                                        if (val.length <= 2) {
                                            if (parseInt(val) > 31) {
                                                setDateDob({
                                                    ...dateDob,
                                                    date: '31',
                                                });
                                            }
                                            // else if (parseInt(val) == 0) {
                                            //     setDateDob({
                                            //         ...dateDob,
                                            //         date: '1',
                                            //     });
                                            // }
                                            else {
                                                setDateDob({
                                                    ...dateDob,
                                                    date: val,
                                                });
                                            }
                                        }
                                        if (val.length >= 2) {
                                            monthRef.current.focus();
                                        }
                                    }}
                                />
                            </View>
                            <View style={{ ...styles.inputDob, marginRight: 15 }}>
                                <TextInput
                                    ref={monthRef}
                                    style={styles.input}
                                    placeholder="MM"
                                    keyboardType="number-pad"
                                    value={dateDob.month}
                                    onChangeText={(val) => {
                                        if (val.length <= 2) {
                                            if (parseInt(val) > 12) {
                                                setDateDob({
                                                    ...dateDob,
                                                    month: '12',
                                                });
                                            }
                                            // else if (parseInt(val) == 0) {
                                            //     setDateDob({
                                            //         ...dateDob,
                                            //         month: '1',
                                            //     });
                                            // }
                                            else {
                                                setDateDob({
                                                    ...dateDob,
                                                    month: val,
                                                });
                                            }
                                        }

                                        if (val.length >= 2) {
                                            yearRef.current.focus();
                                        }
                                    }}
                                />
                            </View>
                            <View style={styles.inputDob}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="YYYY"
                                    value={dateDob.year}
                                    keyboardType="number-pad"
                                    ref={yearRef}
                                    onChangeText={(val) => {
                                        if (val.length <= 4) {
                                            setDateDob({
                                                ...dateDob,
                                                year: val,
                                            });
                                        }
                                    }}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={{ marginTop: 20 }}>
                        <Search name="Search" active={emailMob !== '' && dateDob.date !== '' && dateDob.month !== '' && dateDob.year !== ''} callback={validateUser} />

                        {errorSearch !== '' && <Error msg={errorSearch} />}
                        <Help name="Need more help?" />
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        paddingHorizontal: 10,
        borderWidth: 1,
        marginTop: 5,
        borderColor: colors.grey.dark,
        backgroundColor: colors.grey.light,
        borderRadius: 5,
        height: 35,
    },

    inputDob: {
        borderWidth: 1,
        marginTop: 5,
        paddingHorizontal: 10,
        borderColor: colors.grey.dark,
        backgroundColor: colors.grey.light,
        borderRadius: 5,
        height: 35,
        flex: 1,
    },
    input: {
        flex: 1,
        fontSize: fonts.MEDIUM,
    },

    textActive: {
        fontWeight: 'bold',
        color: colors.grey.main,
    },
    textInActive: {
        fontWeight: 'bold',
        color: 'white',
    },

    confirmationContainer: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderWidth: 1,
        borderColor: colors.success.main,
        backgroundColor: colors.success.light,
        borderRadius: 5,
        marginBottom: 15,
    },
    confirmationText: {
        fontSize: fonts.REGULAR,
        color: colors.success.main,
    },
});

export default ForgotPass;
