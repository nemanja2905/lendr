import { View, StyleSheet, Text } from 'react-native';

import InputField from '@components/Input/InputField';
import Picker from '@components/Input/Picker';

import { STREET_TYPES } from '@util/Streets';
import { STATES } from '@util/States';

// validation functions
import { Validation } from '@util/Validators';

function Address({
    formState,
    setFormState,
    errors,
    setErrors,
    fieldValidation,
}) {
    // handles change for all the form fields
    const handleChange = async (text, field) => {
        setFormState({ ...formState, [field]: text });
    };

    // error management happens on blur
    const handleBlur = (field) => {
        fieldValidation(field);
    };

    return (
        <>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ ...styles.inputContainer, marginRight: 10 }}>
                    <InputField
                        placeholder="Enter appartment no"
                        label="Appartment No"
                        errors={null}
                        startIcon={null}
                        value={formState.aptNo}
                        onChange={(val) => handleChange(val, 'aptNo')}
                        onBlur={() => handleBlur('aptNo')}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <InputField
                        placeholder="Enter street no"
                        label="Street No *"
                        errors={errors.stNo == '' ? null : errors.stNo}
                        startIcon={null}
                        value={formState.stNo}
                        onChange={(val) => handleChange(val, 'stNo')}
                        onBlur={() => handleBlur('stNo')}
                    />
                </View>
            </View>

            <View style={{ flexDirection: 'row' }}>
                <View
                    style={{
                        ...styles.inputContainer,
                        marginRight: 10,
                        flex: 2,
                    }}
                >
                    <InputField
                        placeholder="Enter street name"
                        label="Street Name *"
                        errors={errors.stName == '' ? null : errors.stName}
                        startIcon={null}
                        value={formState.stName}
                        onChange={(val) => handleChange(val, 'stName')}
                        onBlur={() => handleBlur('stName')}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Picker
                        key={131}
                        placeholder="Select"
                        label="Street Type *"
                        items={STREET_TYPES}
                        value={formState.stType}
                        errors={errors.stType == '' ? null : errors.stType}
                        onChange={(val) => {
                            handleChange(val, 'stType');

                            let stTypeErrors = Validation.stType(val);
                            setErrors({ ...errors, stType: stTypeErrors });
                            // blurValidationPicker(val, 'stType');
                        }}
                    />
                </View>
            </View>

            <View style={styles.inputContainer}>
                <InputField
                    placeholder="Enter suburb name"
                    label="Suburb *"
                    errors={errors.locality == '' ? null : errors.locality}
                    startIcon={null}
                    value={formState.locality}
                    onChange={(val) => handleChange(val, 'locality')}
                    onBlur={() => handleBlur('locality')}
                />
            </View>

            <View style={{ flexDirection: 'row' }}>
                <View style={{ ...styles.inputContainer, marginRight: 10 }}>
                    <Picker
                        key={132}
                        placeholder="Select"
                        label="State *"
                        items={STATES}
                        value={formState.state}
                        errors={errors.state == '' ? null : errors.state}
                        onChange={(val) => {
                            handleChange(val, 'state');
                            let stateErrors = Validation.state(val);
                            setErrors({ ...errors, state: stateErrors });
                        }}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <InputField
                        placeholder="Enter postcode"
                        label="Postcode *"
                        errors={errors.postCode == '' ? null : errors.postCode}
                        startIcon={null}
                        value={formState.postCode}
                        onChange={(val) => handleChange(val, 'postCode')}
                        onBlur={() => handleBlur('postCode')}
                    />
                </View>
            </View>
        </>
    );
}
const styles = StyleSheet.create({
    inputContainer: { marginTop: 10, flex: 1 },
});

export default Address;
