import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { colors } from '@Colors';
import { fonts } from '@Fonts';
import { config } from '@Config';
import { useState } from 'react';

import InputField from '@components/Input/InputField';

function PromoCode({
    formState,
    setFormState,
    errors,
    setErrors,
    fieldValidation,
}) {
    const [code, showCode] = useState(false);

    const handleChange = async (text, field) => {
        setFormState({ ...formState, [field]: text });
    };

    const handleBlur = (field) => {
        //barbafieldValidation(field);
    };
    return (
        <>
            <View style={styles.containerMain}>
                <View style={styles.container}>
                    <Text style={styles.text}>Have a code? (optional)</Text>
                    <TouchableOpacity onPress={() => showCode(!code)}>
                        <Text
                            style={{
                                ...styles.text,
                                fontWeight: 'bold',
                                textDecorationLine: 'underline',
                            }}
                        >
                            Enter Code
                        </Text>
                    </TouchableOpacity>
                </View>
                {code && (
                    <View style={{ flex: 1 }}>
                        <InputField
                            placeholder="Enter Code"
                            label={null}
                            errors={
                                errors.promoCode == '' ? null : errors.promoCode
                            }
                            startIcon={null}
                            value={formState.promoCode}
                            onChange={(val) => handleChange(val, 'promoCode')}
                            onBlur={() => handleBlur('promoCode')}
                        />
                    </View>
                )}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    containerMain: {
        marginTop: 15,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: colors.grey.dark,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text: {
        fontSize: fonts.REGULAR,
    },
});

export default PromoCode;
