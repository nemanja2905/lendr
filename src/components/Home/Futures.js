import React, { useState, useEffect, useCallback } from 'react';
import { MAIN_CATEGORIES } from './constData';
import { StyleSheet, Text, View, Image } from 'react-native';
import { LogBox } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { fonts } from '@Fonts';
import { colors } from '@Colors';
import Icon from 'react-native-vector-icons/FontAwesome';

const Futures = (props) => {
    const title = 'Popular Sports';
    return (
        <View style={styles.wrapper}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.container}>
                <ScrollView horizontal={true}>
                    {featureDetails.map((data, idx) => (
                        <FutureCard data={data} />
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
const FutureCard = ({ data }) => {
    const { name, para, img, days } = data;
    return (
        <View style={styles.card}>
            <View style={styles.linear}>
                <Text style={{ fontSize: fonts.MEDIUM, fontWeight: 'bold' }}>
                    {name}
                </Text>
                <Image source={img} style={styles.img} />
            </View>
            <Text
                style={{
                    fontSize: fonts.REGULAR,
                    fontWeight: 'bold',
                    paddingVertical: 3,
                }}
            >
                {para}
            </Text>

            <View style={styles.linear}>
                <Text
                    style={{
                        fontSize: fonts.REGULAR - 1,
                        color: colors.grey.main,
                    }}
                >
                    Race 7
                </Text>
                <Text
                    style={{
                        fontSize: fonts.REGULAR - 1,
                    }}
                >
                    {days}
                </Text>
            </View>
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
    img: {
        width: 20,
        height: 20,
    },
    list: {},
    title: {
        fontSize: fonts.MEDIUM,
        fontWeight: 'bold',
    },
    linear: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    container: {
        marginVertical: 10,
        borderRadius: 5,
        // backgroundColor: 'white',
        paddingHorizontal: 10,
    },
    card: {
        borderRadius: 5,
        marginRight: 10,
        padding: 6,
        minWidth: 160,
        backgroundColor: 'white',
    },
});

const featureDetails = [
    {
        name: 'Cox Plate',
        para: 'Flemington',
        img: require('../../../assets/icon/futureIcon.png'),
        days: '23 days',
    },
    {
        name: 'The Golden Eagle',
        para: 'Randwick',
        img: require('../../../assets/icon/futureIcon.png'),
        days: '153 days',
    },
    {
        name: 'Cox Plate',
        para: 'Flemington',
        img: require('../../../assets/icon/futureIcon.png'),
        days: '169 days',
    },
    {
        name: 'Cox Plate',
        para: 'Flemington',
        img: require('../../../assets/icon/futureIcon.png'),
        days: '19 days',
    },
    {
        name: 'Cox Plate',
        para: 'Flemington',
        img: require('../../../assets/icon/futureIcon.png'),
        days: '109 days',
    },
];

export default Futures;
