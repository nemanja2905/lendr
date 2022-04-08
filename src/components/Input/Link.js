import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

// Constant imports
import { colors } from '@Colors';
import { fonts } from '@Fonts';
import { config } from '@Config';

import InputField from '@components/Input/InputField';
import { AssetIcon } from '../Icon/Icon';
import { Ionicons } from '@expo/vector-icons';

export default function FormLink(props) {
    const { style = [] } = props;
    if (props.type === 1) {
        return (
            <View style={{ ...styles.freeContainer, ...style }}>
                <TouchableOpacity
                    style={{ display: 'flex', flexDirection: 'row' }}
                    onPress={props.onClick ? props.onClick : () => {}}
                >
                    {/* <Icon name={icon} size={20} color="black" /> */}
                    <AssetIcon name={props.startIcon} />
                    <Text style={{ marginLeft: 10, fontSize: fonts.REGULAR }}>
                        {props.value}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
    return (
        <View
            style={{
                marginTop: 30,
                minWidth: props.width ? props.width : 100,
            }}
        >
            <View style={styles.inputContainer}>
                <TouchableOpacity
                    style={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onPress={props.onClick}
                >
                    <Text style={styles.input}>{props.value}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        flex: 1,
        // color: 'white',
        // fontWeight: 'bold',
        fontSize: fonts.REGULAR + 2,
        textDecorationLine: 'underline',
    },
    freeContainer: {
        // borderRadius: 8,
        // marginBottom: 5,
        // backgroundColor: colors.success.main,
        paddingVertical: Platform.OS == 'ios' ? 8 : 3,
        paddingVertical: 10,
        // height: 40,
    },
    inputContainer: {
        // borderRadius: 8,
        marginBottom: 5,
        // backgroundColor: colors.success.main,
        paddingVertical: Platform.OS == 'ios' ? 8 : 3,
        paddingVertical: 10,
        height: 40,
        // borderBottomWidth: 1,
        // borderBottomColor: colors.black.main,
    },
});
