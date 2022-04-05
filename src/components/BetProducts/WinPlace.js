import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { config } from '@Config';
import { colors } from '@Colors';
import { fonts } from '@Fonts';

function WinPlace({ sprites, mode }) {
    if (sprites && Object.keys(sprites).length == 0) {
        return <></>;
    }

    let { Fixed, Tote } = sprites;
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.btnContainer}>
                <Text style={styles.text}>
                    {mode == 'fixed' ? Fixed[0].PRICE : Tote[0].PRICE}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnContainer}>
                <Text style={styles.text}>
                    {mode == 'fixed' ? Fixed[1].PRICE : Tote[1].PRICE}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    btnContainer: {
        backgroundColor: colors.grey.light,
        padding: 5,
        width: config.width.wpBtn,
        height: config.height.wpBtn,
        borderRadius: 8,
        alignContent: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'black',
        textAlign: 'center',
        fontSize: fonts.MEDIUM,
        fontWeight: 'bold',
    },
});

export default WinPlace;
