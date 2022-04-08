import React, { useCallback, useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    Platform,
    Pressable,
    TouchableOpacity,
} from 'react-native';
import { colors } from '@Colors';
import { Ionicons } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import { fonts } from 'react-native-elements/dist/config';

export const ModalLayout = (props) => {
    const { isModalVisible, toggleModal, position, children } = props;
    return (
        <Modal
            isVisible={isModalVisible}
            customBackdrop={
                <TouchableOpacity
                    style={{
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        margin: 0,
                        marginTop: 55,

                        height: '100%',
                    }}
                    onPress={toggleModal}
                ></TouchableOpacity>
            }
            onBackdropPress={toggleModal}
            style={{
                margin: 0,
            }}
        >
            <View
                style={
                    position === 'bottom'
                        ? {
                              position: 'absolute',
                              bottom: 0,
                              marginHorizontal: 0,

                              width: '100%',
                              height: 'auto',
                              backgroundColor: 'white',
                          }
                        : {
                              position: 'absolute',
                              top: 55,
                              marginHorizontal: 0,

                              width: '100%',
                              height: '30%',
                              backgroundColor: 'white',
                          }
                }
            >
                {children}
            </View>
        </Modal>
    );
};
export const DefaultModal = (props) => {
    const { children } = props;
    const { opened = false, onClose = () => {} } = modalInfo;
    return (
        <ModalLayout isModalVisible={opened} onClose={onClose} position="top">
            <View>{children}</View>
        </ModalLayout>
    );
};
export const ConfirmModal = (props) => {
    const { modalInfo, setModalInfo } = props;
    const {
        opened = false,
        title,
        message,
        message2 = undefined,
        handleClick,
    } = modalInfo;
    return (
        <ModalLayout
            isModalVisible={opened}
            toggleModal={() => setModalInfo({ ...modalInfo, opened: !opened })}
            position="bottom"
        >
            {/* <Text>ABC</Text> */}
            <View>
                <View style={styles.modalHeader}>
                    <Text style={{ ...styles.text, color: 'white' }}>
                        {title}
                    </Text>
                    <TouchableOpacity
                        onPress={() =>
                            setModalInfo({ ...modalInfo, opened: !opened })
                        }
                    >
                        <Ionicons name="close" size={20} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={styles.modalContent}>
                    <Text style={styles.bodyText}>{message}</Text>
                    {message2 && (
                        <Text
                            style={{
                                ...styles.bodyText,
                                color: colors.error.main,
                            }}
                        >
                            {message2}
                        </Text>
                    )}
                </View>
                <View>
                    <Pressable
                        style={styles.button}
                        onPress={() => {
                            setModalInfo({ ...modalInfo, opened: !opened });
                            handleClick();
                        }}
                    >
                        <Text style={styles.buttonText}>Confirm</Text>
                    </Pressable>
                </View>
            </View>
        </ModalLayout>
    );
};

const styles = StyleSheet.create({
    modalHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'black',
        color: 'white',
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    text: {
        fontSize: fonts.REGULAR,
    },
    bodyText: {
        paddingHorizontal: 12,
        paddingVertical: 16,
    },
    buttonText: {
        fontSize: fonts.REGULAR,
        color: 'white',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        // paddingHorizontal: 32,
        borderRadius: 4,
        marginHorizontal: 12,
        elevation: 5,
        backgroundColor: colors.success.main,
        color: 'white',
        shadowColor: 'black',
        marginVertical: 16,
        // shadowOpacity: 0.3,
        // shadowRadius: 3,
        // shadowOffset: 1,
    },
    modalContent: {
        // backgroundColor: '#f2f2f2',
        paddingHorizontal: 12,
    },
});
