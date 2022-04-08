import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import CustomSwitch from '../Input/CustomSwitch';
import AccountLayout from './AccountLayout';
import MyFormHelperText from '../Input/MyFormHelperText';
import { proceedUserSettings } from '../../util/authAPI';
import { UserContext } from '../../context/user/UserProvider';

export default function AccountUserSettings(props) {
    const { route } = props;
    const { user, UpdateUserDetail } = useContext(UserContext);
    const [result, setResult] = useState({});
    const [formInput, setFormInput] = useState({
        clientid: user.user.CLIENTID,
        showbalance: user.user.SHOWBALANCE === 1,
        quickbet: user.user.SINGLETAP === 1,
        maillist: user.user.MAILLIST === true,
        id: user.user.ID,
    });
    const { name, path, key, params } = route;
    // const { userInfo } = params;

    // useEffect(() => {
    //     if (user && user.user) {
    //         console.log('AccountUserSettings user2 = ', user.user);
    //         console.log('AccountUserSettings newState=', {
    //             clientid: user.user.CLIENTID,
    //             showbalance: user.user.SHOWBALANCE === 1,
    //             quickbet: user.user.SINGLETAP === 1,
    //             maillist: user.user.MAILLIST === true,
    //             id: user.user.ID,
    //         });
    //         setFormInput({
    //             clientid: user.user.CLIENTID,
    //             showbalance: user.user.SHOWBALANCE === 1,
    //             quickbet: user.user.SINGLETAP === 1,
    //             maillist: user.user.MAILLIST === true,
    //         });
    //     }
    // }, []);

    useEffect(() => {
        if (user.user) {
            console.log('UserSettings :: UseEffect user.user=', user);
            setFormInput({
                clientid: user.user.CLIENTID,
                showbalance: user.user.SHOWBALANCE === 1,
                quickbet: user.user.SINGLETAP === 1,
                maillist: user.user.MAILLIST === true,
            });
        }
    }, [user]);

    /**
     *
     * @param
     *
     */
    const handleToggle = (name) => {
        const v = !formInput[name];
        doUserSettings({
            ...formInput,
            [name]: v,
        });

        if (name === 'maillist') {
            UpdateUserDetail('MAILLIST', v);
        } else if (name === 'quickbet') {
            UpdateUserDetail('SINGLETAP', v ? 1 : 0);
        } else UpdateUserDetail('SHOWBALANCE', v ? 1 : 0);

        // setFormInput({
        //     ...formInput,
        //     [name]: v,
        // });
    };

    const doUserSettings = useCallback(
        async (value2) => {
            let value3 = {
                clientid: value2.clientid,
                pid: user.user.ID,
                showbalance: value2.showbalance,
                quickbet: value2.quickbet,
                maillist: value2.maillist,
            };
            const _result = (await proceedUserSettings(value3)) || {};

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
        },
        [user]
    );

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
                <View style={{ ...styles.linearGroup, borderBottomWidth: 1 }}>
                    <Text>Opt in to marketing communication</Text>
                    <CustomSwitch
                        value={formInput.maillist}
                        onChange={(v) => handleToggle('maillist')}
                    />
                </View>
                <View style={{ ...styles.formControlGroup }}>
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
        paddingBottom: 24,
    },
    formControlGroup: {
        paddingVertical: 16,
        display: 'flex',
        justifyContent: 'space-between',
        // borderBottomWidth: 1,
        // borderColor: '#d3d3d3',
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
