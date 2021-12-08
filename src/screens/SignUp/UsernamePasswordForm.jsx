import {
    CustomButton, CustomCheckbox, CustomInput
} from '@components/uiComponents';
import { IconFamily, ScreenName, Theme } from '@constants/index';
import { ToastHelpers, ValidationHelpers } from '@helpers/index';
import { setIsSignInOtherDeviceStore, setShowLoaderStore } from '@redux/Actions';
import UserServices from '@services/UserServices';
import * as SecureStore from 'expo-secure-store';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import ModalDisclaimer from './ModalDisclaimer';

const {
    FONT: {
        TEXT_BOLD
    },
    SIZES,
    COLORS
} = Theme;

export default function UsernamePasswordForm({ navigation }) {
    const [onCheckedDisclaimer, setOnCheckedDisclaimer] = useState(false);
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [password, setPassword] = useState();
    const [rePassword, setRePassword] = useState();
    const [username, setUsername] = useState();
    const [modalVisible, setModalVisible] = useState(false);

    const dispatch = useDispatch();

    const isPasswordMatch = () => {
        if (rePassword !== password) {
            ToastHelpers.renderToast('Mật khẩu không khớp,\nbạn vui lòng kiểm tra lại.', 'error');
            return false;
        }
        return true;
    };

    const validate = () => {
        const validateArr = [
            {
                fieldName: 'Tên đăng nhập',
                input: username,
                validate: {
                    required: {
                        value: true
                    },
                    maxLength: {
                        value: 50,
                    },
                    minLength: {
                        value: 8,
                    },
                }
            },
            {
                fieldName: 'Mật khẩu',
                input: password,
                validate: {
                    required: {
                        value: true
                    },
                    maxLength: {
                        value: 50,
                    },
                    minLength: {
                        value: 8,
                    },
                }
            },
            {
                fieldName: 'Xác nhận mật khẩu',
                input: rePassword,
                validate: {
                    required: {
                        value: true,
                    },
                    maxLength: {
                        value: 50,
                    },
                    minLength: {
                        value: 8,
                    },
                }
            }
        ];

        if (!ValidationHelpers.validate(validateArr)) return false;

        if (!isPasswordMatch()) return false;

        return true;
    };

    const onLoginSuccess = async (data) => {
        const currentUserInfo = await UserServices.mappingCurrentUserInfo(data.data);
        SecureStore.setItemAsync('api_token', `${currentUserInfo.token}`);
        dispatch(setIsSignInOtherDeviceStore(false));
        dispatch(setShowLoaderStore(false));

        navigation.navigate(ScreenName.CREATE_ACCOUNT);
    };

    const loginWithSignUpInfo = async () => {
        const deviceId = await SecureStore.getItemAsync('deviceId');
        const body = {
            username,
            password,
            deviceId
        };

        const result = await UserServices.loginAsync(body);
        const {
            data
        } = result;

        if (data) {
            await onLoginSuccess(data);
            SecureStore.setItemAsync('username', username.toString());
            SecureStore.setItemAsync('password', password.toString());
        }
        dispatch(setShowLoaderStore(false));
    };

    const onSubmitSignUp = async () => {
        if (!validate()) return;

        if (!onCheckedDisclaimer) {
            ToastHelpers.renderToast('Vui lòng tham khảo các Điều khoản và Điều kiện của ứng dụng.', 'error');
            return;
        }

        const body = {
            username,
            password,
            referralCode: '1234'
        };

        dispatch(setShowLoaderStore(true));
        const result = await UserServices.submitSignUpAsync(body);
        console.log('result :>> ', result);
        const { data } = result;

        if (data) {
            await loginWithSignUpInfo();
        }
        dispatch(setShowLoaderStore(false));
    };

    const renderRegisterForm = () => (
        <>
            <View style={styles.formContainer}>
                <View
                    style={styles.formInputContainer}
                >
                    <CustomInput
                        value={username}
                        inputStyle={{
                            width: SIZES.WIDTH_BASE * 0.9,
                            textAlign: 'center',
                        }}
                        onChangeText={(input) => setUsername(input.trim())}
                        containerStyle={{
                            marginVertical: 10,
                            width: SIZES.WIDTH_BASE * 0.9
                        }}
                        placeholder="Tên đăng nhập"
                    />

                    <CustomInput
                        value={password}
                        inputStyle={{
                            width: SIZES.WIDTH_BASE * 0.9,
                            textAlign: 'center',
                        }}
                        onChangeText={(passwordInput) => setPassword(passwordInput)}
                        containerStyle={{
                            marginVertical: 10,
                            width: SIZES.WIDTH_BASE * 0.9
                        }}
                        secureTextEntry={!isShowPassword}
                        placeholder="Mật khẩu"
                        rightIcon={{
                            name: 'eye',
                            family: IconFamily.ENTYPO,
                            size: 20,
                            color: COLORS.DEFAULT
                        }}
                        onPressRightIcon={() => setIsShowPassword(!isShowPassword)}
                    />

                    <CustomInput
                        value={rePassword}
                        inputStyle={{
                            width: SIZES.WIDTH_BASE * 0.9,
                            textAlign: 'center',
                        }}
                        onChangeText={(input) => setRePassword(input)}
                        containerStyle={{
                            marginVertical: 10,
                            width: SIZES.WIDTH_BASE * 0.9
                        }}
                        secureTextEntry={!isShowPassword}
                        placeholder="Xác nhận mật khẩu"
                        rightIcon={{
                            name: 'eye',
                            family: IconFamily.ENTYPO,
                            size: 20,
                            color: COLORS.DEFAULT
                        }}
                        onPressRightIcon={() => setIsShowPassword(!isShowPassword)}
                    />
                </View>

                <CustomCheckbox
                    label="Tôi đồng ý với tất cả các Điều khoản và Điều kiện."
                    onPressLabel={() => {
                        // show modal díclaimer
                        // Alert.alert('hi there aa' + !onCheckedDisclaimer);
                        setModalVisible(true);
                        // setOnCheckedDisclaimer(!onCheckedDisclaimer)
                    }}
                    isChecked={onCheckedDisclaimer}
                    onChange={(checked) => setOnCheckedDisclaimer(checked)}
                />

                <ModalDisclaimer
                    modalVisible={modalVisible}
                    setModalVisible={(isVisible) => {
                        // accept condion
                        setOnCheckedDisclaimer(true);
                        // turn off popup
                        setModalVisible(isVisible);
                    }}
                />

                <View>
                    <CustomButton
                        onPress={() => onSubmitSignUp()}
                        buttonStyle={styles.button}
                        type="active"
                        label="Tạo tài khoản"
                    />
                </View>
            </View>
        </>
    );
    return (
        <View>
            {renderRegisterForm()}
        </View>
    );
}

const styles = StyleSheet.create({
    registerContainer: {
        marginTop: 55,
        width: SIZES.WIDTH_BASE * 0.9,
        height: SIZES.HEIGHT_BASE < 812 ? SIZES.HEIGHT_BASE * 0.8 : SIZES.HEIGHT_BASE * 0.8,
        backgroundColor: COLORS.BASE,
    },
    button: {
        width: SIZES.WIDTH_BASE * 0.9,
        marginVertical: 10
    },
    title: {
        fontFamily: TEXT_BOLD,
        textAlign: 'center'
    },
    formContainer: {
        height: SIZES.HEIGHT_BASE * 0.65
    },
    formInputContainer: {
        alignItems: 'center',
    }
});
