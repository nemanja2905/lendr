import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Modal,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    Switch,
    Alert,
    Platform,
} from 'react-native';

// Checkbox import
import BouncyCheckbox from 'react-native-bouncy-checkbox';

import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Ionicons } from '@expo/vector-icons';
import { colors } from '@Colors';
import { fonts } from '@Fonts';
import { config } from '@Config';
import Header from '../shared/Header';

function MyAccount(props) {
    let value = {};

    return (
        <View>
            <View></View>
        </View>
    );
}

//keyboardType="numeric"
const styles = StyleSheet.create({});

export default MyAccount;
