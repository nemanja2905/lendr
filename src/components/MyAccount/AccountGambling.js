import React, { useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationContext } from '@react-navigation/native';
import AccountLayout from './AccountLayout';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function AccountGambling(props) {
    const navigation = useContext(NavigationContext);
    return (
        <AccountLayout title="Gambling">
            {/* <Text>Account User AccountGambling</Text> */}
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.linearGroup}
                    onPress={() =>
                        navigation.navigate('MyAccount', {
                            screen: `depositlimit`,
                        })
                    }
                >
                    <Text>Deposit Limit</Text>
                    <Icon name="angle-right" size={20} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ ...styles.linearGroup, borderBottomWidth: 1 }}
                    onPress={() =>
                        navigation.navigate('MyAccount', {
                            screen: `selfexclude`,
                        })
                    }
                >
                    <Text>Self Exclude</Text>
                    <Icon name="angle-right" size={20} color="black" />
                </TouchableOpacity>
            </View>
        </AccountLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        paddingBottom: 48,
    },
    formControlGroup: {
        paddingBottom: 5,
        display: 'flex',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: '#d3d3d3',
    },
    linearGroup: {
        paddingVertical: 12,
        // paddingBottom: 16,
        paddingHorizontal: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: '#d3d3d3',
    },
});
