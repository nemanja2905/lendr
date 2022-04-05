import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HeaderRight from './HeaderRight';
import HeaderLeft from './HeaderLeft';

import { colors } from '@Colors';

function Header(props) {
    return (
        <View style={styles.container}>
            <View>
                <HeaderLeft />
            </View>
            <View>
                <HeaderRight />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'pink', //colors.black.main,
    },
});

export default Header;
