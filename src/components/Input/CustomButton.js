import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import { fonts } from '@Fonts';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '@Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import AvatarIcon from '../../../assets/svg/avatar.svg';
import { color } from 'react-native-reanimated';
import { NavigationContext } from '@react-navigation/native';
import { AssetIcon, getImage, getImage2, SvgIcon } from '../Icon/Icon';
export default function CustomButton(props) {
    const {
        data = undefined,
        icon,
        iconSize = 14,
        label,
        textStyle = {},
        style = {},
        onClick,
        isSelected = false,
        selectedStyle = {},
        isAsset = false,
        iconVisible = true,
    } = props;
    // console.log(
    //     'CustomButton ',
    //     'icon',
    //     icon,
    //     'label',
    //     label,
    //     'iconVisible',
    //     iconVisible
    // );
    return isSelected ? (
        <TouchableOpacity
            onPress={onClick}
            style={{
                ...styles.buttonContainer,
                ...style,
                ...selectedStyle,
            }}
        >
            {iconVisible ? (
                <View style={{ marginRight: 4 }}>
                    <SvgIcon name={icon} size={iconSize} />
                </View>
            ) : (
                void 0
            )}
            <Text
                style={{
                    fontSize: fonts.MEDIUM,
                    fontWeight: 'bold',
                    ...textStyle,
                }}
            >
                {label}
            </Text>
        </TouchableOpacity>
    ) : (
        <TouchableOpacity
            onPress={onClick}
            style={{
                ...styles.buttonContainer,
                ...style,
            }}
        >
            {iconVisible ? (
                <View style={{ marginRight: 4 }}>
                    <SvgIcon name={icon} size={iconSize} />
                </View>
            ) : (
                void 0
            )}
            <Text
                style={{
                    fontSize: fonts.MEDIUM,
                    ...textStyle,
                    fontWeight: isSelected ? 'bold' : 'normal',
                }}
            >
                {label}
            </Text>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    buttonContainer: {
        paddingHorizontal: 15,
        // marginHorizontal: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
        shadowColor: 'black',
        // backgroundColor: 'white',
    },
});
