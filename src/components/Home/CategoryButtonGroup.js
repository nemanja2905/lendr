import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { LogBox } from 'react-native';
import { config } from '@Config';
import SwipeableViews from 'react-swipeable-views-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CustomButton from '../Input/CustomButton';
import { MAIN_CATEGORIES } from './constData';

import { fonts } from '@Fonts';
import { colors } from '@Colors';

export default function CategoryButtonGroup(props) {
    const { state, setState } = props;

    return (
        <View style={{ backgroundColor: 'white' }}>
            <View style={styles.container}>
                <CustomButton
                    icon="HORSES"
                    label="Racing"
                    isAsset={true}
                    style={{
                        height: 24,
                        marginHorizontal: 5,
                        minWidth: '45%',
                        width: 'auto',
                        borderRadius: 12,
                        elevation: 0,
                    }}
                    onClick={() =>
                        setState({
                            active: MAIN_CATEGORIES.racings,
                            filter: 'ALL',
                            filterRace: {
                                race: 'A',
                                media: '',
                                period: '',
                            },
                        })
                    }
                    isSelected={state.active === MAIN_CATEGORIES.racings}
                    selectedStyle={{
                        backgroundColor: 'white',
                        elevation: 2,
                    }}
                />
                <CustomButton
                    icon="SOCC"
                    label="Sports"
                    isAsset={true}
                    style={{
                        height: 24,
                        marginHorizontal: 5,
                        marginHorizontal: 5,
                        minWidth: '45%',
                        width: 'auto',
                        backgroundColor: '#e0e0e0',
                        borderRadius: 12,
                        elevation: 0,
                    }}
                    onClick={() =>
                        setState({
                            active: MAIN_CATEGORIES.sports,
                            filter: 'ALL',
                            filterRace: {
                                race: 'A',
                                media: '',
                                period: '',
                            },
                        })
                    }
                    isSelected={state.active === MAIN_CATEGORIES.sports}
                    selectedStyle={{
                        backgroundColor: 'white',
                        elevation: 2,
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        marginHorizontal: '10%',
        width: 'auto',
        backgroundColor: '#e0e0e0',
        height: 32,
        borderRadius: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
