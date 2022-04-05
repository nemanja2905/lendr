import {
    View,
    StyleSheet,
    Text,
    TextInput,
    Platform,
    TouchableOpacity,
} from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import Picker from './Picker';
import InputField from './InputField';
import { useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';

// Constant imports
import { colors } from '@Colors';
import { fonts } from '@Fonts';
import { config } from '@Config';
import { ThemeProvider } from '@react-navigation/native';
import CustomCreditField from './CustomCreditField';
import Button, { Button2 } from './Button';
import { proceedCreditCardVerify } from '../../util/authAPI';
import { ConfirmModal, ModalLayout } from '../Common/ModalLayout';

const CardItemPanel = (props) => {
    const { clientid, card, setCard, deleteCard, ...rest } = props;

    // console.log('CardItemPanel Props', props);
    // /**
    //   //  *          CT: VISA,//card type
    //   //             CIV: true,//status of verified
    //   //             CCID: 123,//cardid
    //   //             CEY: 2023,//card expiry year
    //   //             MD: 0,// if the card is not verified – the maximum deposit amount
    //   //             CMNUM: 1234 1XXX XXXX 4321,//masked card number
    //   //             CEM: 9,//card expiry month
    //   //             CN: Ted Testing,// name on card
    //   //             CB: WBC//bank name
    //   //  */
    const {
        ct, //card type
        civ, //status of verified
        ccid, //cardid
        cey, //card expiry year
        md, // if the card is not verified – the maximum deposit amount
        cmnum, //masked card number
        cem, //card expiry month
        cn, // name on card
        cb, //bank name
    } = card;

    const [result, setResult] = useState({});
    const [isOpened, setOpened] = useState(false);
    const [formInput, setFormInput] = useState({
        credit: cmnum,
        // credit:"0000000000000000",
        cents: '',
        ccv: '',
        ccid: ccid || 0,
        // ccid:0,
    });
    const [modalInfo, setModalInfo] = useState({
        opened: false,
        message: 'You are a fresh man.',
        handleClick: () => {},
    });

    useEffect(() => {
        const fetcha = () => {
            if (result) {
                setResult({});
            }
        };

        const tt = setTimeout(fetcha, 3000);
        return () => clearTimeout(tt);
    }, [result]);

    const handleDeleteCard = () => {
        setModalInfo({
            ...modalInfo,
            title: 'Confirm',
            opened: true,
            message: 'Please confirm to remove this credit card.',
            handleClick: () => deleteCard(formInput.ccid),
            // handleClick: () => deleteCard(ccid),
        });
        // setResult({ status: 200, msg: "No action implemented." });
        // console.log('???');
        // setModalInfo({
        //     ...modalInfo,
        //     opened: true,
        //     message: 'Please confirm to remove this credit card.',
        //     handleClick: deleteCard(ccid),
        // });
    };

    const doCreditCardVerify = useCallback(
        async (clientid, cardid, cents, ccv) => {
            console.log('doCreditCardVerify called');
            const res = await proceedCreditCardVerify(
                clientid,
                cardid,
                cents,
                ccv
            );
            if (res.verify && res.verify.success) {
                setResult({ status: 200, msg: 'verified set.' });

                setOpened(false);
                setCard({ ...card, civ: true });
            } else if (res.ERROBJ && res.ERROBJ.ERROR == 0) {
                setResult({ status: 200, msg: 'verified set.' });

                setOpened(false);
                setCard({ ...card, civ: true });
            } else {
                setResult({
                    status: 404,
                    msg:
                        (res.ERROBJ && res.ERROBJ.ERRORDESC) ||
                        'Unknown error.',
                });
            }
        },
        []
    );

    const handleVerify = () => {
        doCreditCardVerify(
            clientid,
            formInput.ccid,
            formInput.cents,
            formInput.ccv
        );
    };

    const handleInputChange = (namen, value) => {
        setFormInput({
            ...formInput,
            [namen]: value,
        });
    };

    const handleInputValidate = (namen) => {};

    return (
        <View>
            <View style={styles.linearGroup}>
                <CustomCreditField
                    value={formInput.credit}
                    readOnly="true"
                    onChange={(e) =>
                        setFormInput({ ...formInput, credit: e.target.value })
                    }
                    width={!civ ? '45%' : '80%'}
                    // sx={{ width: '-webkit-fill-available', mr: 1 }}
                    error={!civ}
                />
                {!civ && (
                    <Button2
                        endIcon="chevron-down"
                        width={120}
                        color={colors.error.main}
                        onClick={() => setOpened(!isOpened)}
                        style={{ marginHorizontal: 5 }}
                        value="Verify Card"
                    />
                )}

                <Button2
                    type="icon"
                    endIcon="trash-outline"
                    color="black"
                    onClick={handleDeleteCard}
                />
            </View>
            {isOpened && (
                <View style={{ ...styles.downGroup }}>
                    <Text>
                        To verify you are the owner of this card, please enter
                        the number of cents added to your first deposit from
                        this card.
                    </Text>
                    <Text>
                        For example, if the amount debited from your card was
                        $50.27 please enter 27.
                    </Text>
                    <View style={styles.linearGroup}>
                        <InputField
                            key={101}
                            placeholder="Enter Cents..."
                            style={{ width: '47.5%' }}
                            type="numeric"
                            value={formInput.cents}
                            onChange={(v) => handleInputChange('cents', v)}
                            onBlur={() => handleInputValidate('cents')}
                        />
                        <InputField
                            key={102}
                            placeholder="Enter Card CCV"
                            style={{ width: '47.5%' }}
                            type="numeric"
                            value={formInput.ccv}
                            onChange={(v) => handleInputChange('ccv', v)}
                            onBlur={() => handleInputValidate('ccv')}
                        />
                    </View>

                    <View style={styles.formControlGroup}>
                        <Button
                            value="Verify Your Card"
                            disabled={
                                formInput.cents === '' || formInput.ccv === ''
                            }
                            onClick={handleVerify}
                        />
                    </View>
                </View>
            )}
            {isOpened && (
                <View
                    style={{
                        width: '100%',
                        borderColor: '#dedede',
                        borderBottomWidth: 1,
                    }}
                ></View>
            )}

            <ConfirmModal modalInfo={modalInfo} setModalInfo={setModalInfo} />
        </View>
    );
};

const styles = StyleSheet.create({
    inputGroup: {
        paddingVertical: 20,
        backgroundColor: colors.grey.light,
    },
    downGroup: {
        marginVertical: 16,
        padding: 16,
        backgroundColor: colors.grey.light,
    },
    linearGroup: {
        // width: '100%',
        marginVertical: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
export default CardItemPanel;
