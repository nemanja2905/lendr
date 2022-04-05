import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { config } from '@Config';
import { colors } from '@Colors';
import { fonts } from '@Fonts';

import { Ionicons } from '@expo/vector-icons';

function RDHeader(props) {
    function sortRunner() {}
    function sortWin() {}
    function sortPlace() {}

    function WinPlace() {
        return (
            <View style={styles.winPlace}>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onPress={sortRunner}
                >
                    <Text style={styles.text}>Runner</Text>
                    <Ionicons
                        name="chevron-down"
                        size={15}
                        color={colors.grey.main}
                    />
                </TouchableOpacity>
                <View
                    style={{
                        flexDirection: 'row',
                        minWidth: config.width.winplace,
                        justifyContent: 'space-evenly',
                    }}
                >
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        onPress={sortWin}
                    >
                        <Text style={styles.text}>Win</Text>
                        <Ionicons
                            name="chevron-down"
                            size={15}
                            color={colors.grey.main}
                        />
                    </TouchableOpacity>
                    {props.market == 0 && (
                        <TouchableOpacity
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            onPress={sortWin}
                        >
                            <Text style={styles.text}>Place</Text>
                            <Ionicons
                                name="chevron-down"
                                size={15}
                                color={colors.grey.main}
                            />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        );
    }
    function Exotics() {}

    return (
        <View style={styles.container}>
            <WinPlace />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: config.margin.body,
        paddingVertical: 5,
    },
    winPlace: {
        marginLeft: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text: {
        fontSize: fonts.REGULAR,
        color: colors.grey.main,
        marginRight: 5,
    },
});

export default RDHeader;
