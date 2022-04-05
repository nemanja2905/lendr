import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { config } from '@Config';
import { colors } from '@Colors';
import { fonts } from '@Fonts';

import { Ionicons } from '@expo/vector-icons';

function RDFlucsFT({ flucs, setFlucs, market, mode, setMode }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <Text>Flucs</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: 15,
    },
});

export default RDFlucsFT;
