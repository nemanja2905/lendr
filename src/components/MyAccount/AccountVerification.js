import React, { useCallback, useContext, useEffect, useState } from 'react';
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
import { UserContext } from '../../context/user/UserProvider';

export default function AccountVerification(props) {
    const { user } = useContext(UserContext);
    const [cards, setCards] = useState([]);

    const _getCreditCards = useCallback(
        async (clientid) => {
            const _result = await getCreditCards({
                clientid,
            });
            if (
                (_result && !_result.creditcards) ||
                (_result.creditcards && _result.creditcards.length < 1)
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
        },
        [user.user]
    );

    useEffect(() => {
        if (user.user) _getCreditCards(user.user.CLIENTID);
    }, []);

    const doReloadCreditCards = () => {
        if (user.user) _getCreditCards(user.user.CLIENTID);
    };
    const handleAddNewCard = () => {
        alert('Add New Card is not implemented.');
    };
    console.log(
        'AccountVerifications verified=',
        user.user.VERIFIED,
        ', Clientid=',
        user.user.CLIENTID
    );
    return (
        <AccountLayout title="Verification">
            <View style={styles.container}>
                <View style={styles.formControlGroup}>
                    <IDVerificationPanel isVerified={user.user.VERIFIED} />
                </View>
                <View style={styles.formControlGroup}>
                    <Text>Credit / Debit Cards </Text>
                    <CardListPanel
                        clientid={user.user.CLIENTID}
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
