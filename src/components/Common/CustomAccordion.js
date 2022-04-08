import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import { fonts } from '@Fonts';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Collapsible from 'react-native-collapsible';
import { colors } from '@Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomButton from '../Input/CustomButton';

const CustomAccordionTemplate = (props) => {
    const { img, header, noteDetails } = props;
    const [collapsed, setCollapsed] = useState(true);
    // console.log('CustomAccordionTemplate=', img);

    return (
        <View style={styles.container}>
            <View style={{ width: '100%' }}>
                <Image source={{ uri: img }} style={styles.image} />
                <Text style={{ margin: 15, fontSize: fonts.REGULAR }}>
                    {header}
                </Text>
                <View style={{ ...styles.linear, margin: 15, marginTop: 0 }}>
                    <CustomButton
                        label="Bet Now"
                        style={{
                            borderRadius: 5,
                            backgroundColor: 'black',
                            paddingHorizontal: 40,
                            paddingVertical: 7,
                        }}
                        textStyle={{
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: fonts.REGULAR,
                        }}
                        onClick={() => alert('Bet Now')}
                    />

                    <TouchableOpacity
                        style={styles.linear}
                        onPress={() => setCollapsed(!collapsed)}
                    >
                        <Text
                            style={{ fontSize: fonts.REGULAR, marginRight: 10 }}
                        >
                            Terms & Conditions
                        </Text>
                        {collapsed ? (
                            <Icon name="angle-down" size={18} />
                        ) : (
                            <Icon name="angle-up" size={18} />
                        )}
                    </TouchableOpacity>
                </View>
            </View>
            <Collapsible collapsed={collapsed} align="center">
                <View style={styles.divider} />
                <View style={{ height: 'auto' }}>
                    {noteDetails.map((note, idx) => (
                        <Text
                            key={idx}
                            style={{
                                fontSize: fonts.REGULAR,
                                marginVertical: 5,
                                marginHorizontal: 10,
                                marginBottom: 10,
                            }}
                        >
                            {note}
                        </Text>
                    ))}
                </View>
            </Collapsible>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        borderRadius: 6,
        backgroundColor: 'white',
        elevation: 3,
        shadowColor: 'black',
    },
    image: {
        width: '100%',
        minHeight: 120,
        height: 'auto',
        marginHorizontal: 0,
        paddingHorizontal: 0,

        resizeMode: 'cover',
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
    },
    divider: {
        marginVertical: 15,
        // marginHorizontal: 15,
        borderTopColor: '#d0d0d0',
        borderTopWidth: 1,
    },
    linear: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});
export default CustomAccordionTemplate;
