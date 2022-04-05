import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    Platform,
    TouchableOpacity,
} from 'react-native';
import Picker from './Picker';
import InputField from './InputField';
import { useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';

// Constant imports
import { colors } from '@Colors';
import { fonts } from '@Fonts';
import { config } from '@Config';
import { ThemeProvider } from '@react-navigation/native';
import MyFormHelperText from '../Input/MyFormHelperText';
export default function IDVerificationPanel(props) {
    const { isVerified } = props;
    const [result, setResult] = useState(
        isVerified
            ? {
                  status: 200,
                  msg: 'Your identification is verified.',
              }
            : {
                  status: 404,
                  title: 'Your account is not verified.',
                  msg: 'You must complete verification in order to bet.',
              }
    );
    return (
        <View
            style={{
                marginTop: 5,
                minWidth: props.width ? props.width : 100,
            }}
        >
            <View style={styles.formControlGroup}>
                <MyFormHelperText type={1}>{result}</MyFormHelperText>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    linearGroup: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
