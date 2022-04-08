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
        <>
            <View style={styles.wrapper}>
                <Text style={styles.title}>{title}</Text>
            </View>
            <ScrollView style={styles.types2} horizontal={true}>
                {betCards.map((bet, idx) => (
                    <HotCard key={idx} data={bet} />
                ))}
            </ScrollView>
            <View style={styles.wrapper}>
                <TouchableOpacity
                    onPress={() => alert('More')}
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <Text
                        style={{ fontSize: fonts.REGULAR - 1, marginRight: 5 }}
                    >
                        View More
                    </Text>
                    <Icon name="angle-right" size={12} />
                </TouchableOpacity>
            </View>
        </>
    );
};
const HotCard = (props) => {
    const { data } = props;
    const { name, icon, sbIcon, profit, time } = data;
    return (
        <View style={styles.lcard}>
            <View style={{ ...styles.columns, paddingVertical: 2 }}>
                <Image source={icon} style={styles.avatar} />
                <Text
                    style={{
                        fontSize: fonts.REGULAR - 1,
                        color: colors.error.main,
                    }}
                >
                    {time}
                </Text>
            </View>
            <View style={styles.columns}>
                <Text
                    style={{
                        fontSize: fonts.MEDIUM,
                        color: 'black',
                        fontWeight: 'bold',
                    }}
                >
                    {name}
                </Text>
                <View
                    style={{ ...styles.linear, marginTop: 5, marginBottom: 8 }}
                >
                    <Image source={sbIcon} style={styles.sbIcon} />
                    <View>
                        <Text
                            style={{
                                fontSize: fonts.REGULAR,
                                fontWeight: 'bold',
                            }}
                        >
                            {profit}
                        </Text>
                        <Text
                            style={{
                                fontSize: fonts.REGULAR - 1,
                                color: colors.grey.main,
                            }}
                        >
                            on turnover
                        </Text>
                    </View>
                </View>
                <CustomButton
                    iconVisible={false}
                    label={'HOT Bet Now'}
                    style={{
                        backgroundColor: colors.primary.main,
                        borderRadius: 15,
                        minWidth: 60,
                        // marginStart: 30,
                        paddingVertical: 4,
                    }}
                    textStyle={{
                        fontSize: fonts.REGULAR - 1,
                        fontWeight: 'bold',
                    }}
                    onClick={() => alert('?')}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        marginHorizontal: 15,
    },

    types2: {
        marginVertical: 7,
        marginLeft: 15,
    },
    avatar: {
        width: 48,
        height: 48,
        marginRight: 8,
    },
    sbIcon: {
        width: 30,
        height: 30,
        marginRight: 8,
        marginTop: 2,
    },
    card: {
        padding: 10,
        marginRight: 10,
        borderRadius: 5,
        backgroundColor: 'white',
    },
    lcard: {
        padding: 10,
        marginRight: 8,
        borderRadius: 5,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    linear: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    columns: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    list: {},
    title: {
        fontSize: fonts.MEDIUM,
        fontWeight: 'bold',
        marginVertical: 2,
    },
    container: {
        marginVertical: 5,
        borderRadius: 5,
        // backgroundColor: 'white',
        paddingHorizontal: 0,
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
