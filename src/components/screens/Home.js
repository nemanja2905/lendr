import React, { useState, useCallback, useEffect } from 'react';
import {
    View,
    Text,
    Modal,
    Button,
    StyleSheet,
    Linking,
    LogBox,
    StatusBar,
    ScrollView,
} from 'react-native';
import Slider from '../Home/Slider';
import CategoryButtonGroup from '../Home/CategoryButtonGroup';
import CarouselIcons from '../Home/CarouselIcons';
import NextPanel from '../Home/NextPanel';
import { getAllSports, getAllRaces } from '../../util/authAPI';
import HotBets from '../Home/HotBets';
import Futures from '../Home/Futures';
import LatestPromotions from '../Home/LatestPromotions';
import { MAIN_CATEGORIES, promotionDetails } from '../Home/constData';
// import DateTime from '../Join/components/DateTime';
function Home({ navigation, ...rest }) {
    const [state, setState] = React.useState({
        active: MAIN_CATEGORIES.racings,
        filter: 'ALL',
        filterRace: {
            race: 'A',
            media: '',
            period: '',
        },
    });
    const initData = {
        hotevents: [],
        topTypes: [],
        types: [],
    };
    const [data, setData] = useState(initData);
    const reloadData = useCallback(async (state2, data) => {
        // console.log('=> reloadData state=', state2);
        const active = state2.active;
        if (active === MAIN_CATEGORIES.sports) {
            const data2 = await getAllSports(state2.filter);
            if (state2.filter === 'ALL') {
                setData({
                    topTypes: data2.topsports || [],
                    types: data2.sports || [],
                    hotevents: data2.hotevents,
                });
            } else {
                setData({
                    ...data,
                    hotevents: data2.hotevents,
                });
            }
        } else {
            const data2 = await getAllRaces(state2.filterRace.race);

            setData({
                ...data,
                hotevents: data2.all,
            });
        }
    }, []);
    // console.log('Home data=', data);
    React.useEffect(() => {
        reloadData(state, data);
    }, []);

    useEffect(() => {
        LogBox.ignoreLogs([]);
    }, []);

    useEffect(() => {
        // setData(initData);
        reloadData(state, data);
    }, [state]);

    return (
        <ScrollView
            style={{
                ...styles.container,
                backgroundColor: '#ededed',
            }}
        >
            <StatusBar barStyle="light-content" />
            <Slider />
            <CategoryButtonGroup state={state} setState={setState} />
            <CarouselIcons
                active={state.active}
                // types={data.types}
                topTypes={data.topTypes}
            />
            <NextPanel
                active={state.active}
                types={data.types}
                topTypes={data.topTypes}
                hotevents={data.hotevents}
                state={state}
                setState={setState}
            />
            <View style={styles.divider} />
            <HotBets />
            <View style={styles.divider} />
            <Futures />
            <View style={styles.divider} />
            <LatestPromotions
                promotions={promotionDetails}
                navigation={navigation}
            />
            <View style={{ ...styles.divider, marginBottom: 50 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    divider: {
        marginVertical: 15,
        marginHorizontal: 15,
        borderTopColor: '#d0d0d0',
        borderTopWidth: 1,
        borderBottomColor: '#f0f0f0',
        borderBottomWidth: 1,
    },
});

export default Home;
