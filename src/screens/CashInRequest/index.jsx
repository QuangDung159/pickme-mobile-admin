import {
    CenterLoader,
    CustomButton, CustomInput, CustomModal, CustomText
} from '@components/uiComponents';
import { ScreenName, Theme } from '@constants/index';
import { CommonHelpers, ToastHelpers, ValidationHelpers } from '@helpers/index';
import CashServices from '@services/CashServices';
import React, { useState } from 'react';
import { View } from 'react-native';

const {
    SIZES,
    COLORS,
    FONT: {
        TEXT_BOLD
    }
} = Theme;

export default function CashInRequest({ navigation }) {
    const [amount, setAmount] = useState('');
    const [amountDisplay, setAmountDisplay] = useState('');
    const [username, setUsername] = useState('');
    const [description, setDescription] = useState('');
    const [modalConfirmVisible, setModalConfirmVisible] = useState(false);
    const [isShowSpinner, setIsShowSpinner] = useState(false);

    const submitCreateCashInRequest = async () => {
        const body = {
            amount,
            username,
            description
        };

        setIsShowSpinner(true);
        const res = await CashServices.submitCashInRequestAsync(body);
        const { data } = res;

        if (data) {
            ToastHelpers.renderToast(data.message, 'success');
            navigation.navigate(ScreenName.CASH_HISTORY, {
                tabActive: 0
            });
        }

        setIsShowSpinner(false);
    };

    const validate = () => {
        const validationArr = [
            {
                fieldName: 'Số tiền',
                input: amount,
                validate: {
                    required: {
                        value: true,
                    },
                }
            },
            {
                fieldName: 'Tên đăng nhập',
                input: username,
                validate: {
                    required: {
                        value: true,
                    },
                }
            },
            {
                fieldName: 'Mô tả',
                input: description,
                validate: {
                    required: {
                        value: true,
                    },
                }
            },
        ];

        return ValidationHelpers.validate(validationArr);
    };

    const renderModalConfirm = () => (
        <CustomModal
            modalVisible={modalConfirmVisible}
            renderContent={() => (
                <View>
                    <CustomText
                        style={{
                            textAlign: 'center',
                            marginBottom: 20,
                            fontSize: SIZES.FONT_H4,
                            fontFamily: TEXT_BOLD
                        }}
                        text={'Vui lòng kiểm tra kĩ thông tin\nnạp tiền trước khi xác nhận'}
                    />

                    <CustomText
                        style={{
                            fontSize: SIZES.FONT_H4
                        }}
                        text="Số tiền nạp: "
                    />
                    <CustomText
                        style={{
                            textAlign: 'center',
                            marginBottom: 10,
                            fontSize: SIZES.FONT_H2,
                            color: COLORS.ACTIVE,
                            fontFamily: TEXT_BOLD
                        }}
                        text={amountDisplay}
                    />

                    <CustomText
                        style={{
                            fontSize: SIZES.FONT_H4
                        }}
                        text="Tên đăng nhập: "
                    />
                    <CustomText
                        style={{
                            textAlign: 'center',
                            marginBottom: 10,
                            fontSize: SIZES.FONT_H2,
                            color: COLORS.ACTIVE,
                            fontFamily: TEXT_BOLD
                        }}
                        text={username}
                    />

                    <CustomText
                        style={{
                            fontSize: SIZES.FONT_H4
                        }}
                        text="Mô tả: "
                    />
                    <CustomText
                        style={{
                            textAlign: 'center',
                            marginBottom: 20,
                            fontSize: SIZES.FONT_H2,
                            color: COLORS.ACTIVE,
                            fontFamily: TEXT_BOLD
                        }}
                        text={description}
                    />

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: SIZES.WIDTH_BASE * 0.8
                        }}
                    >
                        <CustomButton
                            onPress={() => {
                                setModalConfirmVisible(false);
                            }}
                            buttonStyle={{ width: SIZES.WIDTH_BASE * 0.39 }}
                            type="default"
                            label="Đóng"
                        />
                        <CustomButton
                            onPress={() => {
                                setModalConfirmVisible(false);
                                submitCreateCashInRequest();
                            }}
                            buttonStyle={{ width: SIZES.WIDTH_BASE * 0.39 }}
                            type="active"
                            label="Xác nhận"
                        />
                    </View>
                </View>
            )}
        />
    );

    try {
        return (
            <>
                {isShowSpinner ? (
                    <CenterLoader />
                ) : (
                    <View
                        style={{
                            width: SIZES.WIDTH_BASE * 0.9,
                            alignItems: 'center',
                            backgroundColor: COLORS.BASE,
                            marginTop: 5,
                            alignSelf: 'center'
                        }}
                    >
                        {renderModalConfirm()}
                        <CustomInput
                            placeholder="Số tiền"
                            value={amountDisplay}
                            onChangeText={
                                (input) => {
                                    setAmount(input?.trim() || '');
                                    setAmountDisplay(input);
                                }
                            }
                            onEndEditing={
                                (e) => {
                                    setAmountDisplay(CommonHelpers.formatCurrency(e.nativeEvent.text));
                                }
                            }
                            containerStyle={{
                                marginVertical: 10,
                            }}
                            keyboardType="number-pad"
                        />
                        <CustomInput
                            placeholder="Tên đăng nhập"
                            value={username}
                            onChangeText={
                                (input) => setUsername(input)
                            }
                            containerStyle={{
                                marginVertical: 10,
                            }}
                        />
                        <CustomInput
                            placeholder="Mô tả"
                            value={description}
                            onChangeText={
                                (input) => setDescription(input)
                            }
                            containerStyle={{
                                marginVertical: 10,
                            }}
                        />

                        <CustomButton
                            buttonStyle={{
                                width: SIZES.WIDTH_BASE * 0.9,
                                marginTop: 10
                            }}
                            type="active"
                            onPress={() => {
                                if (validate()) {
                                    setModalConfirmVisible(true);
                                }
                            }}
                            label="Xác nhận"
                        />
                    </View>
                )}
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
