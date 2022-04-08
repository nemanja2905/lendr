import React, { useState, useEffect, useCallback } from 'react';

import { StyleSheet, Text, View, Image } from 'react-native';
import { LogBox } from 'react-native';
import { fonts } from '@Fonts';
import { colors } from '@Colors';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AssetIcon } from '../Icon/Icon';
import moment from 'moment';

const getTimeString = (time) => {
    if (time >= 3600) {
        return `${parseInt(time / 3600)}h`;
    } else if (time > 300) {
        // return new Date(time * 1000).toISOString().substr(14, 5);
        // return `${parseInt(time / 60)}M ${time % 60}S`;
        return `${parseInt(time / 60)}m`;
    }
    return `${time}s`;
};
const isTimeUrgent = (time) => {
    return time <= 300;
};

const NewCountdown = ({ time }) => {
    let timeUrgent = isTimeUrgent(time);
    let timeString = getTimeString(time);
    return (
        <View>
            <Text
                style={{
                    color: timeUrgent ? colors.error.main : 'black',
                    fontSize: fonts.REGULAR - 1,
                }}
            >
                {timeString}
            </Text>
        </View>
    );
};
const getRemainSeconds = (starttime) => {
    /**console.log(
        'NextRacingItem data=',
        RACESTARTTIME,
        ',endtime=',
        moment(RACESTARTTIME),
        ',starttime=',
        c,
        ',diff=',
        moment.duration(moment(RACESTARTTIME).diff(c)).asSeconds()
    ); */
    return moment.duration(moment(starttime).diff(moment())).asSeconds();
};
export default function NextRacingItem(props) {
    const { data } = props;

    const { RACEMEET, RACEID, RACETYPE, RACENUM, RACESTARTTIME } = data;

    let idx;
    const [time, setTimer] = useState(0);
    useEffect(() => {
        const remainSeconds = getRemainSeconds(RACESTARTTIME);
        setTimer(remainSeconds);
        return () => clearInterval(idx);
    }, [data]);
    useEffect(() => {
        return () => clearInterval(idx);
    }, []);
    useEffect(() => {
        idx = setInterval(() => {
            if (time > 0) {
                setTimer(time - 1);
            } else {
                return () => clearInterval(idx);
            }
        }, 1000);
        return () => clearInterval(idx);
    }, [time]);

    return (
        <View style={styles.container}>
            <View style={styles.linear}>
                <AssetIcon name={RACETYPE} size={20} />
                <Text style={styles.text}>{RACEMEET}</Text>
                <Text style={styles.text2}>R{RACENUM}</Text>
            </View>

            <View
                style={{
                    ...styles.linear,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                }}
            >
                <NewCountdown time={time} />
                <Icon name="angle-right" size={14} style={{ marginLeft: 10 }} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',

        // paddingHorizontal: 15,
    },
    linear: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    text: {
        fontSize: fonts.REGULAR - 1,
        // fontWeight: 'bold',
        paddingHorizontal: 10,
    },
    text2: {
        fontSize: fonts.REGULAR - 1,
        // fontWeight: 'bold',
        color: colors.grey.main,
    },
});
