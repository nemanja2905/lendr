import { View, Text, StyleSheet, Platform } from 'react-native';

import { config } from '@Config';
import { colors } from '@Colors';
import { fonts } from '@Fonts';

import { Ionicons } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';

function MeetSelect({ raceLocations }) {
    let locations = raceLocations.map((item) => ({
        label: item.getUpperCaseRaceMeet(),
        value: item.nextrace,
    }));

    if (!locations || locations.length == 0) {
        return <></>;
    }

    return (
        <View style={styles.container}>
            <View>
                <RNPickerSelect
                    style={{
                        ...pickerSelectStyles,
                        iconContainer: {
                            top: Platform.OS == 'ios' ? 1 : 6, // 6 for android and 1 for IOS
                            right: 8,
                        },
                    }}
                    onValueChange={(val) => console.log(val)}
                    useNativeAndroidPickerStyle={false}
                    items={locations}
                    value={locations[0].value}
                    Icon={() => {
                        return (
                            <Ionicons
                                name="caret-down"
                                size={15}
                                color={'black'}
                            />
                        );
                    }}
                />
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text>Weather</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: colors.grey.dark,
        marginBottom: 10,
        paddingVertical: 8,
        marginHorizontal: config.margin.body,
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: fonts.LARGE,

        fontWeight: 'bold',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: fonts.LARGE,
        fontWeight: 'bold',

        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});

export default MeetSelect;
