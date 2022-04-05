import React, { useState, useCallback, useEffect } from 'react';
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

const CustomAccordion = (props) => {
    const [expand, setExpand] = useState(false);
    const { left, right, title, children, style, ...rest } = props;

    return (
        <View>
            <TouchableOpacity
                style={styles.header}
                onPress={() => setExpand(!expand)}
            >
                <View style={{ width: '50%', display: 'flex' }}>
                    <Text>{left}</Text>
                </View>
                <View
                    style={{
                        width: '50%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <Text style={{ fontWeight: 'bold' }}>{title}</Text>

                    <Ionicons
                        name={expand ? 'chevron-up' : 'chevron-down'}
                        size={20}
                    />
                </View>
            </TouchableOpacity>
            <View style={styles.detailPanel}>{expand && children}</View>
        </View>
    );
};

export default CustomAccordion;

const styles = StyleSheet.create({
    container: {},
    detailPanel: {
        borderColor: '#d2d2d2',
        borderBottomWidth: 1,
    },
    header: {
        margin: 0,
        width: 'auto',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // backgroundColor: 'orange',
        paddingVertical: 10,
    },
    linearGroup: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
