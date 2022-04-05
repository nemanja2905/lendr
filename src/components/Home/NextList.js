import React, { useState, useEffect, useCallback } from 'react';
import { MAIN_CATEGORIES } from './constData';
import { StyleSheet, Text, View, Image } from 'react-native';
import { LogBox } from 'react-native';
import { fonts } from '@Fonts';
import { colors } from '@Colors';

import NextRacingItem from './NextRacingItem';
import NextSportItem from './NextSportItem';

export default function NextList(props) {
    const { active, hotevents } = props;

    return (
        <>
            {active === MAIN_CATEGORIES.sports &&
                hotevents &&
                hotevents.length > 0 &&
                hotevents[0].mjs &&
                hotevents.map((row, idx) => (
                    <View
                        style={idx === 0 ? styles.item0 : styles.item}
                        key={idx}
                    >
                        <NextSportItem data={row} idx={idx} />
                    </View>
                ))}
            {active === MAIN_CATEGORIES.racings &&
                hotevents &&
                hotevents.length > 0 &&
                hotevents[0].RACETIMEUTC &&
                hotevents.map((row, idx) => (
                    <View
                        style={idx === 0 ? styles.item0 : styles.item}
                        key={idx}
                    >
                        <NextRacingItem
                            // handleSelectRace={handleSelectRace}
                            data={row}
                            idx={idx}
                        />
                    </View>
                ))}
        </>
    );
}

const styles = StyleSheet.create({
    item: {
        marginHorizontal: 5,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#e2e2e2',
    },
    item0: {
        marginHorizontal: 5,
        paddingVertical: 10,
    },
});
