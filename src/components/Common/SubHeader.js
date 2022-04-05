import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import { fonts } from '@Fonts';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '@Colors';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function SubHeader({ route }) {
    return (
        <View style={styles.container}>
            <Text style={styles.subTitle}>My Account</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        // marginLeft: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary.main,
        paddingVertical: 15,
        paddingBottom: 70,
    },
    subTitle: {
        fontWeight: 'bold',
        fontSize: fonts.LARGE,
    },
});
