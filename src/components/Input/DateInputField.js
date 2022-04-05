import {
    View,
    StyleSheet,
    Text,
    TextInput,
    Platform,
    TouchableOpacity,
} from 'react-native';
import { useState, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
// Constant imports
import { colors } from '@Colors';
import { fonts } from '@Fonts';
import { config } from '@Config';
import InputField from './InputField';

const convertFrom = (value) => {
    if (value === undefined) value = '03-03-2022';
    let buff = value.split('-');
    //assume dd-mm-yy
    return {
        year: buff[2],
        month: buff[1],
        days: buff[0],
    };
};
const convertTo = (date) => {
    return date.days + '-' + date.month + '-' + date.years;
};
export default function DateInputField(props) {
    const { label, value, onChange, onBlur } = props;
    const { year, month, days } = convertFrom(value);
    const [formInput, setFormInput] = useState({
        year: year || '2022',
        month: month || '04',
        days: days || '03',
    });
    const handleChange = (value, field) => {
        setFormInput({
            ...formInput,
            [field]: value,
        });
    };
    const handleBlur = () => {
        onChange(convertTo(formInput));
        onBlur();
    };

    return (
        <View style={{ marginTop: 5 }}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                }}
            >
                <View style={{ width: '30%' }} key={1}>
                    <InputField
                        placeholder="DD"
                        disabled
                        endIcon={
                            Platform.OS === 'android'
                                ? 'chevron-down-outline'
                                : 'arrow-down'
                        }
                        value={formInput.days}
                        type="numeric"
                        onChange={(val) => handleChange(val, 'DD')}
                        onBlur={() => handleBlur('DD')}
                    />
                </View>
                <View style={{ width: '30%' }} key={2}>
                    <InputField
                        placeholder="MM"
                        disabled
                        endIcon={
                            Platform.OS === 'android'
                                ? 'chevron-down-outline'
                                : 'arrow-down'
                        }
                        type="numeric"
                        value={formInput.month}
                        onChange={(val) => handleChange(val, 'MM')}
                        onBlur={() => handleBlur('MM')}
                    />
                </View>
                <View style={{ width: '35%' }} key={3}>
                    <InputField
                        placeholder="YYYY"
                        disabled
                        endIcon={
                            Platform.OS === 'android'
                                ? 'chevron-down-outline'
                                : 'arrow-down'
                        }
                        type="numeric"
                        value={formInput.year}
                        onChange={(val) => handleChange(val, 'year')}
                        onBlur={() => handleBlur('year')}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    label: {
        fontSize: fonts.MEDIUM,
    },
});
