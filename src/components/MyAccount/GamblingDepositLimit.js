import React, {
    useMemo,
    useState,
    useEffect,
    useCallback,
    useContext,
} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import AccountLayout from './AccountLayout';
import { getDepositLimit, proceedDepositLimit } from '../../util/authAPI';
import { Button3, Button4 } from '../Input/Button';
import { ScrollView } from 'react-native-gesture-handler';
import { colors } from '@Colors';
import { fonts } from '@Fonts';
import InputField from '../Input/InputField';
import MyFormHelperText from '../Input/MyFormHelperText';
import { ConfirmModal } from '../Common/ModalLayout';
import moment from 'moment';
import { UserContext } from '../../context/user/UserProvider';
const definedLabels = {
    1: 'Daily',
    7: 'Weekly',
    14: 'Fortnightly',
    30: 'Monthly',
};
const definedButtonLabels = {
    1: 'Edit Daily Limit',
    7: 'Edit Weekly Limit',
    14: 'Edit Fortn. Limit',
    30: 'Edit Monthly Limit',
};
const definedKeys = {
    1: 'DailyLimit',
    7: 'WeeklyLimit',
    14: 'FortnightLimit',
    30: 'MonthlyLimit',
};
const prologs = [
    'At EliteBet, we allow you to limit the amount you can deposit into your account, with a range from 24 hours to 30 days.',
    "A deposit limit can help you control the amount you spend on gambling and ensure that the punt doesn't become a problme for you.",
];

const notes = [
    'PLEASE NOTE: If you have more than one Deposit Limit in place, each of those Deposit Limits will operate simultaneously.',
    'All Deposit Limit change requests will take effect at 12:01 am on the date specified in the Pending Deposit Limit change requests section above.',
];

