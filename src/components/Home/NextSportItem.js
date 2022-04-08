import React, { useState, useEffect, useCallback } from 'react';

import { StyleSheet, Text, View, Image } from 'react-native';
import { LogBox } from 'react-native';
import { fonts } from '@Fonts';
import { colors } from '@Colors';
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment';
import { SvgIcon } from '../Icon/Icon';
import Icon from 'react-native-vector-icons/FontAwesome';
import { color } from 'react-native-reanimated';

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
export default function NextSportItem(props) {
    const { data } = props;

    let idx;

    const [time, setTimer] = useState(0);

    useEffect(() => {
        setTimer(data.mjs);
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
        <View style={styles.between}>
            <View style={styles.linear}>
                <View style={{ width: 40 }}>
                    <SvgIcon name={data.sc} size={32} />
                </View>
                <View>
                    <View style={styles.linear}>
                        <Text style={styles.text}>{data.tan}</Text>
                        <Text style={styles.text}> vs </Text>
                        <Text style={styles.text}>{data.tbn}</Text>
                    </View>
                    <Text style={{ ...styles.text, color: colors.grey.main }}>
                        {data.gn}
                    </Text>
                </View>
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
            {/*  */}
        </View>
    );
}
const styles = StyleSheet.create({
    between: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: -5,
    },
    linear: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    text: {
        fontSize: fonts.REGULAR - 1,
    },
});
