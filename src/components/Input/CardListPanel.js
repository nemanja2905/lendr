import React, { useState, useCallback, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    Platform,
    TouchableOpacity,
} from 'react-native';
import Picker from './Picker';
import InputField from './InputField';
import { useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';

// Constant imports
import { colors } from '@Colors';
import { fonts } from '@Fonts';
import { config } from '@Config';
import { ThemeProvider } from '@react-navigation/native';
import MyFormHelperText from './MyFormHelperText';
import CardItemPanel from './CardItemPanel';
import { proceedCreditCardUnregister } from '../../util/authAPI';
export default function CardListPanel(props) {
    const { clientid, cards, setCards, doReloadCreditCards, ...rest } = props;
    const [result, setResult] = useState({});
    const setCard = (c) => {
        setCards(cards.map((card) => (card.ccid === c.ccid ? c : card)));
    };

    const doCreditCardUnregister = useCallback(
        async (clientid, cardid) => {
            const res = await proceedCreditCardUnregister({ clientid, cardid });
            if (res.CCUnregister && res.CCUnregister.success) {
                setResult({ status: 200, msg: 'Unregistered Successfully.' });
            } else if (res.ERROBJ && res.ERROBJ.ERROR == 0) {
                setResult({ status: 200, msg: 'Unregistered Successfully.' });
            } else {
                setResult({
                    status: 404,
                    msg:
                        (res.ERROBJ && res.ERROBJ.ERRORDESC) ||
                        'Unknown error.',
                });
                return false;
            }
            return true;
        },
        [clientid]
    );

    //just remove in this app,  remains in server
    // const removeCard = (index) => {
    //     setCards(cards.filter((card) => i !== index));
    // };

    const removeCardById = (id) => {
        if (doCreditCardUnregister(clientid, id)) {
            // if(doReloadCreditCards){
            //   doReloadCreditCards();
            // }else
            {
                setCards(cards.filter((card, i) => card.ccid !== id));
            }
        }
    };
    useEffect(() => {
        const fetcha = () => {
            if (result) {
                setResult({});
            }
        };

        const tt = setTimeout(fetcha, 5000);
        return () => clearTimeout(tt);
    }, [result]);

    return (
        <View
            style={{
                marginTop: 5,
                minWidth: props.width ? props.width : 100,
            }}
        >
            {cards.map((ccc, i) => (
                <CardItemPanel
                    key={i}
                    clientid={clientid}
                    card={ccc}
                    setCard={(c) => setCard(c)}
                    deleteCard={(id) => removeCardById(id)}
                />
            ))}
            <MyFormHelperText>{result}</MyFormHelperText>
        </View>
    );
}

// const styles = StyleSheet.create({
//     linearGroup: {
//         display: 'flex',
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//     },
// });
