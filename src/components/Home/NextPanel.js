import React, { useState, useEffect, useCallback } from 'react';
import { MAIN_CATEGORIES } from './constData';
import { StyleSheet, Text, View, Image, Touchable } from 'react-native';
import { LogBox } from 'react-native';
import { fonts } from '@Fonts';
import { colors } from '@Colors';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import PromotionCategory from './PromotionCategory';
import { raceTypes, sportTypes } from './constData';
import NextList from './NextList';
import FormLink from '../Input/Link';
import Icon from 'react-native-vector-icons/FontAwesome';
export default function NextPanel(props) {
    const {
        active = undefined,
        hotevents = [],
        types = [],
        topTypes = [],
        state,
        setState,
    } = props;

    // console.log('NextPanel, data=', data);
    const setFilter = (filter) => {
        setState({
            ...state,
            filter,
        });
    };
    const setFilterRace = (race) => {
        setState({
            ...state,
            filterRace: {
                ...state.filterRace,
                race,
            },
        });
    };

    const title =
        active === MAIN_CATEGORIES.sports ? 'Next Sports' : 'Next Racings';
    // let types2 = active === MAIN_CATEGORIES.sports ? types : raceTypes;
    return (
        <View style={styles.wrapper}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.container}>
                <ScrollView style={styles.types} horizontal={true}>
                    {active === MAIN_CATEGORIES.sports ? (
                        <PromotionCategory
                            active={active}
                            setFilter={setFilter}
                            filter={state.filter}
                            types={types}
                            topTypes={topTypes}
                        />
                    ) : (
                        <PromotionCategory
                            active={active}
                            setFilter={setFilterRace}
                            filter={state.filterRace.race}
                            types={raceTypes}
                        />
                    )}
                </ScrollView>
                <ScrollView style={styles.list}>
                    <NextList active={state.active} hotevents={hotevents} />
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
}

const styles = StyleSheet.create({
    wrapper: {
        marginHorizontal: 15,
    },
    types: {
        marginVertical: 10,
        paddingBottom: 5,
    },
    list: {},
    title: {
        fontSize: fonts.MEDIUM,
        fontWeight: 'bold',
    },
    container: {
        marginVertical: 10,
        borderRadius: 5,
        backgroundColor: 'white',
        paddingHorizontal: 10,
    },
});
