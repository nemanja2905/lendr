import React, { useState, useEffect, useCallback } from 'react';
import { MAIN_CATEGORIES } from './constData';
import { StyleSheet, Text, View, Image } from 'react-native';
import { LogBox } from 'react-native';
import { fonts } from '@Fonts';
import { colors } from '@Colors';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

import CustomButton from '../Input/CustomButton';
const HotBets = (props) => {
    const title = 'HOT Bets';
    return (
        <View style={styles.wrapper}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.container}>
                <ScrollView style={styles.types} horizontal={true}>
                    {betCards.map((bet, idx) => (
                        <HotCard data={bet} />
                    ))}
                </ScrollView>
            </View>
            <TouchableOpacity
                onPress={() => alert('More')}
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    flexDirection: 'row',
                    marginRight: 12,
                }}
            >
                <Text style={{ fontSize: fonts.REGULAR, marginRight: 5 }}>
                    View More
                </Text>
                <Icon name="angle-right" size={14} />
            </TouchableOpacity>
        </View>
    );
};
const HotCard = (props) => {
    const { data } = props;
    const { name, icon, sbIcon, profit, time } = data;
    return (
        <View style={styles.card}>
            <View style={styles.linear}>
                <Image source={icon} style={styles.avatar} />
                <View>
                    <Text
                        style={{ fontSize: fonts.MEDIUM, fontWeight: 'bold' }}
                    >
                        {name}
                    </Text>
                    <View style={{ ...styles.linear, marginTop: 5 }}>
                        <Image source={sbIcon} style={styles.sbIcon} />
                        <View>
                            <Text style={{ fontSize: fonts.REGULAR }}>
                                {profit}
                            </Text>
                            <Text
                                style={{
                                    fontSize: fonts.REGULAR,
                                    color: colors.grey.main,
                                }}
                            >
                                on turnover
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
            <View
                style={{
                    ...styles.linear,
                    marginTop: 10,
                    alignItems: 'center',
                }}
            >
                <Text
                    style={{
                        fontSize: fonts.REGULAR,
                        color: colors.error.main,
                    }}
                >
                    {time}
                </Text>
                <CustomButton
                    iconVisible={false}
                    label={'HOT Bet Now'}
                    style={{
                        backgroundColor: colors.primary.main,
                        borderRadius: 15,
                        minWidth: 60,
                        marginStart: 30,
                        paddingVertical: 4,
                    }}
                    textStyle={{
                        fontSize: fonts.REGULAR - 1,
                    }}
                    onClick={() => alert('?')}
                />
            </View>
            <View style={styles.cardRight}></View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        marginHorizontal: 15,
    },
    types: {
        marginVertical: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    sbIcon: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    card: {
        padding: 10,
        marginRight: 10,
        borderRadius: 5,
        backgroundColor: 'white',
    },
    linear: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    list: {},
    title: {
        fontSize: fonts.MEDIUM,
        fontWeight: 'bold',
    },
    container: {
        marginVertical: 10,
        borderRadius: 5,
        // backgroundColor: 'white',
        paddingHorizontal: 10,
    },
});

const betCards = [
    {
        name: 'Luke Marlow',
        icon: require('../../../assets/icon/profile1.png'), //require('../../../assets/images/icon/profile1.PNG'),
        sbIcon: require('../../../assets/icon/sbicon01.png'),
        profit: '108% PROFIT',
        time: '1m 25s',
    },
    {
        name: 'The Sultan',
        icon: require('../../../assets/icon/profile2.png'),
        sbIcon: require('../../../assets/icon/sbicon02.png'),
        profit: '80% PROFIT',
        time: '1m 25s',
    },
    {
        name: 'Luke Marlow',
        icon: require('../../../assets/icon/profile1.png'),
        sbIcon: require('../../../assets/icon/sbicon01.png'),
        profit: '108% PROFIT',
        time: '1m 25s',
    },
    {
        name: 'The Sultan',
        icon: require('../../../assets/icon/profile2.png'),
        sbIcon: require('../../../assets/icon/sbicon02.png'),
        profit: '80% PROFIT',
        time: '1m 25s',
    },
];

export default HotBets;
