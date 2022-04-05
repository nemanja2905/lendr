import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import SubHeader from '../Common/SubHeader';
import { fonts } from '@Fonts';
import { ScrollView } from 'react-native-gesture-handler';
export default function AccountLayout(props) {
    const { children, title } = props;

    return (
        <ScrollView>
            <SubHeader />
            <View style={styles.container2}>
                {title ? <SubTitle>{title}</SubTitle> : <></>}
                <View style={{ paddingTop: 16 }}>{children}</View>
            </View>
            {/* {children} */}
        </ScrollView>
    );
}
const SubTitle = (props) => {
    const { children } = props;
    return (
        <View style={styles.subTitle}>
            <Text style={{ fontWeight: 'bold' }}>{children}</Text>
        </View>
    );
};
//keyboardType="numeric"
const styles = StyleSheet.create({
    subTitle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: fonts.REGULAR + 1,
        paddingTop: 25,
    },
    container2: {
        // backgroundColor: 'white',
        position: 'relative',
        top: -70,
        height: 'auto',
        backgroundColor: 'white',
        borderRadius: 10,
        // padding: 16,
        margin: 16,
        marginBottom: 80,
        // paddingBottom: 48,
        // transform: [
        //     {
        //         translateY: -75,
        //     },
        // ],
    },
});
