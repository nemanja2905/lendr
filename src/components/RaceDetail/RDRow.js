import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

import { config } from '@Config';
import { colors } from '@Colors';
import { fonts } from '@Fonts';

import { Ionicons } from '@expo/vector-icons';

import WinPlace from '@components/BetProducts/WinPlace';

function RDRow({ item, raceid, mode }) {
    const {
        actualcode,
        barrier,
        fieldname,
        fieldnum,
        image,
        jockey,
        lastten,
        scratching,
        trainer,
        weight,
        sprites,
    } = item;
    let url = `${config.cdn}/images/silks/jockey-silk-${raceid}-${actualcode}.png`;
    // if (event && event.racetype && event.racetype === "G") {
    // 	url = `${process.env.cdn}/images/greyhound/Grey-${raceField.fieldnum}.png`;
    // }

    return (
        <View style={styles.body}>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <View>
                        <Image source={{ uri: url }} style={styles.image} />
                    </View>
                    <View>
                        <Ionicons
                            name="chevron-down"
                            size={18}
                            color={colors.grey.main}
                        />
                    </View>
                </View>

                <View style={styles.textContainer}>
                    <Text
                        style={{
                            color: 'black',
                            fontWeight: 'bold',
                            fontSize: fonts.REGULAR + 1,
                        }}
                    >
                        {fieldnum} {fieldname} ({barrier})
                    </Text>
                    <View style={{ flexDirection: 'row', marginTop: 3 }}>
                        <Text style={{ ...styles.textSecondary, width: 40 }}>
                            {weight}kg
                        </Text>
                        <Text style={styles.textSecondary}>J: {jockey}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ ...styles.textSecondary, width: 40 }}>
                            {lastten}
                        </Text>
                        <Text style={styles.textSecondary}>T: {trainer}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.containerMarket}>
                <WinPlace sprites={sprites} mode={mode} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        marginHorizontal: config.margin.body,
        borderTopWidth: 1,
        borderColor: colors.grey.dark,
        flexDirection: 'row',
    },
    container: {
        flexDirection: 'row',
        flex: 1,

        paddingTop: 8,
        paddingBottom: 5,
    },

    containerMarket: {
        width: config.width.winplace,
        justifyContent: 'center',
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 30,
        paddingTop: 5,
    },
    image: {
        height: 30,
        width: 25,
        resizeMode: 'contain',
    },
    textContainer: {
        marginLeft: 15,
    },
    textSecondary: {
        color: colors.grey.main,
        fontSize: fonts.REGULAR,
    },
});

export default RDRow;
