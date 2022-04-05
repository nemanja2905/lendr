import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from 'react-native';

import { colors } from '@Colors';
import { config } from '@Config';

function RaceSlider({ raceNumbers, callback }) {
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnTextNS}>R{item.racenum}</Text>
            </TouchableOpacity>
        );
    };
    return (
        <View style={{ marginHorizontal: config.margin.body }}>
            <FlatList
                data={raceNumbers}
                renderItem={renderItem}
                keyExtractor={(item) => item.raceid}
                horizontal={true}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    btn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    btnTextS: {},
    btnTextNS: {},
});

export default RaceSlider;
