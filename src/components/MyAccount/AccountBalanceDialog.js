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
import { fetchBenefitsRewards } from '../../util/authAPI';
import { Button2 } from '../Input/Button';
import { color } from 'react-native-reanimated';

import FormLink from '../Input/Link';
import { UserContext } from '../../context/user/UserProvider';
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
            // onBackdropPress={toggleModal}
            style={{
                margin: 0,
                marginTop: -110,
            }}
        >
            {children}
        </Modal>
    );
};
/**"ALIAS": "bas242",
  "BALANCE": 11,
  "BONUSBETBALANCE": 0,
  "CLIENTID": "U/z06pauULGb1/cxyR8jvXcw+vKK7M3+5TWM8X4oAVAHbymELoDbidLeoC+wBPRh",
  "CREDITLIMIT": 0,
  "FIRSTNAME": "Sebastian",
  "FOLLOWLIST": "",
  "FULLNAME": "Sebastian Powell",
  "GTOWEBPAGE": "",
  "ID": "22095",
  "ISLOGGEDIN": 1,
  "LASTLOGIN": "April, 07 2022 18:45:22",
  "MAILLIST": true,
  "PENDINGBETSBAL": 0,
  "POINTSBALANCE": 0,
  "PROWEB": "",
  "PUNTACTIVE": 0,
  "REMEMBERME": "",
  "ROLES": "",
  "SHOWBALANCE": 0,
  "SINGLETAP": 0,
  "USERID": 0,
  "VERIFIED": true, */
export default function AccountBalanceDialog(props) {
    const { opened, handleClose, navigate, userInfo } = props;
    // console.log('AccountBalanceDialog userInfo =', userInfo);
    const { user } = useContext(UserContext);
    // const { session } = useSession();
    const [data, setData] = useState({
        name: user.user.FULLNAME,
        username: user.user.FIRSTNAME,
        clientid: user.user.CLIENTID,
        balance: user.user.BALANCE,
        reward: user.user.PENDINGBETSBAL,
        bonusBet: user.user.BONUSBETBALANCE,
    });
    // useEffect(() => {
    //     setData({
    //         name: userInfo.FULLNAME,
    //         username: userInfo.FIRSTNAME,
    //         clientid: userInfo.CLIENTID,
    //         balance: userInfo.BALANCE,
    //         reward: userInfo.PENDINGBETSBAL,
    //         bonusBet: userInfo.BONUSBETBALANCE,
    //     });
    // }, [props]);
    useEffect(() => {
        // console.log('AccountBalanceDialog useEffect, newData=', user);
        updateData(user.user.CLIENTID);
    }, []);

    const updateData = async (clientid) => {
        // console.log('AccountBalanceDialog::updateData');
        const data1 = await fetchBenefitsRewards({
            clientid,
        });
        // console.log(
        //     'fetchBenefitsRewards result=',
        //     clientid,
        //     ',',
        //     data,
        //     '\n,new=',
        //     {
        //         ...data,
        //         ...data1,
        //     }
        // );
        setData({ ...data, ...data1 });
    };

    const currency = `${data.balance ? data.balance : 0}`;
    const cents = '0';
    const balanceString = `$${currency.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ','
    )}.${cents}`;

    return (
        <ModalLayout isModalVisible={opened} toggleModal={handleClose}>
            <View style={styles.modalHeader}>
                <View style={{ flexGrow: 1, alignItems: 'center' }}>
                    <Text
                        style={{
                            fontWeight: 'bold',
                            fontSize: fonts.LARGE,
                        }}
                    >
                        {data.name}
                    </Text>
                    <Text
                        style={{
                            color: colors.grey.main,
                            fontSize: fonts.SMALL,
                        }}
                    >
                        Username:{data.username}
                    </Text>
                </View>
                <TouchableOpacity onPress={handleClose}>
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
                        // onPress={() => alert('Deposit')}
                        onPress={navigate}
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
                        <Text style={styles.font2}>{data.bonusBet}</Text>
                    </View>
                    <View style={styles.centering}>
                        <Text style={styles.font1}>REWARDS</Text>
                        <Text style={styles.font2}>{data.reward} pts</Text>
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
                                value="MyAccount"
                                startIcon="result"
                                onClick={() => {
                                    handleClose();
                                    navigate();
                                }}
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
                                onPress={() => alert('Deposit')}
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
