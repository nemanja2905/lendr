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
import { STREET_TYPES } from '../../util/Streets';
import { STATES } from '../../util/States';
import { COUNTRIES } from '../../util/Countries';

export default function AddressPanel(props) {
    const {
        value,
        setValue,
        Validate,
        errors,
        handleChange,
        handleBlur,
        ...rest
    } = props;

    return (
        <View
            style={{
                marginTop: 5,
                minWidth: props.width ? props.width : 100,
            }}
        >
            <View style={styles.linearGroup}>
                <InputField
                    key={110}
                    placeholder="Enter apartment no"
                    label="Apartment No"
                    startIcon={null}
                    type="numeric"
                    style={{ width: '30%' }}
                    value={value.aptNo}
                    errors={errors.aptNo}
                    onChange={(val) => handleChange(val, 'aptNo')}
                    onBlur={() => handleBlur('aptNo')}
                />
                <InputField
                    key={111}
                    placeholder="Enter street number"
                    label="Street No"
                    important={true}
                    type="numeric"
                    startIcon={null}
                    style={{ width: '30%' }}
                    value={value.stNo}
                    errors={errors.stNo}
                    onChange={(val) => handleChange(val, 'stNo')}
                    onBlur={() => handleBlur('stNo')}
                />
            </View>
            <View style={styles.linearGroup}>
                <InputField
                    key={112}
                    placeholder="Enter street name"
                    label="Street Name"
                    important={true}
                    startIcon={null}
                    value={value.stName}
                    style={{ width: '60%' }}
                    onChange={(val) => handleChange(val, 'stName')}
                    onBlur={() => handleBlur('stName')}
                />
                <Picker
                    key={120}
                    name="stType"
                    label="Street Type"
                    placeholder="  Street Type"
                    important={true}
                    items={STREET_TYPES}
                    startIcon={null}
                    style={{ width: '35%' }}
                    value={value.stType}
                    onChange={(val) => handleChange(val, 'stType')}
                    onBlur={() => handleBlur('stType')}
                />
            </View>
            <View style={styles.linearGroup}>
                <InputField
                    key={114}
                    placeholder="Enter suburb name"
                    label="Suburb"
                    important={true}
                    startIcon={null}
                    value={value.locality}
                    style={{ width: '100%' }}
                    onChange={(val) => handleChange(val, 'locality')}
                    onBlur={() => handleBlur('locality')}
                />
            </View>
            <View style={styles.linearGroup}>
                <Picker
                    key={121}
                    name="state"
                    label="State"
                    style={{ width: '47.5%' }}
                    placeholder=" Enter state"
                    important={true}
                    items={STATES}
                    startIcon={null}
                    value={value.state}
                    onChange={(val) => handleChange(val, 'state')}
                    onBlur={() => handleBlur('state')}
                />
                <InputField
                    placeholder="Enter postCode "
                    label="postcode"
                    important={true}
                    startIcon={null}
                    type="numeric"
                    value={value.postcode}
                    style={{ width: '47.5%' }}
                    onChange={(val) => handleChange(val, 'postcode')}
                    onBlur={() => handleBlur('postcode')}
                />
            </View>
            <View style={styles.linearGroup}>
                {/** Picker->Select */}
                <Picker
                    key={122}
                    name="county"
                    label="County"
                    placeholder="  Enter country name"
                    important={true}
                    items={COUNTRIES}
                    startIcon={null}
                    style={{ width: '100%' }}
                    value={value.country}
                    onChange={(val) => handleChange(val, 'country')}
                    onBlur={() => handleBlur('country')}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    linearGroup: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
});