export default function GamblingDepositLimit(props) {
    let clientid = 'testclient';
    const { user } = useContext(UserContext);

    const [result, setResult] = useState({
        // status: 200,
        // msg: 'Your request to increase your Deposit Limit has been received. For your protection, your new Daily Deposit Limit will not be applied until 04 April 2022.',
    }); //processing result
    const [modalInfo, setModalInfo] = useState({
        opened: false,
        title: 'Confirm',
        message: 'You are a fresh man.',
        handleClick: () => {},
    });

    const [depositLimit, setDepositLimit] = useState({
        currentPeriod: 1,
        editSelected: false,
        userDepositInput: '',
        DailyLimit: 1000.0,
        MonthlyLimit: 0,
        currDepDays: 1,
        WeeklyLimit: 0,
        OptedOutLimit: false,
        FortnightLimit: 0,
        currDepLimit: 1000.0,
        pend: [
            {
                limit: 600,
                period: 14,
                dateapplied: '2022-10-01',
            },
        ],
        trans: [
            {
                tid: 21152,
                tnm: 21152,
                td: 'EFT Deposit',
                amt: 5,
                aprv: '/Date(1592488799000+1000)/',
                exp: '/Date(1592575199000+1000)/',
            },
        ],
    });
    const loadDepositeLimitData = useCallback(async (userid) => {
        const _depositLimit = (await getDepositLimit(userid)) || {};
        console.log('updateDepositLimit from DepositLimitForm', _depositLimit);
        if (_depositLimit.depositlimit) {
            const newDepo = _depositLimit.depositlimit;
            // console.log('new DepositLimit ... ', newDepo);
            setDepositLimit({ ...depositLimit, ...newDepo });
        }
    }, []);

    useEffect(() => {
        if (user.user) {
            clientid = user.user.CLIENTID;
            loadDepositeLimitData(clientid);
        }
    }, []);

    const updateCurrentPeriod = (period) => {
        setDepositLimit({
            ...depositLimit,
            currentPeriod: period,
            currentAction: 0,
            userDepositInput: '',
            editSelected: false,
        });
    };

    const updateDepositLimitData = useCallback(async (data, action) => {
        // console.log('updateDepositLimitData', data);
        if (action === 1) {
            //reset limit option
            let res0 = await proceedDepositLimit({
                clientid,
                depositlimit: '9999999999999',
                period: '99',
            });
            // console.log('Result From setdepositlimit', res0);
            let res = res0.depositlimit;
            if (res.success) {
                setResult({ status: 200, msg: res.message });
            } else {
                setResult({
                    status: 404,
                    msg: res.message || 'Unknown Error',
                });
            }
            loadDepositeLimitData('testclient');
        } else if (action === 2) {
            //update limit
            let res0 = await proceedDepositLimit(
                'testclient',
                data.userDepositInput,
                data.currentPeriod
            );
            console.log('Result From setdepositlimit', res0);
            let res = res0.depositlimit;
            if (res.success) {
                setResult({ status: 200, msg: res.message });
            } else {
                setResult({
                    status: 404,
                    msg: res.message || 'Unknown Error',
                });
            }
            loadDepositeLimitData(clientid);
        }
    }, []);
    console.log('Result=', result);

    useEffect(() => {
        const fetcha = () => {
            if (result) {
                setResult(null);
            }
        };

        const tt = setTimeout(fetcha, 5000);
        return () => clearTimeout(tt);
    }, [result]);

    let currentLimit =
        depositLimit.currentPeriod === 1
            ? depositLimit.DailyLimit
            : depositLimit.currentPeriod === 7
            ? depositLimit.WeeklyLimit
            : depositLimit.currentPeriod === 14
            ? depositLimit.FortnightLimit
            : depositLimit.currentPeriod === 30
            ? depositLimit.MonthlyLimit
            : 0;

    // let pendingLimits = depositLimit.pend.filter((pend) => pend.LIMIT < 999999);
    let pendingLimits = depositLimit.pend.filter(
        (pend) =>
            pend.PERIOD === depositLimit.currentPeriod && pend.LIMIT < 999999999
    );
    // console.log('Pending Filters:', depositLimit.pend, depositLimit.currentPeriod);

    const handleDeleteAction = () => {
        if (pendingLimits.length > 0)
            setModalInfo({
                ...modalInfo,
                title: 'Confirm',
                opened: true,
                message:
                    'Your existing Deposit Limit/s for all periods will be removed effective {exactly 7 days from the day user has requested the change } ',
                handleClick: () => updateDepositLimitData(depositLimit, 1),
            });
    };

    const handleSaveAction = () => {
        setModalInfo({
            ...modalInfo,
            opened: true,
            title: 'Confirm',
            message: `You will be able to deposit up to ${
                depositLimit.userDepositInput
            } ${definedLabels[depositLimit.currentPeriod]}.`,
            handleClick: () => updateDepositLimitData(depositLimit, 2),
        });
    };

    const pending2String = (pending) => {
        const date = moment(pending.DATEAPPLIED).format('DD MMM YYYY');
        return `$${pending.LIMIT} effective ${date}`;
    };

    return (
        <AccountLayout title="Deposit Limit">
            <View style={styles.container} key={1}>
                {prologs.map((prolog, i) => (
                    <Text key={i} style={{ paddingBottom: 10 }}>
                        {prolog}
                    </Text>
                ))}
            </View>

            <ScrollView horizontal={true}>
                <View
                    style={{
                        ...styles.linearGroup,
                        paddingHorizontal: 10,
                        backgroundColor: '#e3e3e3',
                        overflow: 'scroll',
                    }}
                >
                    <Button3
                        key={401}
                        isSelected={depositLimit.currentPeriod === 1}
                        label="Daily"
                        onClick={() => updateCurrentPeriod(1)}
                        isBadged={depositLimit.DailyLimit > 0}
                    />
                    <Button3
                        key={402}
                        isSelected={depositLimit.currentPeriod === 7}
                        label="Weekly"
                        onClick={() => updateCurrentPeriod(7)}
                        isBadged={depositLimit.WeeklyLimit > 0}
                    />
                    <Button3
                        key={403}
                        isSelected={depositLimit.currentPeriod === 14}
                        label="Forthnightly"
                        onClick={() => updateCurrentPeriod(14)}
                        isBadged={depositLimit.FortnightLimit > 0}
                    />
                    <Button3
                        key={404}
                        isSelected={depositLimit.currentPeriod === 30}
                        label="Monthly"
                        onClick={() => updateCurrentPeriod(30)}
                        isBadged={depositLimit.WeeklyLimit > 0}
                    />
                </View>
            </ScrollView>
            <View
                key={2}
                style={{ ...styles.linearGroup, paddingVertical: 10 }}
            >
                <Text style={{}}>
                    {`Current ${
                        definedLabels[depositLimit.currentPeriod]
                    } Limit:`}
                </Text>
                <Text style={{}}>
                    {currentLimit === 0 ? 'None' : currentLimit}
                </Text>
            </View>

            <View
                key={3}
                style={{
                    borderBottomWidth: 1,
                    borderBottomColor: '#d3d3d3',
                }}
            />
            <View key={5} style={styles.container2}>
                {pendingLimits.map((pending, i) => (
                    <View
                        style={{
                            ...styles.linearGroup,
                            paddingVertical: 8,
                            paddingHorizontal: 0,
                        }}
                    >
                        <Text>{`Pending ${
                            definedLabels[pending.PERIOD]
                        } Limit`}</Text>
                        <Text>{pending2String(pending)}</Text>
                    </View>
                ))}
            </View>
            <View key={4} style={styles.linearGroup}>
                <Button4
                    label={definedButtonLabels[depositLimit.currentPeriod]}
                    isSelected={depositLimit.editSelected}
                    selectedColor={colors.primary.main}
                    onClick={() =>
                        setDepositLimit({ ...depositLimit, editSelected: true })
                    }
                    width="50%"
                />
                <Button4
                    label="Remove All Limit"
                    textColor="white"
                    color={colors.success.main}
                    disabled={pendingLimits.length === 0}
                    onClick={handleDeleteAction}
                    width="35%"
                />
            </View>

            <View key={6} style={{ ...styles.container, paddingTop: 0 }}>
                {depositLimit.editSelected && (
                    <>
                        <Text>
                            Set the limit you wish to place on your deposits:
                        </Text>
                        <InputField
                            starIcon="dollar"
                            placeholder="Deposit limit amount..."
                            value={depositLimit.userDepositInput}
                            type="numeric"
                            onChange={(v) => {
                                setDepositLimit({
                                    ...depositLimit,
                                    userDepositInput: v,
                                });
                            }}
                            // onChange={(v) => handleInputChange('cents', v)}
                            // onBlur={() => handleInputValidate('cents')}
                        />
                        <Button4
                            label="Save"
                            textColor="white"
                            style={{ marginVertical: 32 }}
                            color={colors.success.main}
                            disabled={depositLimit.userDepositInput === ''}
                            onClick={handleSaveAction}
                            width="auto"
                        />
                    </>
                )}
                <MyFormHelperText type={1}>{result}</MyFormHelperText>
            </View>

            <View
                key={8}
                style={{
                    ...styles.container,
                    paddingTop: 32,
                    paddingBottom: 48,
                }}
            >
                {notes.map((note, i) => (
                    <Text key={500 + i} style={{ paddingBottom: 10 }}>
                        {note}
                    </Text>
                ))}
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
    formControlGroup: {
        paddingBottom: 5,
        display: 'flex',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: '#d3d3d3',
    },
    linearGroup: {
        // paddingBottom: 16,
        paddingHorizontal: 16,
        paddingVertical: 16,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // borderTopWidth: 1,
        // borderColor: '#d3d3d3',
    },
});
