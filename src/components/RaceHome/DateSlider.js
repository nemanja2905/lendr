import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
} from 'react-native';

import { colors } from '@Colors';
import { fonts } from '@Fonts';

function Slider(props) {
    function SliderBtn({ item }) {
        return (
            <TouchableOpacity
                style={{
                    ...styles.sliderbtn,
                    backgroundColor:
                        props.selectedIndex == item.index
                            ? colors.primary.main
                            : colors.grey.bg,
                }}
                onPress={() => props.setCurrentSelection(item.index)}
            >
                <Text style={{ fontSize: fonts.MEDIUM }}>{item.label}</Text>
            </TouchableOpacity>
        );
    }
    return (
        <View style={styles.container}>
            <FlatList
                data={props.menuItems}
                renderItem={SliderBtn}
                keyExtractor={(item) => item.index}
                horizontal={true}
                refreshing={props.menuItems.length == 0 ? true : false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 5,
        paddingVertical: 4,
    },
    sliderbtn: {
        paddingVertical: 6,
        paddingHorizontal: 10,
        backgroundColor: colors.grey.bg,
        minWidth: 65,
        borderRadius: 20,
        marginRight: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Slider;
