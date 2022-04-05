import { Text, View, StyleSheet } from 'react-native';

import { fonts } from '@Fonts';
import { config } from '@Config';

function EDetails({ eventDetails }) {
    if (eventDetails == undefined) return <></>;
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.text}>
                    <Text style={{ ...styles.text, fontWeight: 'bold' }}>
                        {eventDetails.racedistance}m
                    </Text>{' '}
                    R{eventDetails.racenum} {eventDetails.event}
                </Text>
            </View>
            <View>
                <Text style={styles.text}>2m 57s</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: config.margin.body,
        paddingBottom: 15,
    },
    text: {
        fontSize: fonts.REGULAR,
    },
});

export default EDetails;
