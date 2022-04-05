import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';

// Constant imports
import { colors } from '@Colors';
import { fonts } from '@Fonts';
import { config } from '@Config';

import InputField from '@components/Input/InputField';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';

export default function EliteBoostPanel(props) {
    return (
        <>
            <View style={{ width: '60%' }}>
                <Text
                    style={{
                        fontSize: fonts.REGULAR,
                        fontWeight: 'bold',
                        marginBottom: 12,
                    }}
                >
                    Get your odds raised daily!
                </Text>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <Text
                        style={{
                            fontSize: fonts.REGULAR,
                        }}
                    >
                        Elite Boost Racing
                    </Text>
                    <Text
                        style={{
                            fontSize: fonts.REGULAR,
                            fontWeight: 'bold',
                        }}
                    >
                        {props.count1}
                    </Text>
                </View>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <Text
                        style={{
                            fontSize: fonts.REGULAR,
                        }}
                    >
                        Elite Boost Sport
                    </Text>
                    <Text
                        style={{
                            fontSize: fonts.REGULAR,
                            fontWeight: 'bold',
                        }}
                    >
                        {props.count2}
                    </Text>
                </View>
            </View>
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
