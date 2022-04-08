import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import AccountLayout from './AccountLayout';

import AvatarIcon from '../../../assets/svg/avatar.svg';
import PasswordField from '../Input/PasswordField';
import MyFormHelperText from '../Input/MyFormHelperText';
import { colors } from '@Colors';
import { fonts } from '@Fonts';
import FormLabel from '../Input/FormLabel';
import Button from '../Input/Button';
import { VALIDATE2, VALIDATE3 } from '../../util/Validators2';
import { useCallback } from 'react';
import FormLink from '../Input/Link';
import { proceedUserChangePass } from '../../util/authAPI';
import { UserContext } from '../../context/user/UserProvider';

export default function AccountChangePassword(props) {
    const { route } = props;
    const { name, path, key, params } = route;
    // const { userInfo } = params; //alternative
    const { user } = useContext(UserContext); //UserContext doesn't work correctly...

    const initValue = {
        clientid: 'testclient',
        loginID: 'testclient',
        password: '',
        newPassword: '',
        confirmNewPassword: '',
    };
    // useEffect(() => {
    //     if (userInfo) {
    //         setFormInput({
    //             ...formInput,
    //             clientid: userInfo.CLIENTID,
    //             loginID: userInfo.CLIENTID,
    //         });
    //     }
    // }, [userInfo]);
    useEffect(() => {
        if (user && user.user) {
            setFormInput({
                ...formInput,
                clientid: user.user.CLIENTID,
                loginID: user.user.CLIENTID,
            });
        }
    }, []);

    const [errors, setErrors] = useState({
        password: null,
        newPassword: null,
        confirmPassword: null,
    });
    const [match, setMatch] = useState({
        passed1: false,
        passed2: false,
        passed3: false,
    });

    // const currentPassword = 'asd123'; //fake, no need to set correctly...
    const [result, setResult] = useState({
        // status: 403,
        // msg: 'Network error',
    });
    const [formInput, setFormInput] = useState(initValue);

    const handleChange = (value, namen) => {
        if (namen === 'newPassword') {
            setMatch(VALIDATE3(value));
        }
        setFormInput({
            ...formInput,
            [namen]: value,
        });
    };

    const handleForgotPassword = () => {
        navigation.navigate('MyAccount', {
            screen: `forgotPassword`,
        });
    };

    const handleValidate = (e) => {
        const _error = VALIDATE2(formInput, initValue.password);
        console.log('ChangePasswordForm Error', _error);
        setErrors({ ..._error });
    };

    const handleSave = () => {
        doSave(formInput);
    };
    //call API to change password
    const doSave = useCallback(async (value2) => {
        const _result = (await proceedUserChangePass(value2)) || {};

        if (_result) {
            if (_result.error) {
                setResult({ status: 404, msg: _result.desc });
            } else {
                const errorCode = _result.ERROBJ.ERRORCODE;
                if (errorCode == 0)
                    setResult({
                        status: 200,
                        msg: 'Your Password has been updated.',
                    });
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

    useEffect(() => {
        const fetcha = () => {
            if (result) {
                setResult(null);
            }
        };

        const tt = setTimeout(fetcha, 5000);
        return () => clearTimeout(tt);
    }, [result]);

    return (
        <AccountLayout title="Change Password">
            <View style={styles.container}>
                <View style={styles.formControlGroup}>
                    <PasswordField
                        placeholder="Current Password..."
                        label="Current Password:"
                        errors={errors.password}
                        value={formInput.password}
                        onChange={(v) => handleChange(v, 'password')}
                        onBlur={() => handleValidate('password')}
                        endIcon={'close-circle'}
                        endAction={() => handleChange('', 'password')}
                    />
                </View>
                <View style={styles.formControlGroup}>
                    <PasswordField
                        placeholder="New Password..."
                        label="New Password:"
                        errors={errors.newPassword}
                        value={formInput.newPassword}
                        onChange={(v) => handleChange(v, 'newPassword')}
                        onBlur={() => handleValidate('newPassword')}
                        endIcon={'close-circle'}
                        endAction={() => handleChange('', 'newPassword')}
                    />
                </View>
                <View style={{ marginStart: 10, marginBottom: 10 }}>
                    <View style={styles.formControlGroup}>
                        <FormLabel
                            startIcon="checkmark-outline"
                            type="verify"
                            label="Includes lower and upper case"
                            verified={match.passed1}
                        />
                        <FormLabel
                            startIcon="checkmark-outline"
                            type="verify"
                            label="Includes at least one number"
                            verified={match.passed2}
                        />
                        <FormLabel
                            startIcon="checkmark-outline"
                            type="verify"
                            label="Must be 6 or more characters"
                            verified={match.passed3}
                        />
                    </View>
                </View>

                <View style={styles.formControlGroup}>
                    <PasswordField
                        placeholder="Confirm Password..."
                        label="Confirm Password:"
                        errors={errors.confirmNewPassword}
                        value={formInput.confirmNewPassword}
                        onChange={(v) => handleChange(v, 'confirmNewPassword')}
                        onBlur={() => handleValidate('confirmNewPassword')}
                    />
                </View>

                <View style={{ ...styles.formControlGroup, marginTop: 24 }}>
                    <Button
                        value="Change Password"
                        disabled={
                            errors.newPassword ||
                            errors.confirmNewPassword ||
                            errors.password
                        }
                        onClick={handleSave}
                    />
                </View>
                <View style={{ ...styles.formControlGroup, paddingBottom: 0 }}>
                    <MyFormHelperText>{result}</MyFormHelperText>
                    {/* <MyFormHelperText /> */}
                </View>
                <View style={{ ...styles.formControlGroup }}>
                    <FormLink
                        value="Forgot Password?"
                        onClick={() => handleForgotPassword}
                    />
                </View>
            </View>
        </AccountLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        // paddingBottom: 48,
        paddingBottom: 32,
        // marginBottom: 0,
    },
    formControlGroup: {
        paddingBottom: 16,
    },
});
