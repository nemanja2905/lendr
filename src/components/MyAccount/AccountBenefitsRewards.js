import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import CustomSwitch from '../Input/CustomSwitch';
import AccountLayout from './AccountLayout';
import MyFormHelperText from '../Input/MyFormHelperText';
import { fetchDataFromJson } from '../../util/authAPI';
import { colors } from '@Colors';
import { fonts } from '@Fonts';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomAccordion from '../Input/CustomAccordion';
import EliteBetPanel from '../Join/components/EliteBetPanel';
import BonusBetPanel from '../Join/components/BonusBetPanel';
import EliteBoostPanel from '../Join/components/EliteBoostPanel';
export default function AccountBenefitsRewards(props) {
    const [data, setData] = useState({});

    const updateData = async () => {
        console.log('updat2, due to login');
        const data1 = (await fetchDataFromJson()) || {};
        setData(data1);
    };

    useEffect(() => {
        updateData();
    }, []);

    const { balance, count1, count2, totalCount, reward } = data;
    // console.log('MyAccountBenefits: data', balance);
    const currency = `${balance ? balance : 0}`;
    const cents = '0';
    const balanceString = `$${currency.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ','
    )}.${cents}`;
    // const balanceString = '$12.0';

    return (
        <AccountLayout title="Benefits & Rewards " img="">
            <View style={styles.container}>
                <CustomAccordion left="Bonus Bet balance" title={balanceString}>
                    <View style={styles.detailPanel}>
                        <BonusBetPanel />
                    </View>
                </CustomAccordion>

                <CustomAccordion
                    left="Elite Boosts"
                    title={`${totalCount || 0} available`}
                >
                    <View style={styles.detailPanel}>
                        <EliteBoostPanel count1={count1} count2={count2} />
                    </View>
                </CustomAccordion>

                <CustomAccordion
                    left="Elite Rewards"
                    title={`${reward ? reward : '0'} points`}
                >
                    <View style={styles.detailPanel2}>
                        <EliteBetPanel
                            balance={balance}
                            reward={reward}
                            updateData={updateData}
                        />
                        <TouchableOpacity
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                alignSelf: 'flex-end',
                            }}
                            onPress={() =>
                                alert('Learn more is not implemented')
                            }
                        >
                            <Text
                                style={{
                                    fontSize: fonts.REGULAR,
                                    // width: '10%',
                                    marginEnd: 5,
                                }}
                            >
                                Lear more
                            </Text>

                            <Icon name="angle-right" size={20} color="black" />
                        </TouchableOpacity>
                    </View>
                </CustomAccordion>
            </View>
        </AccountLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 12,
        margin: 12,
        paddingBottom: 48,
        borderRadius: 6,
        // backgroundColor: '#e2e2e2',
        borderColor: '#dedede',
        borderWidth: 1,
    },
    formControlGroup: {
        paddingBottom: 5,
        display: 'flex',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: '#d3d3d3',
    },
    linearGroup: {
        paddingVertical: 10,
        // paddingBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: '#d3d3d3',
    },
    detailPanel: {
        marginVertical: 12,
        padding: 12,
        // width: '100%',
        borderRadius: 6,
        backgroundColor: '#eeeff1',
        // backgroundColor: 'black',
        borderColor: '#dedede',
        borderWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    detailPanel2: {
        marginVertical: 12,
        padding: 12,
        // width: '100%',
        borderRadius: 6,
        backgroundColor: '#eeeff1',
        display: 'flex',
        justifyContent: 'center',
        // alignContent: 'center',
        // backgroundColor: 'black',
        borderColor: '#dedede',
        borderWidth: 1,
    },
});
