import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { fonts } from '@Fonts';
import { colors } from '@Colors';
import { config } from '@Config';

import CustomIcon from '@components/Icon/Icon';

import { useNavigation } from '@react-navigation/native';

function RaceMeeting({ navigation, route }) {
    const [qRace, setQRace] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    //const navigation = useNavigation();

    async function getRaceDetails(raceid) {
        const url = `${config.domain}/races/getRaceDayEvents`;
        let options = {
            method: 'POST',
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                XAPIGTO: config.appBrand,
            },
            body: JSON.stringify({
                raceid: raceid,
                jsonresp: '1',
                clientid: '',
                meeting: 'true',
            }),
        };

        try {
            const response = await (await fetch(url, options)).json();
            if (response.ERROBJ.ERRORCODE == 0) {
                setError(false);
                setQRace(response.qRace);
            } else {
                setError(true);
            }
        } catch (e) {}
    }

    function onClickRace(id) {
        navigation.navigate('RDetail', {
            raceid: id,
        });
    }

    useEffect(() => {
        async function getData() {
            setLoading(true);
            await getRaceDetails(route.params.raceid);
            setLoading(false);
        }

        getData();
    }, [route.params?.raceid]);

    function RowData({ item, index, total }) {
        const { EVENT, RACENUM, RACEID } = item;

        return (
            <TouchableOpacity onPress={() => onClickRace(RACEID)}>
                <View
                    style={{
                        ...styles.rowContainer,
                        borderBottomWidth: index == total - 1 ? 0 : 1,
                    }}
                >
                    <View style={styles.raceNum}>
                        <Text style={{ color: colors.grey.main }}>
                            R{RACENUM}
                        </Text>
                    </View>
                    <View style={{ justifyContent: 'center' }}>
                        <Text style={{ fontSize: fonts.MEDIUM }}>{EVENT}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    function RHeader({ racemeet, weather, icon }) {
        let rmeet =
            racemeet.toLowerCase().trim()[0].toUpperCase() +
            racemeet.substring(1).toLowerCase();
        return (
            <View
                style={{
                    marginHorizontal: config.margin.body,
                    paddingVertical: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
            >
                <View>
                    <Text style={{ fontWeight: 'bold', fontSize: fonts.LARGE }}>
                        {rmeet}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <CustomIcon
                        name={icon}
                        size={config.icon.size - 2}
                        color={'black'}
                    />
                    <Text style={{ marginLeft: 10 }}>{weather}</Text>
                </View>
            </View>
        );
    }

    function getIcon(icon) {
        return 'cloudy';
    }

    if (loading) return <Text>Loading</Text>;

    if (qRace.length == 0) return <Text>Nothing to show here</Text>;
    return (
        <>
            <View>
                <RHeader
                    racemeet={qRace[0].RACEMEET}
                    weather={qRace[0].TRACKCONDITION}
                    icon={getIcon(qRace[0].WEATHER)}
                />
            </View>
            <View style={{ backgroundColor: 'white' }}>
                {qRace &&
                    qRace.map((item, index) => (
                        <RowData
                            item={item}
                            key={item.RACEID}
                            index={index}
                            total={qRace.length}
                        />
                    ))}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
        borderBottomColor: colors.grey.dark,
        marginHorizontal: config.margin.body,
        paddingVertical: 8,
    },
    raceNum: {
        backgroundColor: colors.grey.light,
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
});

export default RaceMeeting;
