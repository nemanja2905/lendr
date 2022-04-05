import {
    View,
    StyleSheet,
    Text,
    TextInput,
    Platform,
    Switch,
} from 'react-native';

// Constant imports
import { colors } from '@Colors';
import { fonts } from '@Fonts';
import { config } from '@Config';
import { COUNTRIES } from '@util/Countries';
import { GENDER } from '@util/Gender';

import { useState } from 'react';

// validation functions for email validation
import { Validation } from '@util/Validators';

// compoentns
import InputField from '@components/Input/InputField';
import Address from './Address';
import PromoCode from './PromoCode';
import Deposit from './Deposit';
import Picker from '@components/Input/Picker';

function Personal({
    formState,
    setFormState,
    errors,
    setErrors,
    fieldValidation,
}) {
    const [manualAddress, setManualAddress] = useState(true);

    // switch to toggle on an off for QAS Address
    const toggleSwitch = () =>
        setManualAddress((previousState) => !previousState);

    // handles change for all the form fields
    const handleChange = async (text, field) => {
        setFormState({ ...formState, [field]: text });
    };

    // error management happens on blur
    const handleBlur = (field) => {
        fieldValidation(field);
    };

    const handleBlurEmail = async (val) => {
        if (!formState.loginID || formState.loginID == '') {
            let loginIDErrors = '';
            let emailErrors = await Validation.email(formState.email);
            if (emailErrors == '') {
                setFormState({ ...formState, loginID: formState.email });
                loginIDErrors = await Validation.loginID(formState.email);

                // Future update: Set login id only if the id is valid
                setErrors({
                    ...errors,
                    email: emailErrors,
                    loginID: loginIDErrors,
                });
            } else {
                setErrors({ ...errors, email: emailErrors });
            }
        } else {
            handleBlur('email');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Your Information</Text>
            <View style={{ ...styles.inputContainer, flexDirection: 'row' }}>
                <View style={{ flex: 1, marginRight: 15 }}>
                    <Picker
                        key={135}
                        placeholder="Select"
                        label="Title *"
                        items={GENDER}
                        value={formState.gender}
                        errors={errors.gender == '' ? null : errors.gender}
                        onChange={(val) => {
                            handleChange(val, 'gender');
                            //let genderErrors = Validation.gender(val);
                            //setErrors({ ...errors, country: genderErrors });
                        }}
                    />
                </View>
                <View style={{ flex: 2 }}>
                    <InputField
                        placeholder="As it appears on your ID"
                        label="First name *"
                        errors={
                            errors.firstname == '' ? null : errors.firstname
                        }
                        startIcon={null}
                        value={formState.firstname}
                        onChange={(val) => handleChange(val, 'firstname')}
                        onBlur={() => handleBlur('firstname')}
                    />
                </View>
            </View>
            <View style={styles.inputContainer}>
                <InputField
                    placeholder="As it appears on your ID"
                    label="Last name *"
                    errors={errors.surname == '' ? null : errors.surname}
                    startIcon={null}
                    value={formState.surname}
                    onChange={(val) => handleChange(val, 'surname')}
                    onBlur={() => handleBlur('surname')}
                />
            </View>

            <View
                style={{
                    ...styles.inputContainer,
                    flexDirection: 'row',
                }}
            >
                <View style={{ flex: 1, marginEnd: 15 }}>
                    <InputField
                        placeholder="DD"
                        label="Date of birth *"
                        errors={errors.dateDOB == '' ? null : errors.dateDOB}
                        startIcon={null}
                        type="numeric"
                        value={formState.dateDOB}
                        onChange={(val) => handleChange(val, 'dateDOB')}
                        onBlur={() => handleBlur('dateDOB')}
                    />
                </View>
                <View style={{ flex: 1, marginEnd: 15 }}>
                    <InputField
                        placeholder="MM"
                        label=" "
                        errors={errors.monthDOB == '' ? null : errors.monthDOB}
                        startIcon={null}
                        type="numeric"
                        value={formState.monthDOB}
                        onChange={(val) => handleChange(val, 'monthDOB')}
                        onBlur={() => handleBlur('monthDOB')}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <InputField
                        placeholder="YYYY"
                        label=" "
                        errors={errors.yearDOB == '' ? null : errors.yearDOB}
                        startIcon={null}
                        type="numeric"
                        value={formState.yearDOB}
                        onChange={(val) => handleChange(val, 'yearDOB')}
                        onBlur={() => handleBlur('yearDOB')}
                    />
                </View>
            </View>
            {errors.dateDOB == '' &&
                errors.monthDOB == '' &&
                errors.yearDOB == '' &&
                errors.dateCombined !== '' && (
                    <View
                        style={{
                            ...styles.inputContainer,
                            backgroundColor: colors.error.light,
                            paddingVertical: 8,
                            paddingHorizontal: 15,
                            borderRadius: 3,
                        }}
                    >
                        <Text style={{ color: colors.error.main }}>
                            Date of brith errors will go here
                        </Text>
                    </View>
                )}

            <View style={styles.inputContainer}>
                <InputField
                    placeholder="Enter your email address"
                    label="Email *"
                    errors={errors.email == '' ? null : errors.email}
                    startIcon={'mail'}
                    value={formState.email}
                    onChange={(val) => handleChange(val, 'email')}
                    onBlur={(val) => handleBlurEmail(val)}
                />
            </View>

            <View style={styles.inputContainer}>
                <InputField
                    placeholder="Enter your mobile number"
                    label="Mobile *"
                    errors={errors.mobile == '' ? null : errors.mobile}
                    startIcon={'call'}
                    type="numeric"
                    value={formState.mobile}
                    onChange={(val) => handleChange(val, 'mobile')}
                    onBlur={() => handleBlur('mobile')}
                />
            </View>

            {manualAddress && (
                <Address
                    errors={errors}
                    setErrors={setErrors}
                    formState={formState}
                    setFormState={setFormState}
                    fieldValidation={fieldValidation}
                />
            )}
            <View style={styles.inputContainer}>
                <Picker
                    key={136}
                    placeholder="Select"
                    label="Country *"
                    items={COUNTRIES}
                    value={formState.country}
                    errors={errors.country == '' ? null : errors.country}
                    onChange={(val) => {
                        handleChange(val, 'country');

                        let countryErrors = Validation.country(val);
                        setErrors({ ...errors, country: countryErrors });
                        // blurValidationPicker(val, 'stType');
                    }}
                />

                {!manualAddress && (
                    <View style={styles.inputContainer}>
                        <InputField
                            placeholder="Address"
                            label="Address (as it appears on your ID) *"
                            errors={null}
                            startIcon={null}
                        />
                    </View>
                )}
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end',
                        marginTop: Platform.OS == 'ios' ? 5 : 0,
                    }}
                >
                    <Text
                        style={{
                            alignSelf: 'center',
                            fontSize: fonts.REGULAR,
                        }}
                    >
                        Enter Address Manually
                    </Text>
                    <Switch
                        trackColor={{
                            true: colors.primary.main,
                            false: colors.grey.light,
                        }}
                        // thumbColor={manualAddress ? '#fff' : '#f4f3f4'}
                        style={{
                            transform: [
                                {
                                    scaleX: Platform.OS == 'ios' ? 0.7 : 1,
                                },
                                {
                                    scaleY: Platform.OS == 'ios' ? 0.7 : 1,
                                },
                            ],
                        }}
                        ios_backgroundColor={colors.grey.light}
                        onValueChange={toggleSwitch}
                        value={manualAddress}
                    />
                </View>
            </View>

            <PromoCode
                errors={errors}
                setErrors={setErrors}
                formState={formState}
                setFormState={setFormState}
                fieldValidation={fieldValidation}
            />
            <Deposit
                errors={errors}
                setErrors={setErrors}
                formState={formState}
                setFormState={setFormState}
                fieldValidation={fieldValidation}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white.main,
        marginHorizontal: config.margin.body,
        borderRadius: 3,
        padding: 15,
        marginTop: config.margin.body,
    },
    header: {
        fontWeight: 'bold',
        fontSize: fonts.LARGE,
    },

    inputContainer: { marginTop: 10 },
});

export default Personal;
