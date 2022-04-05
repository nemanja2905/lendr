import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Linking,
} from 'react-native';

// Constant imports
import { colors } from '@Colors';
import { fonts } from '@Fonts';
import { config } from '@Config';

import { Ionicons } from '@expo/vector-icons';

function Support() {
    return (
        <View style={styles.body}>
            <View
                style={{
                    borderBottomColor: colors.grey.dark,
                    borderBottomWidth: 1,
                    flex: 1,
                    flexDirection: 'row',
                }}
            />

            <Text style={{ textAlign: 'center', marginVertical: 20 }}>
                Customer Support
            </Text>

            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                    style={{ ...styles.supportBtn, marginEnd: 15 }}
                    onPress={() => {
                        if (Linking.canOpenURL('tel:02919197819')) {
                            Linking.openURL('tel:02919197819');
                        }
                    }}
                >
                    <View style={styles.iconBgBTN}>
                        <Ionicons
                            name={'call'}
                            size={config.icon.size + 4}
                            color={'white'}
                            style={styles.icon}
                        />
                    </View>
                    <Text style={{ fontSize: fonts.SMALL + 1, marginTop: 8 }}>
                        (02) 91919 7819
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ ...styles.supportBtn, marginEnd: 15 }}
                    onPress={() => {
                        if (Linking.canOpenURL('mailto:support@eb.com')) {
                            Linking.openURL('mailto:support@eb.com');
                        }
                    }}
                >
                    <View style={styles.iconBgBTN}>
                        <Ionicons
                            name={'mail'}
                            size={config.icon.size + 4}
                            color={'white'}
                            style={styles.icon}
                        />
                    </View>
                    <Text style={{ fontSize: fonts.SMALL + 1, marginTop: 8 }}>
                        Email Support
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        marginTop: 25,
        marginBottom: 50,
        marginHorizontal: config.margin.body,
    },
    supportBtn: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 3,
        alignItems: 'center',
        paddingVertical: 15,
    },
    iconBgBTN: {
        backgroundColor: colors.primary.main,
        padding: 10,
        alignItems: 'center',
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    icon: {
        marginVertical: 'auto',
    },
});

export default Support;
