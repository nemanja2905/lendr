import { useState } from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
} from 'react-native';

import Personal from './components/Personal';
import LoginDetails from './components/LoginDetails';
import Support from './components/Support';

import { colors } from '@Colors';
import { fonts } from '@Fonts';

// validation functions
import { Validation } from '@util/Validators';

function Join() {
    const [errors, setErrors] = useState(errorsInit);
    const [formState, setFormState] = useState(valuesInit);

    async function fieldValidation(field) {
        switch (field) {
            case 'firstname': {
                let fNameErrors = Validation.name(
                    formState.firstname,
                    'firstname'
                );
                setErrors({ ...errors, [field]: fNameErrors });
                break;
            }
            case 'surname': {
                let sNameErrors = Validation.name(formState.surname, 'surname');
                setErrors({ ...errors, [field]: sNameErrors });
                break;
            }
            case 'dateDOB': {
                let dateErrors = Validation.dateDOB(formState.dateDOB);
                setErrors({ ...errors, dateDOB: dateErrors });
                break;
            }
            case 'monthDOB': {
                let monthErrors = Validation.monthDOB(formState.monthDOB);
                setErrors({ ...errors, monthDOB: monthErrors });
                break;
            }
            case 'yearDOB': {
                let yearErrors = Validation.yearDOB(formState.yearDOB);
                // let d = Validation.dateComb(
                //     formState.dateDOB,
                //     formState.monthDOB,
                //     formState.yearDOB
                // );
                setErrors({ ...errors, yearDOB: yearErrors });
                break;
            }
            case 'email': {
                let emailErrors = await Validation.email(formState.email);
                setErrors({ ...errors, [field]: emailErrors });
                break;
            }

            case 'mobile': {
                let mobileErrors = await Validation.mobile(
                    formState.mobile,
                    formState.country,
                    formState.state
                );
                setErrors({ ...errors, [field]: mobileErrors });
                break;
            }

            case 'stNo': {
                let stNoErrors = Validation.stNo(formState.stNo);
                setErrors({ ...errors, [field]: stNoErrors });
                break;
            }

            case 'stName': {
                let stNameErrors = Validation.stName(formState.stName);
                setErrors({ ...errors, [field]: stNameErrors });
                break;
            }

            case 'locality': {
                let localityErrors = Validation.locality(formState.locality);
                setErrors({ ...errors, [field]: localityErrors });
                break;
            }

            case 'postCode': {
                let postCodeErrors = Validation.postCode(formState.postCode);
                setErrors({ ...errors, [field]: postCodeErrors });
                break;
            }

            case 'password': {
                let passwordErrors = Validation.password(formState.password);
                setErrors({ ...errors, [field]: passwordErrors });
                break;
            }

            case 'loginID': {
                let loginIDErrors = await Validation.loginID(formState.loginID);
                setErrors({ ...errors, [field]: loginIDErrors });
                break;
            }

            case 'depositLimit': {
                break;
            }

            case 'state': {
                break;
            }

            case 'stType': {
                break;
            }

            case 'country': {
                break;
            }

            case 'depositAmount': {
                let dAmountErrors = Validation.dAmount(formState.depositAmount);
                setErrors({ ...errors, [field]: dAmountErrors });
                break;
            }

            // this validation has been moved to individual onChange function
            case 'depositPeriod': {
                let dPeriodErrors = Validation.dPeriod(value);
                setErrors({ ...errors, depositPeriod: dPeriodErrors });
                break;
            }

            default: {
                break;
            }
        }
    }

    async function submitForm() {
        // As error state update will not give updated state,
        // this is an intermediary object to save state for use in form submission
        let submitValidation = {};
        submitValidation.fNameErrors = Validation.name(
            formState.firstname,
            'firstname'
        );
        submitValidation.sNameErrors = Validation.name(
            formState.surname,
            'surname'
        );
        submitValidation.dateErrors = Validation.dateDOB(formState.dateDOB);
        submitValidation.monthErrors = Validation.monthDOB(formState.monthDOB);
        submitValidation.yearErrors = Validation.yearDOB(formState.yearDOB);
        submitValidation.emailErrors = await Validation.email(formState.email);
        submitValidation.mobileErrors = await Validation.mobile(
            formState.mobile,
            formState.country,
            formState.state
        );
        submitValidation.stNoErrors = Validation.stNo(formState.stNo);
        submitValidation.stNameErrors = Validation.stName(formState.stName);
        submitValidation.localityErrors = Validation.locality(
            formState.locality
        );
        submitValidation.postCodeErrors = Validation.postCode(
            formState.postCode
        );
        submitValidation.loginIDErrors = await Validation.loginID(
            formState.loginID
        );
        submitValidation.passwrodErrors = Validation.password(
            formState.password
        );

        submitValidation.depositLimitErrors = Validation.dLimit(
            formState.depositLimit
        );
        submitValidation.depositAmountErrors = Validation.dAmount(
            formState.depositAmount
        );
        submitValidation.depositPeriodErrors = Validation.dPeriod(
            formState.depositPeriod
        );

        submitValidation.stateErrors = Validation.state(formState.state);
        submitValidation.stTypeErrors = Validation.stType(formState.stType);
        submitValidation.countryErrors = Validation.country(formState.country);

        console.log(submitValidation);
        setErrors({
            ...errors,
            firstname: submitValidation.fNameErrors,
            surname: submitValidation.sNameErrors,
            dateDOB: submitValidation.dateErrors,
            monthDOB: submitValidation.monthErrors,
            yearDOB: submitValidation.yearErrors,
            email: submitValidation.emailErrors,
            mobile: submitValidation.mobileErrors,
            stNo: submitValidation.stNoErrors,
            stName: submitValidation.stNameErrors,
            locality: submitValidation.localityErrors,
            postCode: submitValidation.postCodeErrors,
            loginID: submitValidation.loginIDErrors,
            password: submitValidation.passwrodErrors,
            depositLimit: submitValidation.depositLimitErrors,
            depositAmount: submitValidation.depositAmountErrors,
            depositPeriod: submitValidation.depositPeriodErrors,
            state: submitValidation.stateErrors,
            stType: submitValidation.stTypeErrors,
            country: submitValidation.countryErrors,
        });

        let joinErrors = 0;
        Object.values(submitValidation).forEach((val) => {
            if (val !== '') {
                joinErrors++;
            }
        });

        console.log(joinErrors);
    }

    return (
        <>
            <ScrollView style={styles.body}>
                <StatusBar barStyle="light-content" />
                <View
                    style={{
                        backgroundColor: colors.primary.main,
                        paddingVertical: 5,
                        marginTop: 15,
                        alignItems: 'center',
                    }}
                >
                    <Text style={{ fontWeight: 'bold', fontSize: fonts.LARGE }}>
                        Join EliteBet in under a minute!
                    </Text>
                </View>
                <Personal
                    errors={errors}
                    setErrors={setErrors}
                    formState={formState}
                    setFormState={setFormState}
                    fieldValidation={fieldValidation}
                />
                <LoginDetails
                    errors={errors}
                    setErrors={setErrors}
                    formState={formState}
                    setFormState={setFormState}
                    fieldValidation={fieldValidation}
                    submitForm={submitForm}
                />

                <Support />
            </ScrollView>
        </>
    );
}

let valuesInit = {
    loginID: '',
    password: '',
    firstname: '',
    surname: '',
    dateDOB: '',
    monthDOB: '',
    yearDOB: '',
    email: '',
    mobile: '',
    aptNo: '',
    stNo: '',
    stName: '',
    stType: null,
    state: null,
    postCode: '',
    country: 'AU',
    locality: '',
    qasAddress: '',
    depositLimit: null,
    depositAmount: '10',
    depositPeriod: 0,
    promoCode: '',
    gender: 0,
};

let errorsInit = {
    loginID: '',
    password: '',
    firstname: '',
    surname: '',
    dateDOB: '',
    monthDOB: '',
    yearDOB: '',
    dateCombined: '',
    email: '',
    mobile: '',
    aptNo: '',
    stNo: '',
    stName: '',
    stType: '',
    state: '',
    postCode: '',
    country: '',
    locality: '',
    qasAddress: '',
    depositLimit: '',
    depositAmount: '',
    depositPeriod: '',
    promoCode: '',
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
    },
    container: {},
});

export default Join;
