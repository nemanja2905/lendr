import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Login from '@components/Login/Login';

import { NavigationContext } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Avatar, Badge, withBadge } from 'react-native-elements';
import { colors } from '@Colors';
import { fonts } from '@Fonts';

function HeaderRight2(props) {
    const { route } = props;
    const { name, key, params } = route;
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useContext(NavigationContext);

    return (
        <>
            <View style={styles.container}>
                <View
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Icon
                        name="dollar"
                        size={12}
                        style={{
                            alignSelf: 'center',
                            paddingHorizontal: 10,
                            paddingVertical: 6,
                            marginRight: 10,
                            borderRadius: 16,
                            backgroundColor: 'white',
                        }}
                        color="black"
                    />

                    <Badge
                        status="error"
                        value={10}
                        containerStyle={{
                            position: 'absolute',
                            top: 5,
                            left: 10,
                        }}
                    />
                </View>
                <View>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate('MyAccount', {
                                screen: 'navmenu',
                            })
                        }
                    >
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                padding: 10,
                                paddingBottom: 18,
                                borderColor: '#d3d3d3',
                                borderLeftWidth: 1,
                                alignItems: 'center',
                                paddingTop: 18,
                                // backgroundColor: 'white',
                            }}
                        >
                            <Text
                                style={{
                                    color: 'white',
                                    fontWeight: 'bold',
                                    paddingRight: 5,
                                }}
                            >
                                $1,323.50
                            </Text>

                            <Icon
                                name="angle-down"
                                size={12}
                                style={{
                                    alignSelf: 'center',
                                }}
                                color={colors.primary.main}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate('MyAccount', {
                                screen: 'index',
                            })
                        }
                    >
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                padding: 10,
                                borderColor: '#d3d3d3',
                                borderLeftWidth: 1,
                                paddingBottom: 12,
                                // backgroundColor: 'white',
                            }}
                        >
                            <View
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingRight: 5,
                                }}
                            >
                                <Text
                                    style={{
                                        color: 'white',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    12
                                </Text>
                                <Text style={{ color: 'white', fontSize: 10 }}>
                                    Pending
                                </Text>
                            </View>

                            <Icon
                                name="angle-down"
                                size={12}
                                style={{
                                    alignSelf: 'center',
                                }}
                                color={colors.primary.main}
                            />
                        </View>
                    </TouchableOpacity>
                </View>

                <View
                    style={{
                        backgroundColor: 'white',
                        paddingVertical: 11,
                        paddingHorizontal: 14,
                    }}
                >
                    <TouchableOpacity>
                        <Text
                            style={{
                                fontSize: fonts.MEDIUM,
                                textAlign: 'center',
                            }}
                        >
                            2
                        </Text>
                        <Text
                            style={{
                                fontSize: fonts.SMALL,
                                textAlign: 'center',
                            }}
                        >
                            Betslip
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Login visible={modalVisible} onClick={setModalVisible} />
            {/* {modalVisible && (
            )} */}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginRight: 0,
    },
    btn: {
        backgroundColor: colors.primary.main,
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 5,
    },
});

export default HeaderRight2;
