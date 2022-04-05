import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { LogBox } from 'react-native';
import { config } from '@Config';
import { fonts } from '@Fonts';
import SwipeableViews from 'react-swipeable-views-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import CustomButton from '../Input/CustomButton';
import { MAIN_CATEGORIES } from './constData';

import { sportTypes, raceTypes } from './constData';
import { AssetIcon, getImage, SvgIcon } from '../Icon/Icon';

const UniIconLabel = (props) => {
    const { label, icon } = props;
    return (
        <View
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 80,
            }}
        >
            <View style={styles.icon}>
                {/* <AssetIcon name={icon} /> */}
                <SvgIcon name={icon} />
                {/* <Image source={require('../../../assets/svg/icon-JCKY.svg')} /> */}
            </View>
            <View
                style={{
                    width: 60,
                    height: 40,
                }}
            >
                <Text style={{ textAlign: 'center', fontSize: fonts.REGULAR }}>
                    {label}
                </Text>
            </View>
        </View>
    );
};
export default function CarouselIcons(props) {
    const { active = undefined, types = [], topTypes = [] } = props;
    if (active === MAIN_CATEGORIES.sports) {
        return (
            <View style={styles.wrapper}>
                <ScrollView style={styles.container} horizontal={true}>
                    {topTypes.map((data, idx) => (
                        <UniIconLabel
                            label={data.sn}
                            icon={data.sc}
                            key={idx + 200}
                        />
                    ))}
                    {types.map((data, idx) => (
                        <UniIconLabel
                            label={data.sn}
                            icon={data.sc}
                            key={idx + 300}
                        />
                    ))}
                </ScrollView>
            </View>
        );
    } else {
        return (
            <View style={styles.wrapper}>
                <ScrollView style={styles.container} horizontal={true}>
                    {raceTypes.map((data, idx) => (
                        <UniIconLabel {...data} key={idx} />
                    ))}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        paddingHorizontal: 10,

        marginTop: 5,
        marginBottom: 20,
        // width: 'inherit',
        overflow: 'scroll',
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        // alignItems: 'baseline',
    },
    icon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        elevation: 3,
        marginHorizontal: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
});
