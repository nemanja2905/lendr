import React, { useState, useCallback, useEffect } from 'react';
import {
    View,
    Text,
    Modal,
    Button,
    StyleSheet,
    Linking,
    LogBox,
    StatusBar,
    ScrollView,
} from 'react-native';
import Layout2 from '../../shared/Layout2';
import InputField2 from '../../Input/InputField2';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Picker from '../../Input/Picker';
import { Button4 } from '../../Input/Button';
import { YEARS3, DATES3, MONTHS, Validate4 } from '../../../util/Validators2';

import { Ionicons } from '@expo/vector-icons';
import { colors } from '@Colors';
import { fonts } from '@Fonts';
import { config } from '@Config';
import MyFormHelperText from '../../Input/MyFormHelperText';
const prolog =
    'Enter your email address or mobile number, and your date of birth so we can identify you.';
const ForgotPassword = (props) => {
    // const { navigation } = props;
    const [errors, setErrors] = useState({});
    const [result, setResult] = useState({
        // state: 403,
        // msg: 'Incorrect Email/Mobile Number or DOB.  \n   Try again or contact support below.',
    });
    const [formInput, setFormInput] = useState({
        address: '',
        date: '',
        month: '',
        year: '',
    });
    const handleChange = (value, prop) => {
        setFormInput({
            ...formInput,
            [prop]: value,
        });
    };

    const checkSubmitAvailable = useCallback(
        async (name = '') => {
            //setErrors({});
            let _error = await Validate4(formInput);
            setErrors(_error);
        },
        [formInput]
    );

    const handleSaveAction = () => {
        alert('handle Save Action');
    };

    useEffect(() => {
        const fetcha = () => {
            if (result) {
                setResult(null);
            }
        };

        const tt = setTimeout(fetcha, 3000);
        return () => clearTimeout(tt);
    }, [result]);

    return (
        <Layout2 title="Recover your login details" {...props}>
            <View style={styles.body}>
                <Text style={styles.prolog}>{prolog}</Text>
                <View style={styles.formGroup}>
                    <InputField2
                        name="address"
                        placeholder="Enter here"
                        label="Email / Mobile number"
                        errors={errors.address}
                        value={formInput.address}
                        onChange={(v) => handleChange(v, 'address')}
                        onBlur={() => checkSubmitAvailable('address')}
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text>Date of Birth:</Text>
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Picker
                            key={201}
                            placeholder="DD"
                            items={DATES3}
                            value={formInput.date}
                            style={{ width: '30%' }}
                            onChange={(date) => {
                                handleChange(date, 'date');
                                checkSubmitAvailable();
                            }}
                        />
                        <Picker
                            key={202}
                            placeholder="MM"
                            items={MONTHS}
                            value={formInput.month}
                            style={{ width: '30%', marginHorizontal: 'auto' }}
                            onChange={(month) => {
                                handleChange(month, 'month');
                                checkSubmitAvailable();
                            }}
                        />
                        <Picker
                            key={203}
                            placeholder="yyyy"
                            items={YEARS3}
                            value={formInput.year}
                            style={{ width: '30%' }}
                            onChange={(year) => {
                                handleChange(year, 'year');
                                checkSubmitAvailable();
                            }}
                        />
                    </View>

                    <View style={{ marginVertical: 24 }} key={4}>
                        <Button4
                            label="Search"
                            color={colors.success.main}
                            width="100%"
                            disabled={errors.date || errors.address}
                            textColor="white"
                            onClick={handleSaveAction}
                        />
                    </View>
                    <MyFormHelperText type={1}>{result}</MyFormHelperText>
                    <View style={styles.bottom}>
                        <Text>Need more help?</Text>
                        <TouchableOpacity
                            style={{}}
                            onPress={() => alert('Contact')}
                        >
                            <Text
                                style={{
                                    textDecorationLine: 'underline',
                                    paddingTop: 10,
                                }}
                            >
                                Contact customer support here
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Layout2>
    );
};

const styles = StyleSheet.create({
    formGroup: {
        marginBottom: 15,
    },
    body: {
        padding: 20,
    },
    inputContainer: {},
    text: {},
    prolog: {},
    bottom: {
        marginVertical: 15,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        paddingTop: 15,
        marginTop: 40,
    },
});
export default ForgotPassword;
