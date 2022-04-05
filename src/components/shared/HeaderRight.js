import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Login from '@components/Login/Login';

import { NavigationContext } from '@react-navigation/native';

import { colors } from '@Colors';
import { fonts } from '@Fonts';
import ForgotPassword from '../screens/Login/ForgotPassword';

function HeaderRight(props) {
    const { route } = props;
    const { name, key, params } = route;
    const [modalVisible, setModalVisible] = useState({
        login: false,
        forgot: false,
    });
    const handleForgotPasswordVisible = (value) => {
        setModalVisible({
            login: false,
            forgot: value,
        });
    };
    const handleLoginVisible = (value, valueForForgot = false) => {
        setModalVisible({
            login: value,
            forgot: valueForForgot,
        });
    };

    const navigation = useContext(NavigationContext);
    // console.log('route=', name);
    return (
        <>
            <View style={styles.container}>
                <View style={{ justifyContent: 'center' }}>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() =>
                            navigation.navigate('MyAccount', {
                                screen: 'navigation',
                            })
                        }
                    >
                        <Text>MyAccount</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ justifyContent: 'center' }}>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() =>
                            navigation.navigate('Root-More', { screen: 'Join' })
                        }
                    >
                        <Text>Join</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ justifyContent: 'center' }}>
                    <TouchableOpacity
                        style={{ ...styles.btn, backgroundColor: 'black' }}
                        onPress={() => handleLoginVisible(true)}
                    >
                        <Text style={{ color: 'white' }}>Login</Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        backgroundColor: 'white',
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                    }}
                >
                    <TouchableOpacity>
                        <Text
                            style={{
                                fontSize: fonts.MEDIUM,
                                textAlign: 'center',
                            }}
                        >
                            0
                        </Text>
                        <Text
                            style={{
                                fontSize: fonts.SMALL,
                                textAlign: 'center',
                            }}
                        >
                            Betslip
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Login visible={modalVisible.login} onClick={handleLoginVisible} />
            <ForgotPassword
                visible={modalVisible.forgot}
                onClick={handleForgotPasswordVisible}
            />
            {/* {modalVisible && (
            )} */}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginRight: 0,
    },
    btn: {
        backgroundColor: colors.primary.main,
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 5,
    },
});

export default HeaderRight;
