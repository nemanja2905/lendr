import React, { useState, useEffect, useCallback, useContext } from 'react';
import { MAIN_CATEGORIES } from './constData';
import { StyleSheet, Text, View, Image } from 'react-native';
import { LogBox } from 'react-native';
import { fonts } from '@Fonts';
import { colors } from '@Colors';
import CustomAccordionTemplate from '../Common/CustomAccordion';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContext } from '@react-navigation/native';
export const PromotionsPanel = (props) => {
    const { promotions } = props;
    return (
        <>
            <View style={styles.container}>
                {promotions.map((prom, idx) => (
                    <CustomAccordionTemplate
                        key={idx}
                        img={prom.img}
                        header={prom.header}
                        noteDetails={prom.noteDetails}
                    />
                ))}
            </View>
        </>
    );
};
const LatestPromotions = (props) => {
    const { promotions } = props;
    const navigation = useContext(NavigationContext);

    const title = 'Latest Promotions';
    return (
        <View style={styles.wrapper}>
            <Text style={styles.title}>{title}</Text>
            <PromotionsPanel promotions={promotions} />
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('PromotionPage');
                }}
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    flexDirection: 'row',
                    marginRight: 12,
                }}
            >
                <Text style={{ fontSize: fonts.REGULAR, marginRight: 5 }}>
                    View More
                </Text>
                <Icon name="angle-right" size={14} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        marginHorizontal: 15,
    },
    types: {
        marginVertical: 10,
    },
    list: {},
    title: {
        fontSize: fonts.MEDIUM,
        fontWeight: 'bold',
    },
    container: {
        marginVertical: 10,
        borderRadius: 5,
        // backgroundColor: 'white',
        // paddingHorizontal: 10,
    },
});

export default LatestPromotions;
