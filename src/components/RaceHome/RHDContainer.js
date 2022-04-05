import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { fonts } from '@Fonts';
import { colors } from '@Colors';
import { config } from '@Config';

import { Ionicons } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

function DataContainerHD(props) {
    const navigation = useNavigation();

    if (props.data.length == 0) {
        return <View />;
    }

    function onPressRaceSelect(raceid) {
        // navigate to the screen with this raceid
        navigation.navigate('RMeeting', {
            raceid,
        });
    }

    function RaceNumber({ nextToRun, raceID, timer }) {
        return (
            <View style={{ flexDirection: 'row' }}>
                {nextToRun !== 99 && (
                    <View
                        style={{
                            backgroundColor: colors.grey.light,
                            height: 40,
                            width: 40,
                            borderRadius: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text>R{nextToRun}</Text>
                    </View>
                )}
                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: 10,
                    }}
                >
                    <Ionicons
                        name="chevron-forward"
                        size={config.icon.size}
                        color={colors.grey.main}
                    />
                </View>
            </View>
        );
    }

    function Row({ rowData, index, dataLength }) {
        let { ABANDONED, RACEMEET, NEXTRACENUMBER, REGION, RACECOUNTRY } =
            rowData;

        let racemeet =
            RACEMEET.toLowerCase().trim()[0].toUpperCase() +
            RACEMEET.substring(1).toLowerCase();
        return (
            <View
                style={
                    index === dataLength - 1
                        ? styles.listRowBorderless
                        : styles.listRow
                }
            >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: fonts.MEDIUM }}>{racemeet} </Text>
                    <Text style={{ color: colors.grey.main, marginLeft: 8 }}>
                        {RACECOUNTRY == 'AU' ? REGION : RACECOUNTRY}
                    </Text>
                </View>
                <View
                    style={{ justifyContent: 'center', alignItems: 'center' }}
                >
                    {ABANDONED == 1 ? (
                        <Text style={{ color: colors.grey.main }}>
                            Abandoned
                        </Text>
                    ) : (
                        <RaceNumber nextToRun={NEXTRACENUMBER} />
                    )}
                </View>
            </View>
        );
    }

    return (
        <View>
            <View style={styles.heading}>
                <Text style={{ fontWeight: 'bold', fontSize: fonts.LARGE }}>
                    {props.label}
                </Text>
            </View>
            <View style={styles.listContainer}>
                {props.data.map((loc, index) => (
                    <TouchableOpacity
                        key={loc.NEXTRACEID}
                        onPress={() => onPressRaceSelect(loc.NEXTRACEID)}
                    >
                        <Row
                            rowData={loc}
                            index={index}
                            dataLength={props.data.length}
                        />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    heading: {
        marginHorizontal: config.margin.body,
        paddingVertical: 10,
    },
    listContainer: {
        backgroundColor: 'white',
        paddingHorizontal: config.margin.body,
    },
    listRow: {
        borderBottomWidth: 1,
        borderBottomColor: colors.grey.dark,
        paddingVertical: 8,
        height: 55,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    listRowBorderless: {
        paddingVertical: 8,
        height: 55,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default DataContainerHD;
