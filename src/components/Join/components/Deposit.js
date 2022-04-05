import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import InputField from '@components/Input/InputField';
import Picker from '@components/Input/Picker';

import { colors } from '@Colors';
import { fonts } from '@Fonts';
import { config } from '@Config';

// validation functions
import { Validation } from '@util/Validators';

const LIMIT_TYPE = [
    { label: 'Daily', value: 1 },
    { label: 'Weekly', value: 7 },
    { label: 'Fortnightly', value: 14 },
    { label: 'Monthly', value: 30 },
];

function Deposit({
    formState,
    setFormState,
    errors,
    setErrors,
    fieldValidation,
}) {
    function showDeposit(val) {
        setFormState({ ...formState, depositLimit: val });
    }

    const handleChange = async (text, field) => {
        setFormState({ ...formState, [field]: text });
    };

    const handleBlur = (field) => {
        fieldValidation(field);
    };

    const blurValidationPicker = (value, field) => {
        // wont work in some cases as the value might not have updated
        // fieldValidation(field)
        let e = Validation.dPeriod(value);
        setErrors({ ...errors, depositPeriod: e });
    };

    return (
        <View style={{ marginTop: 15 }}>
            <Text style={styles.text}>Deposit Limit</Text>
            <View style={styles.container}>
                <TouchableOpacity
                    style={{
                        ...styles.btnContainer,
                        marginRight: 15,
                        backgroundColor:
                            formState.depositLimit == null
                                ? colors.grey.light
                                : formState.depositLimit
                                ? colors.primary.main
                                : colors.grey.light,
                    }}
                    onPress={() => {
                        showDeposit(true);
                        if (errors.depositLimit == '') {
                        } else {
                            setErrors({ ...errors, depositLimit: '' });
                        }
                    }}
                >
                    <Text style={styles.text}>Set Deposit Limit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        ...styles.btnContainer,
                        backgroundColor:
                            formState.depositLimit == null
                                ? colors.grey.light
                                : !formState.depositLimit
                                ? colors.primary.main
                                : colors.grey.light,
                    }}
                    onPress={() => {
                        showDeposit(false);
                        if (errors.depositLimit == '') {
                        } else {
                            setErrors({ ...errors, depositLimit: '' });
                        }
                    }}
                >
                    <Text style={styles.text}>No Deposit Limit</Text>
                </TouchableOpacity>
            </View>

            {formState.depositLimit && (
                <View>
                    <Text
                        style={{
                            fontSize: fonts.REGULAR,
                            fontWeight: 'bold',
                            marginTop: 5,
                        }}
                    >
                        Set the Limit you wish to place on your deposits
                    </Text>
                    <View
                        style={{
                            ...styles.inputContainer,
                            flexDirection: 'row',
                        }}
                    >
                        <View style={{ flex: 1, marginRight: 15 }}>
                            <InputField
                                placeholder="Enter amount"
                                value={formState.depositAmount}
                                label={null}
                                errors={
                                    errors.depositAmount == ''
                                        ? null
                                        : errors.depositAmount
                                }
                                startIcon={'dollar'}
                                type="numeric"
                                onChange={(val) =>
                                    handleChange(val, 'depositAmount')
                                }
                                onBlur={() => handleBlur('depositAmount')}
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Picker
                                key={134}
                                placeholder="Select"
                                label={null}
                                items={LIMIT_TYPE}
                                value={formState.depositPeriod}
                                errors={
                                    errors.depositPeriod == ''
                                        ? null
                                        : errors.depositPeriod
                                }
                                onChange={(val) => {
                                    handleChange(val, 'depositPeriod');
                                    blurValidationPicker(val, 'depositPeriod');
                                }}
                            />
                        </View>
                    </View>
                </View>
            )}

            {errors.depositLimit != '' && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{errors.depositLimit}</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 5,
        paddingVertical: 10,
    },
    text: {
        fontSize: fonts.REGULAR,
    },
    btnContainer: {
        flex: 1,
        backgroundColor: colors.grey.light,
        paddingVertical: 15,
        alignItems: 'center',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.grey.dark,
    },
    inputContainer: { marginTop: 5 },
    errorContainer: {
        marginTop: 10,
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 3,
        backgroundColor: colors.error.light,
    },
    errorText: {
        color: colors.error.main,
        fontSize: fonts.REGULAR,
    },
});

export default Deposit;
