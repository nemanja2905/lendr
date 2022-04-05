import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import { fonts } from '@Fonts';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '@Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContext } from '@react-navigation/native';
function HeaderLeft({ route }) {
    const navigation = useContext(NavigationContext);
    if (route.name === 'MyAccount') {
        return (
            /** <TouchableOpacity
                onPress={() =>
                    navigation.navigate('MyAccount', {
                        screen: `${name}`,
                    })
                }
                style={styles.wrapper}
            > */
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={
                        () =>
                            navigation.navigate('MyAccount', {
                                screen: `navigation`,
                            })

                        // navigation.goBack()
                    }
                >
                    <Icon
                        name="angle-left"
                        size={30}
                        style={{ marginLeft: 10 }}
                        color={colors.primary.main}
                    />
                </TouchableOpacity>
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                }}
            >
                <Image
                    style={styles.image}
                    source={require('../../../assets/eb-logo.png')}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 5,
    },
    back: {
        marginLeft: 15,
        fontSize: fonts.Text,
        color: colors.primary.main,
    },
    heading: {
        fontSize: fonts.TITLE,
        color: 'white',
        fontWeight: 'bold',
    },
    image: {
        width: 105,
        height: 30,
    },
});

export default HeaderLeft;
