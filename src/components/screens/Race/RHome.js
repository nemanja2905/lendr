import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import { fonts } from '@Fonts';
import { colors } from '@Colors';
import { config } from '@Config';

// components
import Slider from '@components/RaceHome/DateSlider';
import RaceFilterHome from '@components/RaceHome/RaceFilter';
import RaceHomeDetail from '@components/RaceHome/RaceHomeDetail';
import RaceHomeNTR from '@components/RaceHome/RaceHomeNTR';

const dayOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];

function RaceHome({ navigation }) {
    const today = new Date();
    let yesterday = new Date().setDate(new Date().getUTCDate() - 1);
    let tomorrow = new Date().setDate(new Date().getUTCDate() + 1);
    let day3 = new Date().setDate(new Date().getUTCDate() + 2);
    let day4 = new Date().setDate(new Date().getUTCDate() + 3);

    let menuInitialState = [
        {
            index: 0,
            label: 'Yesterday',
            date: `${new Date(yesterday).getUTCFullYear()}-${
                new Date(yesterday).getUTCMonth() + 1
            }-${new Date(yesterday).getUTCDate()}`,
        },
        {
            index: 1,
            label: 'Next to Jump',
            date: `${today.getUTCFullYear()}-${
                today.getUTCMonth() + 1
            }-${today.getUTCDate()}`,
        },
        {
            index: 2,
            label: 'Today',
            date: `${today.getUTCFullYear()}-${
                today.getUTCMonth() + 1
            }-${today.getUTCDate()}`,
        },
        {
            index: 3,
            label: 'Tomorrow',
            date: `${new Date(tomorrow).getUTCFullYear()}-${
                new Date(tomorrow).getUTCMonth() + 1
            }-${new Date(tomorrow).getUTCDate()}`,
        },
        {
            index: 4,
            label: dayOfWeek[new Date(day3).getUTCDay()],
            date: `${new Date(day3).getUTCFullYear()}-${
                new Date(day3).getUTCMonth() + 1
            }-${new Date(day3).getUTCDate()}`,
        },
        {
            index: 5,
            label: dayOfWeek[new Date(day4).getUTCDay()],
            date: `${new Date(day4).getUTCFullYear()}-${
                new Date(day4).getUTCMonth() + 1
            }-${new Date(day4).getUTCDate()}`,
        },
    ];

    const [currentSelection, setCurrentSelection] = useState(2);
    const [raceMenu, setRaceMenu] = useState(menuInitialState);
    const [filters, setFilters] = useState(['R', 'H', 'G', 'INT', 'AU']);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const [data, setData] = useState(null);

    function filterCallback(value) {
        setLoading(true);
        if (filters.includes(value)) {
            setFilters(filters.filter((item) => item !== value));
        } else {
            setFilters([...filters, value]);
        }
    }

    async function getRaceEventsData() {
        let body = {
            racetype: JSON.stringify({
                R: filters.includes('R') ? true : false,
                G: filters.includes('G') ? true : false,
                H: filters.includes('H') ? true : false,
            }),
            startdate: raceMenu[currentSelection].date,
            enddate: raceMenu[currentSelection].date,
            country: JSON.stringify({
                AU: filters.includes('AU') ? true : false,
                INT: filters.includes('INT') ? true : false,
            }),
            jsonresp: '1',
        };

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

        let url = `${config.domain}/races/getRaceMeetings`;

        try {
            const response = await (await fetch(url, options)).json();
            if (response.ERROBJ.ERRORCODE == 0) {
                let racing = JSON.parse(response.R);
                let harness = JSON.parse(response.H);
                let geryhounds = JSON.parse(response.G);

                let dataR = {
                    int: {
                        racing: racing.filter((item) => item.CATEGORY == 'INT'),
                        harness: harness.filter(
                            (item) => item.CATEGORY == 'INT'
                        ),
                        greyhounds: geryhounds.filter(
                            (item) => item.CATEGORY == 'INT'
                        ),
                    },
                    au: {
                        racing: racing.filter((item) => item.CATEGORY == 'AU'),
                        harness: harness.filter(
                            (item) => item.CATEGORY == 'AU'
                        ),
                        greyhounds: geryhounds.filter(
                            (item) => item.CATEGORY == 'AU'
                        ),
                    },
                };

                // set the global data state
                setError(false);
                setData(dataR);
            } else {
                // there is an error show error message
                setError(true);
            }
        } catch (e) {
            console.log(e);
            setError(true);
        }
    }

    useEffect(() => {
        async function getData() {
            setLoading(true);
            await getRaceEventsData();
            setLoading(false);
        }

        if (currentSelection !== 1) getData();
    }, [currentSelection]); // should only change when current selection changes, today, tomorrow etc

    return (
        <ScrollView>
            <View style={styles.pageHeader}>
                <Text style={{ textAlign: 'center', fontSize: fonts.LARGE }}>
                    Racing
                </Text>
            </View>
            <View
                style={{
                    ...styles.pageHeader,
                    backgroundColor: 'white',
                    justifyContent: 'center',
                }}
            >
                {raceMenu.length > 0 && (
                    <Slider
                        selectedIndex={currentSelection}
                        setCurrentSelection={setCurrentSelection}
                        menuItems={raceMenu}
                    />
                )}
            </View>

            <View style={{}}>
                <RaceFilterHome
                    filters={filters}
                    setFilters={setFilters}
                    callback={filterCallback}
                />
            </View>

            {loading ? (
                <Text>Loading</Text>
            ) : (
                data !== null && (
                    <View>
                        {currentSelection == 1 ? (
                            <RaceHomeNTR filters={filters} />
                        ) : (
                            <RaceHomeDetail
                                data={data}
                                filters={filters}
                                loading={loading}
                                error={error}
                            />
                        )}
                    </View>
                )
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'pink',
    },
    pageHeader: {
        backgroundColor: colors.primary.main,
        paddingVertical: 8,
    },
    pagerView: { flex: 1 },
});

export default RaceHome;
