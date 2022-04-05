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
import { ScrollView } from 'react-native-gesture-handler';
const Layout2 = (props) => {
    const { title = '', children } = props;
    // return <ScrollView>{children}</ScrollView>;
    return (
        <ScrollView>
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
                            {title}
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
                        {children}
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
};

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

export default Layout2;
