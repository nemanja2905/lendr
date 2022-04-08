import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Button from '../Input/Button';
import AccountLayout from './AccountLayout';
import InputField from '@components/Input/InputField';
import InputField2 from '@components/Input/InputField2';
import { VALIDATE } from '../../util/Validators2';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@Colors';
import { fonts } from '@Fonts';
import DateInputField from '../Input/DateInputField';
import { fetchUserDetails, proceedUserUpdateDetails } from '../../util/authAPI';
import CustomSwitch from '../Input/CustomSwitch';
import AddressPanel from '../Input/AddressPanel';
import MyFormHelperText from '../Input/MyFormHelperText';
import { UserContext } from '../../context/user/UserProvider';

const trimAll = (items) => {
    return items.map((item, idx) =>
        item instanceof String ? item.trim() : item
    );
};
export default function AccountMyDetail(props) {
    const { route } = props;
    const { name, path, key, params } = route;
    // const { userInfo } = params;
    const { user } = useContext(UserContext);

    const [result, setResult] = useState({});
    const [errors, setErrors] = useState({});
    const initValue = {
        clientID: 'testclient',
        loginID: 'testclient',
        password: 'asd123',
        firstname: 'faser',
        surname: 'qwerqw',
        dateDOB: 14,
        monthDOB: 2,
        yearDOB: 1987,
        state: 'SA',
        email: 'hamish@generationweb.com.au',
        mobile: '0410522443',
        stNo: '10',
        stName: 'Osbornes',
        stType: 'PDE',
        locality: 'Warilla',
        postcode: '2528',
        country: 'Australia',
        aptNo: '0',
        // STNUMBER: '0',
        STREET: 'STREET',
        maillist: '0',
        address: '',
    };

    const [formInput, setFormInput] = useState(initValue);
    //const [manualAddressing, setManualAddressing] = useState(false);

    const handleChange = (value, namen) => {
        let v =
            value instanceof String
                ? value.trim()
                : value === undefined
                ? ''
                : value;
        setFormInput({
            ...formInput,
            [namen]: v,
        });
    };
    const handleValidate = (namen) => {
        console.log('handleValidate', namen);
        doValidate(formInput);
    };

    const doValidate = async (value2) => {
        const _errors =
            (await VALIDATE(
                value2,
                initValue.loginID,
                setValidID,
                initValue.validEmail,
                setValidEmail,
                initValue.mobile,
                setValidMobile,
                undefined
            )) || {};
        setErrors(_errors);
    };

    useEffect(() => {
        if (user && user.user) {
            loadUserDetails(user.user.CLIENTID);
        }
        // setData(data1);
    }, []);

    const loadUserDetails = async (clientid) => {
        // suppose loginID = testclient
        const data2 = await fetchUserDetails({ clientid });
        console.log('fetchUserDetails called..', {
            ...formInput,
            ...data2.mydetail,
        });
        if (data2 && data2.mydetail)
            setFormInput({ ...formInput, ...data2.mydetail });
    };

    const handleSave = () => {
        doSave(formInput);
    };

    const doSave = useCallback(async (value) => {
        const _result = (await proceedUserUpdateDetails(value)) || {};
        console.log('MyDetailForm doSave= ', _result);
        if (_result) {
            if (_result.error) {
                setResult({ status: 404, msg: _result.desc });
            } else {
                const errorCode = _result.ERROBJ.ERRORCODE;
                if (errorCode == 0)
                    setResult({ status: 200, msg: 'Update successful' });
                else
                    setResult({
                        status: errorCode,
                        msg: _result.ERROBJ.ERRORDESC,
                    });
            }
        } else {
            setResult({ status: 403, msg: 'Network error' });
        }
    });

    const setValidID = (validID) => {};

    const setValidEmail = (validEmail) => {};

    const setValidMobile = (validMobile) => {};

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
        <AccountLayout title="My Details">
            <View style={styles.container}>
                <View>
                    <View style={styles.inputContainer} key={1}>
                        <InputField
                            name="firstName"
                            placeholder="Steve"
                            label="First Name:"
                            endIcon={'lock-closed'}
                            errors={
                                errors.loginID == '' ? null : errors.loginID
                            }
                            disabled
                            value={formInput.firstname}
                            onChange={(v) => handleChange(v, 'firstname')}
                            onBlur={() => handleValidate('firstname')}
                        />
                    </View>
                    <View style={styles.inputContainer} key={2}>
                        <InputField
                            name="loginID"
                            placeholder="Steve"
                            label="Last Name:"
                            endIcon={'lock-closed'}
                            errors={
                                errors.loginID == '' ? null : errors.loginID
                            }
                            disabled
                            value={formInput.surname}
                            onChange={(v) => handleChange(v, 'surname')}
                            onBlur={() => handleValidate('surname')}
                        />
                    </View>
                    <View style={styles.inputContainer} key={3}>
                        <DateInputField
                            label="Birth Date:"
                            errors={
                                errors.birthday == '' ? null : errors.birthday
                            }
                            value={formInput.birthday}
                            onChange={(v) => handleChange(v, 'birthday')}
                            onBlur={() => handleValidate('birthday')}
                        />
                    </View>
                    <View style={styles.inputContainer} key={4}>
                        <InputField2
                            name="email"
                            placeholder="Enter your email address"
                            label="Email"
                            errors={errors.email == '' ? null : errors.email}
                            endIcon={'verify'}
                            value={formInput.email}
                            onChange={(v) => handleChange(v, 'email')}
                            onBlur={() => handleValidate('email')}
                            endAction={() => handleChange('', 'email')}
                        />
                    </View>
                    <View
                        style={
                            !formInput.manualAddressing
                                ? styles.inputContainer
                                : styles.hiddenContainer
                        }
                        key={5}
                    >
                        <InputField2
                            name="address"
                            placeholder="Enter your address"
                            label="Address"
                            errors={
                                errors.address == '' ? null : errors.address
                            }
                            endIcon={'verify'}
                            value={formInput.address}
                            onChange={(v) => handleChange(v, 'address')}
                            onBlur={() => handleValidate('address')}
                            endAction={() => handleChange('', 'address')}
                        />
                    </View>
                    <View
                        style={
                            formInput.manualAddressing
                                ? styles.inputContainer
                                : styles.hiddenContainer
                        }
                        key={7}
                    >
                        <AddressPanel
                            value={formInput}
                            setValue={setFormInput}
                            handleChange={handleChange}
                            handleBlur={handleValidate}
                            errors={errors}
                        />
                    </View>
                    <View style={styles.linearGroup} key={6}>
                        <Text style={{ marginRight: 10 }}>
                            Enter Address Manually
                        </Text>
                        <CustomSwitch
                            value={formInput.manualAddressing || false}
                            onChange={(v) =>
                                handleChange(
                                    !formInput.manualAddressing,
                                    'manualAddressing'
                                )
                            }
                        />
                    </View>

                    <View style={styles.inputContainer} key={8}>
                        <InputField2
                            name="email"
                            placeholder="Enter your phone number"
                            label="Mobile Number"
                            errors={errors.mobile == '' ? null : errors.mobile}
                            endIcon={'mail'}
                            value={formInput.mobile}
                            onChange={(v) => handleChange(v, 'mobile')}
                            onBlur={() => handleValidate('mobile')}
                            endAction={() => handleChange('', 'mobile')}
                        />
                    </View>
                    <View
                        style={{ ...styles.inputContainer, paddingTop: 30 }}
                        key={9}
                    >
                        <Button
                            value="Save"
                            disabled={errors.email || errors.mobile}
                            onClick={handleSave}
                        />
                    </View>
                    <View style={styles.inputContainer} key={10}>
                        <MyFormHelperText>{result}</MyFormHelperText>
                        {/* <MyFormHelperText /> */}
                    </View>
                </View>
            </View>
        </AccountLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        marginBottom: 32,
    },
    header: {
        fontWeight: 'bold',
        fontSize: fonts.LARGE,
    },

    inputContainer: { marginBottom: 10 },
    hiddenContainer: {
        opacity: 0,
        display: 'none',
    },
    linearGroup: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
});
