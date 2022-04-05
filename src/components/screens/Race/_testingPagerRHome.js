import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import { fonts } from '@Fonts';
import { colors } from '@Colors';

// pageer view test
import PagerView from 'react-native-pager-view';

{
    /* <View style={styles.pageHeader}>
                <Text
                    style={{
                        textAlign: 'center',
                        fontSize: fonts.LARGE,
                        fontWeight: 'bold',
                    }}
                >
                    Racing
                </Text>
            </View> */
}

function RaceHome({ navigation }) {
    let [pages, setPages] = useState([]);
    let [cHeight, setCHeight] = useState(100);
    function getView(page) {
        return (
            <View key={page} style={{ height: '100%' }}>
                <ScrollView>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                    <Text>Page {page}</Text>
                </ScrollView>
            </View>
        );
    }

    useEffect(() => {
        let tempPages = [];
        for (i = 0; i < 5; i++) {
            tempPages.push(getView(i));
        }

        setPages(tempPages);
    }, []);

    console.log(cHeight);

    function PView() {
        return (
            <PagerView
                style={{ ...styles.pagerView }}
                initialPage={0}
                scrollEnabled={true}
            >
                {pages}
            </PagerView>
        );
    }
    return (
        <>
            <View style={styles.pageHeader}>
                <Text style={{ textAlign: 'center', fontSize: fonts.LARGE }}>
                    Racing
                </Text>
            </View>
            <View
                style={{
                    ...styles.pageHeader,
                    backgroundColor: 'red',
                    height: 50,
                    justifyContent: 'center',
                }}
            >
                <Text
                    style={{
                        textAlign: 'center',
                        fontSize: fonts.LARGE,
                        color: 'white',
                    }}
                >
                    Horizontal Scroll List
                </Text>
            </View>

            <View style={{ height: 50, backgroundColor: 'grey' }}>
                <Text>Area with filter header</Text>
            </View>
            <PView />
        </>
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
