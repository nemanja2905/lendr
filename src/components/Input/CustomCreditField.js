import { View, StyleSheet, Platform } from 'react-native';

import { useRef, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
// Constant imports
import { colors } from '@Colors';
import { fonts } from '@Fonts';
import { config } from '@Config';
import CustomMaskInput from './CustomMaskInput';

export default function CustomCreditField(props) {
    const { error, style, ...rest } = props;
    let inputRef = useRef();
    return (
        <View style={{ ...style, marginTop: 5 }}>
            <View
                ref={inputRef}
                style={
                    error
                        ? {
                              ...styles.textInputContainer,
                              borderColor: colors.error.main,
                          }
                        : styles.textInputContainer
                }
            >
                <CustomMaskInput
                    keyboardType="default"
                    // type="password"
                    value={props.value}
                    {...rest}
                    style={{
                        marginHorizontal: 5,
                        width: props.width ? props.width : 'auto',
                        minWidth: 120,
                        // backgroundColor: 'orange',
                    }}
                />

                <Ionicons
                    name={error ? 'alert-circle' : 'checkmark-circle'}
                    size={config.icon.size}
                    color={error ? colors.error.main : colors.success.main}
                    style={{
                        // width: 30,
                        alignSelf: 'center',
                        // marginEnd: 30,
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    label: {
        fontSize: fonts.MEDIUM,
    },
    textInputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 5,
        backgroundColor: colors.grey.light,
        borderColor: colors.grey.dark,
        paddingVertical: Platform.OS == 'ios' ? 8 : 3,
        paddingStart: 15,
        paddingEnd: 5,
        height: 40,
    },
    input: {
        flex: 1,
        fontSize: fonts.REGULAR + 1,
    },
    errorContainer: {
        marginTop: 10,
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 3,
        backgroundColor: colors.error.light,
    },
    errorText: {
        color: colors.error.main,
        fontSize: fonts.REGULAR,
    },
});
