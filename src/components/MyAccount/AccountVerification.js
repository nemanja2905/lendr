import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import CustomSwitch from '../Input/CustomSwitch';
import AccountLayout from './AccountLayout';
import MyFormHelperText from '../Input/MyFormHelperText';
import { proceedUserSettings } from '../../util/authAPI';
import { VALIDATE2, VALIDATE3 } from '../../util/Validators2';
import FormLink from '../Input/Link';
import { getCreditCards } from '../../util/authAPI';
import IDVerificationPanel from '../Input/IDVerificationPanel';
import Button from '../Input/Button';
import CardListPanel from '../Input/CardListPanel';
import { ConfirmModal, ModalLayout } from '../Common/ModalLayout';

export default function AccountVerification(props) {
    const [result, setResult] = useState({
        status: 404,
        title: 'Your ',
        msg: 'Your identification is verified.',
    });
    const clientid = 'user1';
    const [formInput, setFormInput] = useState({
        clientid: '',
    });

    const [cards, setCards] = useState([]);

    const _getCreditCards = useCallback(async (id) => {
        let _result = await getCreditCards(id);
        if (
            (_result && !_result.creditcards) ||
            (_result.creditcards && _result.creditcards.length === 0)
        ) {
            console.log('use fake data...');
            setCards([
                {
                    cb: 'ANZ',
                    ccid: 1485,
                    cct: '1485',
                    cem: 1,
                    cey: 2024,
                    civ: true,
                    cmnum: '4564 #### #### 4564',
                    cn: 'Tester',
                    ct: 'MasterCard',
                },
                {
                    cb: 'AND',
                    ccid: 447,
                    cct: '447',
                    cem: 1,
                    cey: 2024,
                    civ: false,
                    cmnum: '4564 #### #### 1233',
                    cn: 'Tester',
                    ct: 'DebitCard',
                },
            ]);
            return;
        }

        if (_result && _result.creditcards) {
            console.log('credit card getCreditCard result', id, _result);
            setCards(_result.creditcards);
        }
    }, []);

    useEffect(() => {
        _getCreditCards(clientid);
    }, []);

    const doReloadCreditCards = () => {
        _getCreditCards(clientid);
    };
    const handleAddNewCard = () => {
        alert('Add New Card is not implemented.');
    };

    return (
        <AccountLayout title="Verification">
            <View style={styles.container}>
                <View style={styles.formControlGroup}>
                    <IDVerificationPanel isVerified={false} />
                </View>
                <View style={styles.formControlGroup}>
                    <Text>Credit / Debit Cards </Text>
                    <CardListPanel
                        clientid={clientid}
                        cards={cards}
                        setCards={setCards}
                        doReloadCreditCards={doReloadCreditCards}
                    />
                </View>
                <View style={styles.formControlGroup}>
                    <Button value="+ Add New Card" onClick={handleAddNewCard} />
                </View>
            </View>
        </AccountLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        paddingTop: 32,
        paddingBottom: 48,
    },

    formControlGroup: {
        paddingBottom: 20,
    },
    linearGroup: {
        paddingBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});
