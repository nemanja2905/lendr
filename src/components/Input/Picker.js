import { View, StyleSheet, Text, Platform } from 'react-native';

import RNPickerSelect from 'react-native-picker-select';

import { useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
// Constant imports
import { colors } from '@Colors';
import { fonts } from '@Fonts';
import { config } from '@Config';

// items={[
//     { label: 'Football', value: 'football' },
//     { label: 'Baseball', value: 'baseball' },
//     { label: 'Hockey', value: 'hockey' },
// ]}
function Picker(props) {
    let inputRef = useRef();

    const placeholder = {
        label: props.placeholder,
        value: null,
        color: '#9EA0A4',
    };

    return (
        <View style={{ ...props.style, marginTop: 5 }}>
            {props.label && (
                <Text style={styles.label}>
                    {props.label}
                    {props.important && (
                        <Text style={{ color: 'darkmagenta' }}>&nbsp;*</Text>
                    )}
                </Text>
            )}

            <RNPickerSelect
                placeholder={placeholder}
                style={{
                    ...pickerSelectStyles,

                    iconContainer: {
                        top: 13,
                        right: 12,
                    },
                }}
                key={props.name}
                onValueChange={props.onChange}
                useNativeAndroidPickerStyle={false}
                items={props.items}
                value={props.value}
                Icon={() => (
                    <Ionicons
                        name="chevron-down"
                        size={20}
                        color={colors.grey.main}
                    />
                )}
            />

            {props.errors && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{props.errors}</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    label: {
        fontSize: fonts.MEDIUM,
    },
    textInputContainer: {
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 5,
        backgroundColor: colors.grey.light,
        borderColor: colors.grey.dark,
        paddingVertical: Platform.OS == 'ios' ? 8 : 3,
        paddingStart: Platform.OS == 'ios' ? 8 : 3,
        paddingEnd: 5,
        height: 40,
        backgroundColor: 'pink',
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

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        paddingStart: 10,
        paddingLeft: 10,
        fontSize: fonts.REGULAR + 1,
        marginStart: 10,
        paddingHorizontal: 10,
        paddingLeft: 10,
        borderWidth: 1,
        backgroundColor: colors.grey.light,
        borderColor: colors.grey.dark,
        height: 40,
        marginTop: 5,
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        paddingStart: 10,
        paddingLeft: 10,
        fontSize: fonts.REGULAR + 1,
        paddingHorizontal: 10,
        paddingLeft: 10,

        borderWidth: 1,
        backgroundColor: colors.grey.light,
        borderColor: colors.grey,
        marginTop: 5,
        height: 40,
        borderColor: colors.grey.dark,
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});

export default Picker;
