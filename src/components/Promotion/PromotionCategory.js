import React from 'react';

import { StyleSheet, Text, View, Image } from 'react-native';
import { fonts } from '@Fonts';
import { colors } from '@Colors';
import CustomButton from '../Input/CustomButton';
export default function PromotionCategory(props) {
    const { filter, setFilter, types } = props;
    // console.log('Promotioncategory types=', types.length, types);

    return (
        <>
            <CustomButton
                key={100}
                label={'   All   '}
                icon={''}
                iconVisible={false}
                value={''}
                style={{
                    height: 30,
                    marginHorizontal: 5,
                    paddingHorizontal: 20,
                    borderRadius: 15,
                    backgroundColor: '#e0e0e0',
                }}
                textStyle={{
                    fontSize: fonts.REGULAR,
                }}
                onClick={() => setFilter('')}
                isSelected={filter === ''}
                selectedStyle={{
                    backgroundColor: colors.primary.main,
                }}
            />
            {types.map((data, idx) => (
                <CustomButton
                    key={idx}
                    label={data.label}
                    icon={data.icon}
                    value={data.value}
                    iconVisible={false}
                    style={{
                        height: 30,
                        marginHorizontal: 5,
                        borderRadius: 15,
                        paddingHorizontal: 15,
                        backgroundColor: '#e0e0e0',
                    }}
                    textStyle={{
                        fontSize: fonts.REGULAR,
                    }}
                    onClick={() => setFilter(data.value)}
                    isSelected={filter === data.value}
                    selectedStyle={{
                        backgroundColor: colors.primary.main,
                    }}
                />
            ))}
        </>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 5,
        marginBottom: 20,
        // width: 'inherit',
        overflow: 'scroll',
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        // alignItems: 'baseline',
    },
});
