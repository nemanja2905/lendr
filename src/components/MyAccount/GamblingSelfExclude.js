import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import AccountLayout from './AccountLayout';
import { sendSelfSuspend } from '../../util/authAPI';
import { Button3, Button4 } from '../Input/Button';
import { ScrollView } from 'react-native-gesture-handler';
import { colors } from '@Colors';
import { fonts } from '@Fonts';
import InputField from '../Input/InputField';
import MyFormHelperText from '../Input/MyFormHelperText';
import { ConfirmModal } from '../Common/ModalLayout';
import moment from 'moment';
import Picker from '../Input/Picker';
import { DATES, DATES3, MONTHS, YEARS, YEARS3 } from '../../util/Validators2';
import PasswordField from '../Input/PasswordField';
const prologs = [
    'If you are finding it difficult to control gambling, we encourage you to complete the form below and take an enforced break from betting with EliteBet either for a specified period or permanently.',
];
const notes = [
    'PLEASE NOTE: Once a self-exclusion request has been submitted, it cannot be revoked. The accounts of self-excluded Customers remain restricted until the expiry of their respective preriods of self exclusion.',
    'You will be logged out immediately upon your submission of a self-exclusion request. If you have requested only a temporary period of self-exclusion, you will regain access to your account at 12:01 am on the date specified in the slef-exclusion request.',
    'If you have any further queries regarding a self-exclusion request, please contact our friendly EliteBet support staff on 02 9571 0050.',
];
const limitDateTypes = [
    { value: '99', label: 'Specify Date' },
    { value: '98', label: 'Permanent' },
];
export default function GamblingSelfExclude(props) {
    const { opened, onClose, ...rest } = props;

    const [modalInfo, setModalInfo] = useState({
        opened: false,
        title: 'Confirm self exclusion request',
        message:
            'Are you sure you would like to self exclude yourself from EliteBet Permanatly?',
        message2:
            'You will be immediately logged out and unable to login to your account during this period.',
        handleClick: () => {},
    });

    const [state, setState] = useState({
        period: 0,
        year: 2022,
        month: '',
        date: '',
        password: '',
    });
    const profile = {
        password: 'asd123',
    };
    const [error, setError] = useState({
        period: 'You have to select the type.',
    });

    const checkSubmitAvailable = () => {
        const _error = {};
        if (state.period === 0) _error.period = 'You have to select the type.';
        else if (state.period === '99') {
            if (state.year === '' || state.month === '' || state.date === '') {
                _error.date = 'Enter an exclusion date.';
            }
        } else {
        }

        if (!state.password || state.password === '') {
            _error.password = 'Enter current password.';
        } else if (state.password !== profile.password)
            _error.password = 'Current Password is incorrect.';
        // console.log('State=', state, 'error=', _error);
        setError(_error);
        // return _error;
    };

    const clientid = 'testclient';

    const [result, setResult] = useState({
        // status: 200,
        // msg: 'Your request to increase your Deposit Limit has been received. For your protection, your new Daily Deposit Limit will not be applied until 04 April 2022.',
    }); //processing result
    let limitDayString;

    useEffect(() => {
        checkSubmitAvailable();
    }, [state]);

    useEffect(() => {
        const fetcha = () => {
            if (result) {
                //Reset the data
                setState({
                    period: 0,
                    year: 2022,
                    month: '',
                    date: '',
                    password: '',
                });
                setResult(null);
            }
        };

        const tt = setTimeout(fetcha, 5000);
        return () => clearTimeout(tt);
    }, [result]);

    const updateSelfSuspend = useCallback(async (uid, date, password) => {
        const res = await sendSelfSuspend(uid, date, password);

        if (res.suspend && res.suspend.success) {
            setResult({ status: 200, msg: 'successfully set.' });
        } else if (!res.error) {
            console.log('SelfSuspend Response strange,', res);
            //2022-03-11 Suppose : When we received gzip response below, we assume this is successful.
            /**
       * clientid	o%2Fee1vJUMnMPWn1Kts8KL5twFJ6sQB6NPHWEOE0Lo%2F5EXMy587ar2SbLrdNHZqKc
        password	123456
        suspenddate	2022-05-09
       */
            setResult({ status: 200, msg: 'successfully set.' });
        } else {
            setResult({
                status: 404,
                msg: res.ERROBJ?.ERRDESC || 'Unknown error',
            });
        }
    }, []);

    const handleSaveAction = (props) => {
        limitDayString =
            state.period === '99'
                ? [
                      state.year,
                      (state.month > 9 ? '' : '0') + state.month,
                      (state.date > 9 ? '' : '0') + state.date,
                  ].join('-')
                : '2300-01-01';
        let newMessage =
            state.period === '99'
                ? `Are you sure you would like to self-exclude yourself from EliteBet from now until ${limitDayString}?`
                : 'Are you sure you would like to self exclude yourself from EliteBet Permanatly?';
        // showModal(newMessage, () =>
        //     (clientid, limitDayString, state.password)
        // );
        setModalInfo({
            ...modalInfo,
            opened: true,
            message: newMessage,
            handleClick: () =>
                updateSelfSuspend(clientid, limitDayString, state.password),
        });
    };

    return (
        <AccountLayout title="Self Exclude">
            <View style={styles.container} key={1}>
                {prologs.map((prolog, i) => (
                    <Text key={1010 + i}>{prolog}</Text>
                ))}

                <Picker
                    placeholder="Select Type..."
                    label="Period:"
                    items={limitDateTypes}
                    value={state.period}
                    onChange={(period) => {
                        setState({ ...state, period, date: '', month: '' });
                    }}
                />
                <View
                    style={
                        state.period === '99'
                            ? { marginVertical: 16 }
                            : {
                                  marginVertical: 16,
                                  opacity: 0,
                                  height: 0,
                              }
                    }
                >
                    <Text>Exclude until:</Text>
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
                            value={state.date}
                            style={{ width: '30%' }}
                            onChange={(date) => {
                                setState({ ...state, date });
                                checkSubmitAvailable();
                            }}
                        />
                        <Picker
                            key={202}
                            placeholder="MM"
                            items={MONTHS}
                            value={state.month}
                            style={{ width: '30%', marginHorizontal: 'auto' }}
                            onChange={(month) => {
                                setState({ ...state, month });
                                checkSubmitAvailable();
                            }}
                        />
                        <Picker
                            key={203}
                            placeholder="yyyy"
                            items={YEARS3}
                            value={state.year}
                            style={{ width: '30%' }}
                            onChange={(year) => {
                                setState({ ...state, year });
                                checkSubmitAvailable();
                            }}
                        />
                    </View>
                    {error && error.date && (
                        <View style={styles.errorContainer}>
                            <Text style={styles.errorText}>{error.date}</Text>
                        </View>
                    )}
                </View>
                <PasswordField
                    placeholder="Enter your EliteBet Password"
                    label="Your Account Password:"
                    type="password"
                    errors={error.password}
                    value={state.password}
                    onChange={(password) => setState({ ...state, password })}
                    onBlur={checkSubmitAvailable}
                />
                <View style={{ marginVertical: 24 }} key={4}>
                    <Button4
                        label="Submit Self Exclusion Request"
                        color={colors.success.main}
                        width="100%"
                        disabled={error.period || error.date || error.password}
                        textColor="white"
                        onClick={handleSaveAction}
                    />
                </View>
                <MyFormHelperText type={1}>{result}</MyFormHelperText>
                <View key={5}>
                    {notes.map((note, i) => (
                        <Text style={{ marginVertical: 6 }} key={200 + i}>
                            {note}
                        </Text>
                    ))}
                </View>
            </View>
            <ConfirmModal modalInfo={modalInfo} setModalInfo={setModalInfo} />
        </AccountLayout>
    );
}
const styles = StyleSheet.create({
    formGroup: {
        padding: 10,
    },
    container2: {
        padding: 8,
    },

    container: {
        padding: 16,
        paddingTop: 32,
        // paddingBottom: 48,
    },
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
