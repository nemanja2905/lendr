import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { useState, useEffect } from 'react';

import RDRow from './RDRow';

import { config } from '@Config';
import { colors } from '@Colors';
import { fonts } from '@Fonts';

import RDHeader from './RDHeader';
// import RDFlucsFT from './RdFlucsFT';

function RDFieldsData({ raceFields, raceid, betproducts, availexotics }) {
    if (raceFields === undefined) return <></>;
    const [markets, setMarkets] = useState([]);
    const [selectMarket, setSetlectedMarket] = useState(0);
    const [mode, setMode] = useState('fixed'); // can be fixed or tote

    useEffect(() => {
        let tabs = [{ label: 'Win / Place', value: 0 }];
        availexotics['quinella'] && tabs.push({ label: 'Quinella', value: 1 });
        availexotics['exacta'] && tabs.push({ label: 'Exacta', value: 2 });
        availexotics['trifecta'] && tabs.push({ label: 'Trifecta', value: 3 });
        availexotics['quadrella'] &&
            tabs.push({ label: 'Quadrella', value: 4 });
        availexotics['firstfour'] && tabs.push({ label: 'First 4', value: 5 });

        setMarkets(tabs);
    }, [availexotics]);

    function marketRender({ item }) {
        return (
            <TouchableOpacity
                style={{
                    ...styles.marketContainer,
                    backgroundColor:
                        selectMarket == item.value
                            ? colors.primary.main
                            : colors.grey.dark,
                }}
                onPress={() => setSetlectedMarket(item.value)}
            >
                <Text style={styles.marketContainerText}>{item.label}</Text>
            </TouchableOpacity>
        );
    }
    return (
        <>
            <View
                style={{
                    marginHorizontal: config.margin.body,
                    marginBottom: 10,
                }}
            >
                <FlatList
                    data={markets}
                    renderItem={marketRender}
                    keyExtractor={(item) => item.value}
                    horizontal={true}
                />
            </View>
            <View style={{ backgroundColor: 'white' }}>
                {/* <RDFlucsFT
                    market={selectMarket}
                    mode={mode}
                    setMode={setMode}
                /> */}
                <RDHeader market={selectMarket} />
                {raceFields.map((item) => (
                    <RDRow
                        key={item.actualcode}
                        item={item}
                        raceid={raceid}
                        mode={mode}
                    />
                ))}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {},
    marketContainer: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        minWidth: 75,
        marginRight: 10,
        borderRadius: 15,
        alignItems: 'center',
    },
    marketContainerText: {
        fontSize: fonts.REGULAR + 1,
    },
});

export default RDFieldsData;
