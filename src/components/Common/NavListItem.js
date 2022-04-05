import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import { fonts } from '@Fonts';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '@Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import AvatarIcon from '../../../assets/svg/avatar.svg';
import { color } from 'react-native-reanimated';
import { NavigationContext } from '@react-navigation/native';
import { AssetIcon } from '../Icon/Icon';
// import SvgUri from 'react-native-svg-uri';

export default function NavListItem(props) {
    const { icon, label, name } = props;
    const navigation = useContext(NavigationContext);
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() =>
                    navigation.navigate('MyAccount', {
                        screen: `${name}`,
                    })
                }
                style={styles.wrapper}
            >
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    {/* <Icon name={icon} size={20} color="black" /> */}
                    <AssetIcon name={icon} />
                    <Text style={{ marginLeft: 20 }}>
                        {label}
                        {/* {name} */}
                    </Text>
                </View>
                <Icon
                    name="angle-right"
                    size={20}
                    // style={{ marginLeft: 10 }}
                    color="black"
                />
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        borderColor: '#d3d3d3',

        padding: 12,
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
