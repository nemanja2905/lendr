import React, { useCallback, useEffect, useState } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    // ,
    Pressable,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import { NavigationContext } from '@react-navigation/native';
import { useContext } from 'react';
import FormLabel from '../Input/FormLabel';
import { colors } from '@Colors';
import { fonts } from '@Fonts';
import { config } from '@Config';
import { fetchDataFromJson } from '../../util/authAPI';
import { Button2 } from '../Input/Button';
import { color } from 'react-native-reanimated';
import FormLink from '../Input/Link';
const ModalLayout = (props) => {
    const { isModalVisible, toggleModal, children } = props;
    return (
        <Modal
            isVisible={isModalVisible}
            customBackdrop={
                <TouchableOpacity
                    style={{
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        margin: 0,
                        marginTop: 55,

                        height: '100%',
                    }}
                    onPress={toggleModal}
                ></TouchableOpacity>
            }
            onBackdropPress={toggleModal}
            style={{
                margin: 0,
            }}
        >
            <View
                style={{
                    position: 'absolute',
                    top: 55,
                    marginHorizontal: 0,

                    width: '100%',
                    height: '30%',
                    backgroundColor: 'white',
                }}
            >
                {children}
            </View>
        </Modal>
    );
};
export default function AccountNavigationMenu(props) {
    const [isModalVisible, setModalVisible] = useState(true);

    const navigation = useContext(NavigationContext);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    useEffect(() => {
        // if (!isModalVisible) {
        //     navigation.navigate('MyAccount', {
        //         screen: 'index',
        //     });
        // }
    }, [isModalVisible]);

    useEffect(() => {
        setModalVisible(true);
    }, []);

    const name = 'Steve Jones';
    const username = 'Steve1987';
    const bonus = '$0.0';
    // const { session } = useSession();
    const [data, setData] = useState({});

    const updateData = async () => {
        console.log('AccountBalanceDialog::updateData');
        const data1 = (await fetchDataFromJson()) || {};
        setData(data1);
    };
    useEffect(() => {
        updateData();
        // setData(data1);
    }, []);

    const { balance, count1, count2, totalCount, reward } = data;
    // console.log("Session User", session);

    const balanceString = (balance ? balance : 13.0).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    return (
        <ModalLayout isModalVisible={isModalVisible} toggleModal={toggleModal}>
            <View style={styles.modalHeader}>
                <View style={{ flexGrow: 1, alignItems: 'center' }}>
                    <Text
                        style={{
                            fontWeight: 'bold',
                            fontSize: fonts.LARGE,
                        }}
                    >
                        {name}
                    </Text>
                    <Text
                        style={{
                            color: colors.grey.main,
                            fontSize: fonts.SMALL,
                        }}
                    >
                        Username:{username}
                    </Text>
                </View>
                <TouchableOpacity onPress={toggleModal}>
                    <Ionicons
                        style={{ alignContent: 'flex-end' }}
                        name="close"
                        size={20}
                        color={colors.grey.main}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.modalContent}>
                <View style={styles.linear}>
                    <Pressable
                        style={{ ...styles.button, width: '60%' }}
                        onPress={() => alert('Deposit')}
                    >
                        <Text style={styles.text}>+ Deposit</Text>
                    </Pressable>
                    <Pressable
                        style={{
                            ...styles.button,
                            width: '30%',
                            backgroundColor: 'white',

                            // backgroundColor: 'white',
                        }}
                        onPress={() => alert('Deposit')}
                    >
                        <Text
                            style={{ ...styles.text, color: colors.grey.main }}
                        >
                            {' '}
                            Withdraw
                        </Text>
                    </Pressable>
                </View>
                <View style={styles.tight}>
                    <View style={styles.centering}>
                        <Text style={styles.font1}>BALANCE</Text>
                        <Text style={styles.font2}>{balanceString}</Text>
                    </View>
                    <View style={styles.centering}>
                        <Text style={styles.font1}>BONUS</Text>
                        <Text style={styles.font2}>{bonus}</Text>
                    </View>
                    <View style={styles.centering}>
                        <Text style={styles.font1}>REWARDS</Text>
                        <Text style={styles.font2}>
                            {reward || totalCount} pts
                        </Text>
                    </View>
                </View>

                <View style={styles.cardGroup}>
                    <View style={styles.cardContainer}>
                        <View style={styles.card0}>
                            <FormLink
                                type={1}
                                value="Pending Bets"
                                startIcon="clock"
                            />
                        </View>
                        <View
                            style={{
                                borderLeftWidth: 1,
                                marginVertical: 16,
                                borderColor: '#dedede',
                            }}
                        />
                        <View style={styles.card0}>
                            <FormLink
                                type={1}
                                value="Resulted Bets"
                                startIcon="avatar"
                            />
                        </View>
                    </View>

                    <View style={styles.cardContainer}>
                        <View
                            style={{
                                ...styles.card0,
                                borderTopWidth: 1,
                                borderColor: '#dedede',
                            }}
                        >
                            <FormLink
                                type={1}
                                value="My Accounts"
                                startIcon="result"
                            />
                        </View>
                        <View
                            style={{
                                borderLeftWidth: 1,
                                marginVertical: 16,
                                borderColor: '#dedede',
                            }}
                        />
                        <View
                            style={{
                                ...styles.card0,
                                borderTopWidth: 1,
                                borderColor: '#dedede',
                            }}
                        >
                            <FormLink
                                type={1}
                                value="Rewards"
                                startIcon="champion"
                            />
                        </View>
                    </View>
                </View>
                <View
                    style={{
                        marginBottom: 16,
                        marginHorizontal: 16,
                        borderBottomWidth: 1,
                        borderColor: '#dedede',
                    }}
                />
                <View
                    style={{
                        marginHorizonal: 0,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => alert('logout')}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: 16,
                        }}
                    >
                        <Ionicons
                            name="power-outline"
                            color={colors.grey.main}
                            size={18}
                        />
                        <Text style={{ fontSize: fonts.REGULAR }}>Log out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ModalLayout>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#ecf0f1',
        backgroundColor: '#3f954e',
        width: '100%',
        height: '100%',
    },
    card0: {
        flex: 1,
        minWidth: '40%',
        // width: 'auto',
        marginHorizontal: 16,
        // marginVertical: 6,
        padding: 16,
        // borderWidth: 1,
    },

    cardContainer: {
        // boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        borderRadius: 6,
        backgroundColor: 'white',
        padding: 0,
    },
    cardButton: {
        // boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'center',

        flexWrap: 'wrap',
        borderRadius: 6,
        backgroundColor: 'white',
        // padding: 16,
        color: '#d3d3d3',
        width: '50%',
    },

    cardGroup: {
        // marginHorizontal: 16,
        padding: 16,
        width: 'auto',
    },
    font1: {
        color: colors.grey.main,
        fontSize: fonts.REGULAR,
        fontWeight: 'bold',
    },
    font2: {
        color: 'black',
        fontSize: fonts.REGULAR,
        fontWeight: 'bold',
    },
    tight: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: 12,
        paddingTop: 12,
        backgroundColor: 'white',
    },
    centering: {
        minWidth: 120,
        display: 'flex',
        // alignSelf: 'center',
        // alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    linear: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        // marginHorizontal: 10,
        padding: 20,
    },
    text: {
        fontSize: fonts.MEDIUM,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },

    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        // paddingHorizontal: 32,
        borderRadius: 4,
        marginHorizontal: 6,
        elevation: 3,
        backgroundColor: colors.success.main,
        shadowColor: 'black',
        // shadowOpacity: 0.3,
        // shadowRadius: 3,
        // shadowOffset: 1,
    },
    modalContent: {
        backgroundColor: '#f2f2f2',
    },
    modalHeader: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: colors.yellow.main,

        padding: 16,
    },
});
