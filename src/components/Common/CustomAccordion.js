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
                <Text style={{ margin: 12, fontSize: fonts.REGULAR }}>
                    {header}
                </Text>
                <View style={{ ...styles.linear, margin: 8 }}>
                    <CustomButton
                        label="Bet Now"
                        style={{
                            borderRadius: 5,
                            backgroundColor: 'black',
                            paddingHorizontal: 60,
                            paddingVertical: 5,
                        }}
                        textStyle={{
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: fonts.REGULAR,
                        }}
                        onClick={() => alert('Bet Now')}
                    />
                    <View style={styles.linear}>
                        <Text style={{ fontSize: fonts.REGULAR }}>
                            Terms & Conditions
                        </Text>
                        <TouchableOpacity
                            style={{ marginHorizontal: 10 }}
                            onPress={() => setCollapsed(!collapsed)}
                        >
                            {collapsed ? (
                                <Icon name="angle-down" size={18} />
                            ) : (
                                <Icon name="angle-up" size={18} />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <Collapsible collapsed={collapsed} align="center">
                <View style={styles.divider} />
                <View style={{ height: 'auto' }}>
                    {noteDetails.map((note, idx) => (
                        <Text
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
        height: 'auto',
        minHeight: 130,
        marginHorizontal: 0,
        paddingHorizontal: 0,
        width: '100%',
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
    },
});
export default CustomAccordionTemplate;
