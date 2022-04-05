import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import CustomIcon from '@components/Icon/Icon';

import { fonts } from '@Fonts';
import { colors } from '@Colors';

function RaceFilterHome(props) {
    function FilterIcon({ icon, value, label }) {
        return (
            <View style={{ marginEnd: 5 }}>
                <TouchableOpacity
                    style={styles.btnContainer}
                    onPress={() => props.callback(value)}
                >
                    <CustomIcon
                        name={icon}
                        size={25}
                        color={
                            props.filters.includes(value)
                                ? colors.primary.main
                                : colors.grey.bg
                        }
                    />
                </TouchableOpacity>
                <Text
                    style={{
                        fontSize: fonts.SMALL,
                        textAlign: 'center',
                        marginTop: 3,
                    }}
                >
                    {label}
                </Text>
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                <FilterIcon icon="horse" value="R" label="Horses" />
                <FilterIcon icon="greyhound" value="G" label="Greys" />
                <FilterIcon icon="harness" value="H" label="Harness" />
            </View>
            <View style={{ flexDirection: 'row' }}>
                <FilterIcon icon="aus" value="AU" label="AU/NZ" />
                <FilterIcon icon="world" value="INT" label="INTL" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
        paddingBottom: 8,
        marginLeft: 15,
        marginRight: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.grey.dark,
    },
    btnContainer: {
        backgroundColor: 'white',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
    },
});

export default RaceFilterHome;
