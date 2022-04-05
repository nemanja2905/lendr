import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';

// Constant imports
import { colors } from '@Colors';
import { fonts } from '@Fonts';
import { config } from '@Config';

import InputField from '@components/Input/InputField';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';
import { fetchUserBenefits } from '../../../util/authAPI';
import Button, { Button2 } from '../../Input/Button';

export default function EliteBetPanel(props) {
    const { balance, reward, updateData } = props;
    const [selected, setSelected] = useState(0);
    // const [points, setPoints] = useState('');
    const [message, setMessage] = useState(null);
    // const limitPoint = 3000;
    const [formInput, setFormInput] = useState({
        points: null,
        limitPoint: null,
    });
    const urls = [
        `https://devapi.racingtipoff.com/user/pointsredeem`,
        `https://devapi.racingtipoff.com/user/pointsautoredeem`,
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            if (message !== null) {
                setMessage(null);
                updateData();
            }
        }, 3000);
        return () => clearInterval(interval);
    }, [message]);

    const updateData2 = async (selected, _points) => {
        // console.log('BenReedemBody updateData2', selected, _points);
        const data3 = (await fetchUserBenefits(urls[selected], _points)) || {};
        // console.log('setMessage', data3);
        setMessage(data3);
    };

    const handleClick = () => {
        if (selected === 0) {
            const _points = parseInt(formInput.points);
            if (_points === 0) return;
            // console.log('preapring to Redeem');
            updateData2(selected, _points);
        } else {
            const _points = parseInt(formInput.limitPoint);

            if (_points === 0) return;
            updateData2(selected, _points);
        }
    };

    return (
        <>
            <Text
                style={{
                    fontSize: fonts.REGULAR,
                    fontWeight: 'bold',
                    marginBottom: 12,
                }}
            >
                Earn with every bet!
            </Text>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingBottom: 12,
                }}
            >
                <Button2
                    value="Redeem Points"
                    type="loto"
                    style={{ width: '45%', margin: 15 }}
                    onClick={() => setSelected(0)}
                    selected={selected === 0}
                />
                <Button2
                    value="Auto Redeem"
                    type="loto"
                    style={{ width: '45%', margin: 15 }}
                    onClick={() => setSelected(1)}
                    selected={selected === 1}
                />
            </View>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}
            >
                <Text
                    style={{
                        fontSize: fonts.REGULAR,
                        // paddingBottom: 12,
                    }}
                >
                    {selected === 0
                        ? 'How many points would you like to redeem?'
                        : 'Set your automatic Reward Points Redemption limit'}
                </Text>
            </View>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}
            >
                <InputField
                    placeholder="Enter points..."
                    width="100%"
                    type="numeric"
                    value={
                        selected === 0 ? formInput.points : formInput.limitPoint
                    }
                    onChange={(v) => {
                        selected === 0
                            ? setFormInput({
                                  ...formInput,
                                  points: v,
                              })
                            : setFormInput({
                                  ...formInput,
                                  limitPoint: 0,
                              });
                    }}
                    onBlur={() => console.log('enter points..')}
                />
            </View>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}
            >
                <Text
                    style={{
                        fontSize: fonts.REGULAR,
                        paddingTop: 6,
                        // paddingVertical: 6,
                    }}
                >
                    100 points = $1.00 Bonus Bet
                </Text>
            </View>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    paddingTop: 6,
                    paddingBottom: 24,
                }}
            >
                <Button
                    value={selected === 0 ? 'Redeem' : 'Set'}
                    // type="loto"
                    width="70%"
                    onClick={handleClick}
                />
            </View>
        </>
    );
}
