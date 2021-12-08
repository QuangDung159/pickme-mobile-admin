/* eslint-disable import/no-unresolved */
import { CustomText, IconCustom, Line } from '@components/uiComponents';
import App from '@constants/App';
import IconFamily from '@constants/IconFamily';
import ScreenName from '@constants/ScreenName';
import ScreenTitle from '@constants/ScreenTitle';
import Theme from '@constants/Theme';
import { ENV } from '@env';
import ToastHelpers from '@helpers/ToastHelpers';
import { resetStoreSignOut } from '@redux/Actions';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';

const {
    SIZES, FONT: {
        TEXT_BOLD
    },
    COLORS
} = Theme;

export default function Menu({ navigation }) {
    const dispatch = useDispatch();

    const listMenu = [
        {
            title: ScreenTitle.CASH_IN_REQUEST,
            icon: {
                name: 'cash-plus',
                family: IconFamily.MATERIAL_COMMUNITY_ICONS,
                size: 26,
            },
            onPress: () => {
                navigation.navigate(ScreenName.CASH_IN_REQUEST);
            },
        },
        {
            title: ScreenTitle.CASH_OUT_REQUEST,
            icon: {
                name: 'cash-minus',
                family: IconFamily.MATERIAL_COMMUNITY_ICONS,
                size: 26,
            },
            onPress: () => {
                navigation.navigate(ScreenName.CASH_OUT_REQUEST);
            },
        },
        {
            title: ScreenTitle.CASH_HISTORY,
            icon: {
                name: 'account-cash-outline',
                family: IconFamily.MATERIAL_COMMUNITY_ICONS,
                size: 26,
            },
            onPress: () => {
                navigation.navigate(ScreenName.CASH_HISTORY);
            },
        },
        {
            title: ScreenTitle.VALIDATION_REQUEST,
            icon: {
                name: 'verified-user',
                family: IconFamily.MATERIAL_ICONS,
                size: 26,
            },
            onPress: () => {
                navigation.navigate(ScreenName.VALIDATION_REQUEST);
            },
        },
        {
            title: 'Đăng xuất',
            onPress: () => onSignOut(),
            icon: {
                name: 'logout',
                size: 20,
                family: IconFamily.SIMPLE_LINE_ICONS
            },
        },
    ];

    const onSignOut = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: ScreenName.ONBOARDING }],
        });
        dispatch(resetStoreSignOut());
        SecureStore.deleteItemAsync('api_token')
            .then(console.log('api_token was cleaned!'));
    };

    const renderMenuItem = (menuItem) => {
        const { icon } = menuItem;
        return (
            (
                <View style={{
                    alignSelf: 'center',
                }}
                >
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: SIZES.WIDTH_BASE * 0.9,
                            alignSelf: 'center',
                            height: 30,
                        }}
                        onPress={() => menuItem.onPress()}
                    >
                        <View
                            style={{
                                flex: 1
                            }}
                        >
                            <IconCustom
                                name={icon.name}
                                family={icon.family}
                                size={icon.size}
                                color={COLORS.ACTIVE}
                            />
                        </View>
                        <View
                            style={{
                                flex: 9,
                            }}
                        >
                            <CustomText
                                text={menuItem.title}
                                style={{
                                    fontSize: SIZES.FONT_H3,
                                    fontFamily: TEXT_BOLD
                                }}
                            />
                        </View>
                    </TouchableOpacity>
                    <Line />
                </View>
            )
        );
    };

    try {
        return (
            <>
                <FlatList
                    data={listMenu}
                    renderItem={({ item, index }) => renderMenuItem(item, index)}
                    keyExtractor={(item) => item.title}
                    style={{
                        paddingTop: 10
                    }}
                />
                <CustomText
                    style={{
                        fontSize: SIZES.FONT_H5,
                        textAlign: 'center',
                        marginBottom: 10
                    }}
                    text={`${Constants.manifest.version} - ${ENV} (${App.APP_VERSION_OTA})`}
                />
            </>
        );
    } catch (exception) {
        console.log('exception :>> ', exception);
        return (
            <>
                {ToastHelpers.renderToast()}
            </>
        );
    }
}
