import React, { useState, useEffect, useCallback } from 'react';

import { StyleSheet, Text, View, Image } from 'react-native';
import { LogBox } from 'react-native';
import { fonts } from '@Fonts';
import { colors } from '@Colors';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AssetIcon } from '../Icon/Icon';
export default function NextRacingItem(props) {
    const { data } = props;

    const { RACEMEET, RACEID, RACETYPE, RACENUM } = data;

    return (
        <View style={styles.container}>
            <View style={styles.linear}>
                <AssetIcon name={RACETYPE} size={20} />
                <Text style={styles.text}>{RACEMEET}</Text>
                <Text style={styles.text2}>R{RACENUM}</Text>
            </View>
            <TouchableOpacity onPress={() => alert('More!')}>
                <Icon name="angle-right" size={14} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // paddingHorizontal: 15,
    },
    linear: {
        display: 'flex',
        flexDirection: 'row',
    },
    text: {
        fontSize: fonts.REGULAR,
        // fontWeight: 'bold',
        paddingHorizontal: 10,
    },
    text2: {
        fontSize: fonts.REGULAR,
        // fontWeight: 'bold',
        color: colors.grey.main,
    },
});
