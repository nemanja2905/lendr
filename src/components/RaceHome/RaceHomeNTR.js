import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { fonts } from '@Fonts';
import { colors } from '@Colors';
import { config } from '@Config';

import CustomIcon from '@components/Icon/Icon';

function RaceHomeNTR({ filters }) {
    const [nextToRun, setNextToRun] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    async function getRaceEventData() {
        let body = {
            racetype: JSON.stringify({
                R: filters.includes('R') ? true : false,
                G: filters.includes('G') ? true : false,
                H: filters.includes('H') ? true : false,
            }),
            startdate: null,
            endDate: null,
            country: JSON.stringify({
                AU: filters.includes('AU') ? true : false,
                INT: filters.includes('INT') ? true : false,
            }),
            jsonresp: '1',
            paramsObj: '1',
            nexttojump: '1',
            clientid: null,
        };

        const url = `${config.domain}/races/getRaceDayEvents`;
        let options = {
            method: 'POST',
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                XAPIGTO: config.appBrand,
            },
            body: JSON.stringify(body),
        };

        try {
            const response = await (await fetch(url, options)).json();
            if (response.ERROBJ.ERRORCODE == 0) {
                setNextToRun(response.qRace.slice(0, 100));
                setError(false);
            } else {
                setError(true);
            }
        } catch (e) {
            setError(true);
        }
    }

    useEffect(() => {
        async function getData() {
            setLoading(true);
            await getRaceEventData();
            setLoading(false);
        }

        getData();
    }, [filters]);

    function getIcon(name) {
        return (
            <View style={{ width: 25 }}>
                <CustomIcon
                    name={name}
                    size={config.icon.size}
                    color={colors.grey.main}
                />
            </View>
        );
    }

    function RowDataNTR({ item }) {
        let { RACETYPE, RACEMEET, RACENUM, COUNTRYLABEL } = item;
        let icon =
            RACETYPE == 'R'
                ? 'horse'
                : RACETYPE == 'G'
                ? 'greyhound'
                : 'harness';

        let racemeet =
            RACEMEET.toLowerCase().trim()[0].toUpperCase() +
            RACEMEET.substring(1).toLowerCase();

        let countryLabel =
            COUNTRYLABEL == ''
                ? ' '
                : COUNTRYLABEL.toLowerCase().trim()[0].toUpperCase() +
                  COUNTRYLABEL.substring(1).toLowerCase();
        return (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: colors.grey.dark,
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                    }}
                >
                    {getIcon(icon)}
                    <Text style={{ marginLeft: 10 }}>{racemeet}</Text>
                    <Text> - R{RACENUM}</Text>
                    <Text style={{ marginLeft: 10, color: colors.grey.main }}>
                        {countryLabel}
                    </Text>
                </View>
                <View>
                    <Text>Time</Text>
                </View>
            </View>
        );
    }

    if (loading) return <Text>Getting your data</Text>;
    return (
        <View style={styles.body}>
            {nextToRun.length > 0 &&
                nextToRun.map((item) => (
                    <TouchableOpacity key={item.RACEID}>
                        <RowDataNTR item={item} />
                    </TouchableOpacity>
                ))}
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        marginHorizontal: config.margin.body,
        marginTop: 5,
    },
});

export default RaceHomeNTR;
