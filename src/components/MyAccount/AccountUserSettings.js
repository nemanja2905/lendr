import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import CustomSwitch from '../Input/CustomSwitch';
import AccountLayout from './AccountLayout';
import MyFormHelperText from '../Input/MyFormHelperText';
import { proceedUserSettings } from '../../util/authAPI';

export default function AccountUserSettings(props) {
    const [result, setResult] = useState({});
    const [formInput, setFormInput] = useState({
        clientid: '',
        showbalance: false,
        quickbet: false,
        maillist: false,
    });

    const handleToggle = (name) => {
        doChangeUserSettings({
            ...formInput,
            [name]: !formInput[name],
        });
        setFormInput({
            ...formInput,
            [name]: !formInput[name],
        });
    };

    const doChangeUserSettings = useCallback(async (value2) => {
        const _result = (await proceedUserSettings(value2)) || {};

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

    useEffect(() => {
        //Because there is no way to know current user setting api...
        setFormInput({
            clientid: 'testclient',
            showbalance: false,
            quickbet: true,
            maillist: true,
        });
    }, []);

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
        <AccountLayout title="User Settings">
            <View style={styles.container}>
                <View style={styles.linearGroup}>
                    <Text>Show Account Balance</Text>
                    <CustomSwitch
                        value={formInput.showbalance}
                        onChange={(v) => handleToggle('showbalance')}
                    />
                </View>
                <View style={styles.linearGroup}>
                    <Text>One Tap Bet</Text>
                    <CustomSwitch
                        value={formInput.quickbet}
                        onChange={(v) => handleToggle('quickbet')}
                    />
                </View>
                <View style={styles.linearGroup}>
                    <Text>Opt in to marketing communication</Text>
                    <CustomSwitch
                        value={formInput.maillist}
                        onChange={(v) => handleToggle('maillist')}
                    />
                </View>
                <View style={styles.formControlGroup}>
                    <MyFormHelperText>{result}</MyFormHelperText>
                    {/* <MyFormHelperText /> */}
                </View>
            </View>
        </AccountLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        paddingBottom: 48,
    },
    formControlGroup: {
        paddingBottom: 5,
        display: 'flex',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: '#d3d3d3',
    },
    linearGroup: {
        paddingVertical: 10,
        paddingBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: '#d3d3d3',
    },
});
