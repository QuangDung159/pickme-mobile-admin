/* eslint-disable import/no-unresolved */
import {
    CenterLoader, CustomText
} from '@components/uiComponents';
import App from '@constants/App';
import {
    Images, ScreenName, Theme
} from '@constants/index';
import { ENV } from '@constants/Config';
import {
    setCurrentUser, setIsSignInOtherDeviceStore, setNavigation
} from '@redux/Actions';
import { UserServices } from '@services/index';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import {
    Image, Text, View
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import SignIn from './SignIn';

const {
    FONT: {
        TEXT_REGULAR,
    },
    SIZES,
    COLORS
} = Theme;

export default function Onboarding({ navigation }) {
    const [isShowSpinner, setIsShowSpinner] = useState(false);
    const [deviceIdDisplay, setDeviceIdDisplay] = useState('');

    const isSignInOtherDeviceStore = useSelector((state) => state.userReducer.isSignInOtherDeviceStore);

    const dispatch = useDispatch();

    useEffect(
        () => {
            dispatch(setNavigation(navigation));
            onLogin();

            SecureStore.getItemAsync('deviceId').then((deviceIdLocal) => {
                setDeviceIdDisplay(deviceIdLocal);
            });
        }, []
    );

    useEffect(
        () => {
            if (isSignInOtherDeviceStore) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: ScreenName.SIGN_IN_WITH_OTP }],
                });
            }
        }, [isSignInOtherDeviceStore]
    );

    const onLogin = async () => {
        const phoneNumber = await SecureStore.getItemAsync('username');
        const password = await SecureStore.getItemAsync('password');
        const apiToken = await SecureStore.getItemAsync('api_token');
        const deviceId = await SecureStore.getItemAsync('deviceId');

        if (apiToken) {
            if (phoneNumber && password) {
                const body = {
                    username: phoneNumber,
                    password,
                    deviceId
                };

                setIsShowSpinner(true);
                const result = await UserServices.loginAsync(body);
                const {
                    data, status
                } = result;

                if (data) {
                    const currentUserInfo = await UserServices.mappingCurrentUserInfo(data.data);
                    SecureStore.setItemAsync('api_token', `${currentUserInfo.token}`);
                    dispatch(setCurrentUser(currentUserInfo));

                    if (status === 200) {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: ScreenName.APP }],
                        });
                        dispatch(setIsSignInOtherDeviceStore(false));
                    }

                    if (status === 201) {
                    // re otp
                        navigation.reset({
                            index: 0,
                            routes: [{ name: ScreenName.SIGN_IN_WITH_OTP }],
                        });
                    }
                } else {
                    setIsShowSpinner(false);
                }
            }
        }
    };

    return (
        <>
            {isShowSpinner ? (
                <CenterLoader />
            ) : (
                <KeyboardAwareScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        backgroundColor: COLORS.BASE,
                        alignItems: 'center',
                        width: SIZES.WIDTH_BASE,
                        height: SIZES.HEIGHT_BASE
                    }}
                >
                    <>
                        <View
                            style={{
                                position: 'absolute',
                                top: 40,
                                zIndex: 99,
                                alignSelf: 'center',
                                alignItems: 'center'
                            }}
                        >
                            {/* <CustomText
                                style={{
                                    fontSize: SIZES.FONT_H5 - 4
                                }}
                                text={`${Constants.manifest.version} (${App.APP_VERSION_OTA})`}
                            /> */}
                            <CustomText
                                style={{
                                    fontSize: SIZES.FONT_H5 - 4
                                }}
                                text={!deviceIdDisplay || ''}
                            />
                        </View>
                        <View
                            style={{
                                marginTop: 130
                            }}
                        >
                            <View
                                style={{
                                    paddingBottom: 90,
                                    alignSelf: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <Image
                                    source={Images.Logo}
                                    style={{
                                        width: SIZES.WIDTH_BASE * 0.9,
                                        height: 50
                                    }}
                                />
                                <CustomText
                                    style={{
                                        color: COLORS.ACTIVE,
                                        fontSize: SIZES.FONT_H2
                                    }}
                                    text="Admin"
                                />
                            </View>
                        </View>
                        <SignIn
                            navigation={navigation}
                            setIsShowSpinner={(isShow) => setIsShowSpinner(isShow)}
                        />
                        <View
                            style={{
                                position: 'absolute',
                                bottom: 15,
                                alignSelf: 'center'
                            }}
                        >
                            <CustomText
                                style={{
                                    fontSize: SIZES.FONT_H5,
                                    textAlign: 'center',
                                    marginBottom: 5
                                }}
                                text={`${Constants.manifest.version} - ${ENV} (${App.APP_VERSION_OTA})`}
                            />
                            <Text
                                style={{
                                    fontFamily: TEXT_REGULAR,
                                    fontSize: SIZES.FONT_H5,
                                    color: COLORS.ACTIVE,
                                }}
                            >
                                Powered by DragonC92Team
                            </Text>
                        </View>
                    </>
                </KeyboardAwareScrollView>
            )}
        </>
    );
}
