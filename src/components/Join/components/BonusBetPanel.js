import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';

// Constant imports
import { colors } from '@Colors';
import { fonts } from '@Fonts';
import { config } from '@Config';

import InputField from '@components/Input/InputField';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';

export default function BonusBetPanel(props) {
    return (
        <>
            <Text
                style={{
                    paddingStart: 0,
                    fontSize: fonts.REGULAR,
                    width: '60%',
                }}
            >
                Bonus Bets can be used on all Racing & Sports markets!
            </Text>
            <TouchableOpacity
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
                onPress={() => alert('Learn more is not implemented')}
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
        </>
    );
}
