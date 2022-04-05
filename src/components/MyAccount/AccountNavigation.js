import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import AccountLayout from './AccountLayout';
import NavListItem from '../Common/NavListItem';
import AvatarIcon from '../../../assets/svg/avatar.svg';
import { colors } from '@Colors';
import { fonts } from '@Fonts';
export default function AccountNavigation(props) {
    return (
        <AccountLayout>
            <View style={styles.container}>
                <View style={styles.headerItem}>
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <AvatarIcon
                            width={25}
                            height={25}
                            style={{
                                fill: colors.primary.main,
                            }}
                        />
                        <View style={{ marginLeft: 16, paddingBottom: 3 }}>
                            <Text style={{ fontWeight: 'bold' }}>
                                Steve Jones
                            </Text>
                            <Text
                                style={{
                                    fontSize: fonts.REGULAR - 1,
                                    color: 'grey',
                                }}
                            >
                                steve 1987
                            </Text>
                        </View>
                    </View>
                </View>

                <NavListItem
                    icon="result"
                    label="My Details"
                    name="mydetails"
                />
                <NavListItem icon="lock" label="Password" name="password" />
                <NavListItem
                    icon="cog"
                    label="User Settings"
                    name="usersettings"
                />
                <NavListItem
                    icon="check"
                    label="Verification"
                    name="verification"
                />
                <NavListItem
                    icon="champion"
                    label="Benefits & Rewards"
                    name="benefitsrewards"
                />
                <NavListItem
                    icon="info"
                    label="Responsive Gambling"
                    name="gambling"
                />
            </View>
        </AccountLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        paddingBottom: 48,
    },
    headerItem: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: '#d3d3d3',
        padding: 12,
        // paddingTop: 0,
    },
});