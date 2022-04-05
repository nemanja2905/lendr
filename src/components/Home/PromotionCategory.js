import React from 'react';
import { MAIN_CATEGORIES } from './constData';
import { StyleSheet, Text, View, Image } from 'react-native';
import { LogBox } from 'react-native';
import { fonts } from '@Fonts';
import { colors } from '@Colors';
import { ScrollView } from 'react-native-gesture-handler';
import { raceTypes } from './constData';
import CustomButton from '../Input/CustomButton';
export default function PromotionCategory(props) {
    const { active, filter, setFilter, types, topTypes } = props;
    // console.log('Promotioncategory types=', types.length, types);
    if (active === MAIN_CATEGORIES.sports) {
        return (
            <>
                <CustomButton
                    key={100}
                    label={'   All   '}
                    icon={'ALL'}
                    iconVisible={false}
                    value={'ALL'}
                    style={{
                        height: 25,
                        marginHorizontal: 5,
                        marginBottom: 5,
                        borderRadius: 15,
                        backgroundColor: '#e0e0e0',
                    }}
                    textStyle={{
                        fontSize: fonts.REGULAR,
                    }}
                    onClick={() => setFilter('ALL')}
                    isSelected={filter === 'ALL'}
                    selectedStyle={{
                        backgroundColor: colors.primary.main,
                    }}
                />
                {topTypes.map((type, idx) => (
                    <CustomButton
                        key={idx}
                        label={type.sn}
                        icon={type.sc}
                        value={type.sc}
                        style={{
                            height: 25,
                            marginHorizontal: 5,
                            borderRadius: 15,
                            marginBottom: 5,
                            backgroundColor: '#e0e0e0',
                        }}
                        textStyle={{
                            fontSize: fonts.REGULAR,
                        }}
                        onClick={() => setFilter(type.sc)}
                        isSelected={filter === type.sc}
                        selectedStyle={{
                            backgroundColor: colors.primary.main,
                        }}
                    />
                ))}
            </>
        );
    }
    return (
        <>
            <CustomButton
                key={100}
                label={'   All   '}
                icon={'A'}
                iconVisible={false}
                value={'A'}
                style={{
                    height: 25,
                    marginHorizontal: 5,
                    marginBottom: 5,
                    borderRadius: 15,
                    backgroundColor: '#e0e0e0',
                }}
                textStyle={{
                    fontSize: fonts.REGULAR,
                }}
                onClick={() => setFilter('A')}
                isSelected={filter === 'A'}
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
                    style={{
                        height: 25,
                        marginHorizontal: 5,
                        marginBottom: 5,
                        borderRadius: 15,
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
