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

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { colors } from '@Colors';
import { config } from '@Config';
import { fonts } from '@Fonts';
import HeaderLeft from '../../shared/HeaderLeft';
import HeaderRight2 from '../../shared/HeaderRight2';
import PromotionCategory from '../../Promotion/PromotionCategory';
import { PromotionsPanel } from '../../Home/LatestPromotions';
import { promotionDetails } from '../../Home/constData';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
const Stack = createStackNavigator();
export default function PromotionPage({ navigation }) {
    return (
        <Stack.Navigator
            screenOptions={({ route }) => {
                return {
                    headerStyle: {
                        backgroundColor: config.header.headerColor,
                    },
                    //header: (navigation, route, back) => <Header back={back} />, // if you want to add a custom Header
                    headerTintColor: 'white',
                    headerLeft: () => <HeaderLeft route={route} />,
                    headerRight: () => <HeaderRight2 route={route} />,

                    headerTitle: '',
                };
            }}
        >
            <Stack.Screen name="index" component={Index} />
        </Stack.Navigator>
    );
}

const promotionTypes = [
    {
        label: 'Bonus Back',
        value: 'Bonus Back',
        iconVisible: false,
    },
    {
        label: 'Racing',
        value: 'Racing',
        iconVisible: false,
    },
    {
        label: 'Sports',
        value: 'Sports',
        iconVisible: false,
    },
];

const Index = ({ navigation }) => {
    const [filter, setFilter] = useState('');
    let filtered = promotionDetails.filter(
        (p) => filter === '' || p.type === filter
    );
    return (
        <ScrollView style={styles.container}>
            <Text
                style={{
                    fontSize: fonts.LARGE,
                    fontWeight: 'bold',
                    marginBottom: 20,
                }}
            >
                Promotions
            </Text>
            <View style={styles.linear}>
                <PromotionCategory
                    filter={filter}
                    setFilter={setFilter}
                    types={promotionTypes}
                />
            </View>
            <PromotionsPanel promotions={filtered} />
            <TouchableOpacity
                onPress={() => {
                    alert('See All Promotions');
                    navigation.goBack();
                }}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginRight: 12,
                    marginBottom: 60,
                }}
            >
                <Text style={{ fontSize: fonts.REGULAR, marginRight: 5 }}>
                    See All Promotions
                </Text>
                <Icon name="angle-right" size={14} />
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    linear: {
        display: 'flex',
        flexDirection: 'row',
    },
});
