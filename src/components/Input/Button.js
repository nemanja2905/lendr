import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Badge } from 'react-native-elements';
import React, { useState } from 'react';

// Constant imports
import { colors } from '@Colors';
import { fonts } from '@Fonts';
import { config } from '@Config';

import InputField from '@components/Input/InputField';

import { Ionicons } from '@expo/vector-icons';

export function Button4(props) {
    if (props.disabled) {
        return (
            <View
                style={{
                    ...props.style,
                    width: props.width ? props.width : 'auto',
                    backgroundColor: '#e2e2e2',

                    paddingVertical: 8,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                    // borderBottomWidth: 1,

                    // borderColor: 'rgba(0,0,0,0.3)',
                    elevation: 2,
                    shadowColor: 'black',
                    borderRadius: 6,
                }}
            >
                <Text
                    style={{
                        // fontSize: fonts.REGULAR,
                        color: colors.grey.main,
                        // fontWeight: 'bold',
                    }}
                >
                    {props.label}
                </Text>
            </View>
        );
    }
    return (
        <TouchableOpacity
            style={{
                ...props.style,
                width: props.width ? props.width : 'auto',
                backgroundColor: props.isSelected
                    ? colors.primary.main
                    : props.color
                    ? props.color
                    : '#d2d2d2',
                paddingVertical: 8,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
                // borderBottomWidth: 1,

                // borderColor: 'rgba(0,0,0,0.3)',
                elevation: 3,
                shadowColor: 'black',
                borderRadius: 6,
            }}
            onPress={props.onClick ? props.onClick : () => {}}
        >
            <Text
                style={{
                    // fontSize: fonts.REGULAR,
                    // fontWeight: 'bold',
                    color: props.textColor ? props.textColor : 'black',
                }}
            >
                {props.label}
            </Text>
        </TouchableOpacity>
    );
}
export function Button3(props) {
    return (
        <TouchableOpacity
            style={{
                width: 'auto',
                // minWidth: 100,
                height: 32,
                marginHorizontal: 5,
                paddingHorizontal: props.isBadged ? 30 : 20,

                borderRadius: 16,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',

                backgroundColor: props.isSelected
                    ? colors.primary.main
                    : '#d2d2d2',
            }}
            onPress={props.onClick}
        >
            <Text style={{ fontSize: fonts.REGULAR }}>{props.label}</Text>
            {props.isBadged && (
                <Badge
                    status="success"
                    containerStyle={{
                        position: 'absolute',
                        right: 6,
                        // backgroundColor: 'black',
                        // color: 'white',
                    }}
                    badgeStyle={{ backgroundColor: 'black', color: 'white' }}
                    // textStyle={{ color: 'white' }}

                    textColor="white"
                    value={
                        <Ionicons
                            color="white"
                            name="checkmark-outline"
                            size={12}
                        />
                    }
                />
            )}
        </TouchableOpacity>
    );
}
export function Button2(props) {
    if (props.type === 'icon') {
        return (
            <TouchableOpacity
                style={{
                    // flex: 1,
                    // display: 'flex',
                    // justifyContent: 'center',
                    // alignItems: 'center',
                    alignSelf: 'center',
                    minWidth: 30,
                    // backgroundColor: 'red',
                    // backgroundColor: 'grey',
                    // width: 40,

                    // marginHorizontal: 5,
                }}
                onPress={props.disabled ? void 0 : props.onClick}
            >
                {props.endIcon ? (
                    <Ionicons
                        name={props.endIcon}
                        size={config.icon.size}
                        color={props.color ? props.color : colors.error.main}
                        style={{
                            // marginHorizontal: 5,
                            alignSelf: 'center',
                        }}
                    />
                ) : (
                    void 0
                )}
            </TouchableOpacity>
        );
    }
    if (props.type === 'loto') {
        const color = props.selected ? colors.yellow.main : 'transparent';
        const textColor = props.selected ? 'black' : colors.grey.main;
        return (
            <View
                style={
                    props.style
                        ? {
                              marginTop: 5,
                              marginHorizontal: 10,
                              ...props.style,
                          }
                        : {
                              marginTop: 5,
                              marginHorizontal: 10,
                              // backgroundColor: 'green',
                              minWidth: props.width ? props.width : 100,
                          }
                }
            >
                <View
                    style={{
                        ...styles.lotoContainer,
                        backgroundColor: color,
                        borderColor: '#d2d2d2',
                        borderWidth: props.selected ? 0 : 1,
                    }}
                >
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingHorizontal: 10,
                        }}
                        onPress={props.onClick}
                    >
                        {props.value && (
                            <Text
                                style={{
                                    // flex: 1,
                                    color: textColor ? textColor : 'black',
                                    fontWeight: 'bold',
                                    fontSize: fonts.REGULAR + 1,
                                }}
                            >
                                {props.value}
                            </Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    return (
        <View
            style={
                props.style
                    ? {
                          marginTop: 5,
                          marginHorizontal: 5,
                          ...props.style,
                      }
                    : {
                          marginTop: 5,
                          marginHorizontal: 5,
                          // backgroundColor: 'green',
                          minWidth: props.width ? props.width : 100,
                      }
            }
        >
            <View
                style={
                    props.disabled
                        ? styles.disabledContainer
                        : {
                              ...styles.inputContainer,
                              backgroundColor: props.color,
                          }
                }
            >
                <TouchableOpacity
                    style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: 10,
                    }}
                    onPress={props.disabled ? void 0 : props.onClick}
                >
                    {props.value && (
                        <Text
                            style={{
                                // flex: 1,
                                color: props.disabled
                                    ? 'black'
                                    : props.textColor
                                    ? props.textColor
                                    : 'white',
                                fontWeight: 'bold',
                                fontSize: fonts.REGULAR + 1,
                            }}
                        >
                            {props.value}
                        </Text>
                    )}
                    {props.endIcon && (
                        <Ionicons
                            name={props.endIcon}
                            size={config.icon.size}
                            color="white"
                            style={{
                                // marginHorizontal: 5,
                                alignSelf: 'center',
                            }}
                        />
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
}
export default function Button(props) {
    return (
        <View
            style={{
                minWidth: props.width ? props.width : 100,
            }}
        >
            <View
                style={
                    props.disabled
                        ? {
                              ...styles.disabledContainer,
                              //   backgroundColor: props.color,
                          }
                        : {
                              ...styles.inputContainer,
                              //   backgroundColor: props.color,
                          }
                }
            >
                <TouchableOpacity
                    style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        // backgroundColor: 'blue',
                        // paddingHorizontal: 10,
                    }}
                    onPress={props.disabled ? void 0 : props.onClick}
                >
                    {props.value && (
                        <Text
                            style={{
                                // flex: 1,
                                color: props.disabled ? 'black' : 'white',
                                fontWeight: 'bold',
                                fontSize: fonts.REGULAR + 2,
                            }}
                        >
                            {props.value}
                        </Text>
                    )}
                    {props.endIcon && (
                        <Ionicons
                            name={props.endIcon}
                            size={config.icon.size}
                            color="white"
                            style={{
                                // marginHorizontal: 5,
                                alignSelf: 'center',
                            }}
                        />
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    disabledContainer: {
        borderRadius: 8,
        marginTop: 5,
        backgroundColor: '#dedede',
        paddingVertical: Platform.OS == 'ios' ? 8 : 3,
        // paddingVertical: 10,
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.3)',
    },
    inputContainer: {
        borderRadius: 8,
        marginTop: 5,
        backgroundColor: colors.success.main,
        color: 'white',
        paddingVertical: Platform.OS == 'ios' ? 8 : 3,
        // paddingVertical: 10,
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.5)',
        // boxShadow: '1px 1px 0px rgba(0,0,0,0.3)',
    },

    lotoContainer: {
        borderRadius: 8,
        marginTop: 5,
        backgroundColor: colors.success.main,
        color: 'white',
        paddingVertical: Platform.OS == 'ios' ? 8 : 3,
        // paddingVertical: 10,
        height: 36,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.5)',
        // boxShadow: '1px 1px 0px rgba(0,0,0,0.3)',
    },
});
