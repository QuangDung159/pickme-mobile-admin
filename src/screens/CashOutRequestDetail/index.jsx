import {
    CenterLoader, CustomButton, CustomText, IconCustom, NoteText
} from '@components/uiComponents';
import { IconFamily, ScreenName, Theme } from '@constants/index';
import { CommonHelpers, MediaHelpers, ToastHelpers } from '@helpers/index';
import CashServices from '@services/CashServices';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import ImageScalable from 'react-native-scalable-image';

const {
    SIZES,
    COLORS,
    FONT: {
        TEXT_BOLD
    }
} = Theme;

export default function CashOutRequestDetail({ navigation, route }) {
    const [isShowSpinner, setIsShowSpinner] = useState(false);
    const [imageUrl, setImageUrl] = useState();

    const selectedCashOut = route?.params?.cashOutRequest || '';

    const submitCompleteCashOut = async () => {
        setIsShowSpinner(true);
        const res = await CashServices.submitCompleteCashOutRequestAsync({
            PaidImageUrl: imageUrl || 'no-image',
            Description: 'Hoàn thành',
            cashOutRequestId: selectedCashOut.id
        });

        const { data } = res;
        if (data) {
            ToastHelpers.renderToast(data.message, 'success');
            navigation.navigate(ScreenName.CASH_OUT_REQUEST);
        } else {
            setIsShowSpinner(false);
        }
    };

    const onClickUploadPaidScreenshot = () => {
        MediaHelpers.pickImage(false, [1, 1], (result) => handleUploadPainScreenshot(result.uri), 0.2);
    };

    const handleUploadPainScreenshot = (uri) => {
        setIsShowSpinner(true);

        MediaHelpers.imgbbUploadImage(
            uri,
            (res) => {
                setImageUrl(res?.data?.url || '');
                setIsShowSpinner(false);
            },
            () => {
                ToastHelpers.renderToast();
                setIsShowSpinner(false);
            }
        );
    };

    try {
        return (
            <>
                {isShowSpinner ? (
                    <CenterLoader />
                ) : (
                    <ScrollView
                        contentContainerStyle={{
                            width: SIZES.WIDTH_BASE * 0.9,
                            backgroundColor: COLORS.BASE,
                            alignSelf: 'center',
                            marginVertical: 5
                        }}
                    >
                        {selectedCashOut && (
                            <View>
                                <View
                                    style={{
                                        marginBottom: 10
                                    }}
                                >
                                    <NoteText
                                        width={SIZES.WIDTH_BASE * 0.9}
                                        title="Lưu ý:"
                                        content="Chụp ảnh màn hình sau khi thực hiện chuyển tiền"
                                        contentStyle={{
                                            fontSize: SIZES.FONT_H4,
                                            color: COLORS.ACTIVE,
                                            marginTop: 5,
                                        }}
                                        iconComponent={(
                                            <IconCustom
                                                name="info-circle"
                                                family={IconFamily.FONT_AWESOME}
                                                size={18}
                                                color={COLORS.ACTIVE}
                                            />
                                        )}
                                    />
                                </View>

                                <CustomText
                                    style={{
                                        fontSize: SIZES.FONT_H2,
                                        fontFamily: TEXT_BOLD,
                                        marginBottom: 20
                                    }}
                                    text="Thông tin chuyển khoản"
                                />

                                <CustomText
                                    style={{
                                        fontSize: SIZES.FONT_H4
                                    }}
                                    text="Số tiền rút: "
                                />
                                <CustomText
                                    style={{
                                        textAlign: 'center',
                                        marginBottom: 10,
                                        fontSize: SIZES.FONT_H2,
                                        color: COLORS.ACTIVE,
                                        fontFamily: TEXT_BOLD
                                    }}
                                    text={CommonHelpers.formatCurrency(selectedCashOut.amount)}
                                />

                                <CustomText
                                    style={{
                                        fontSize: SIZES.FONT_H4
                                    }}
                                    text="Chủ tài khoản: "
                                />
                                <CustomText
                                    style={{
                                        textAlign: 'center',
                                        marginBottom: 10,
                                        fontSize: SIZES.FONT_H2,
                                        color: COLORS.ACTIVE,
                                        fontFamily: TEXT_BOLD
                                    }}
                                    text={selectedCashOut.ownerName}
                                />

                                <CustomText
                                    style={{
                                        fontSize: SIZES.FONT_H4
                                    }}
                                    text="Tên ngân hàng: "
                                />
                                <CustomText
                                    style={{
                                        textAlign: 'center',
                                        marginBottom: 20,
                                        fontSize: SIZES.FONT_H2,
                                        color: COLORS.ACTIVE,
                                        fontFamily: TEXT_BOLD
                                    }}
                                    text={selectedCashOut.bankName}
                                />

                                <CustomButton
                                    onPress={() => {
                                        onClickUploadPaidScreenshot();
                                    }}
                                    buttonStyle={{ width: SIZES.WIDTH_BASE * 0.9, marginBottom: 10 }}
                                    type="active"
                                    label="Ảnh chụp màn hình chuyển khoản"
                                />

                                <View
                                    style={{
                                        alignSelf: 'center',
                                        marginBottom: 20
                                    }}
                                >
                                    {imageUrl ? (
                                        <ImageScalable
                                            style={{
                                                zIndex: 99
                                            }}
                                            width={SIZES.WIDTH_BASE * 0.9}
                                            source={{ uri: imageUrl }}
                                        />
                                    ) : (
                                        <CustomText
                                            style={{
                                                textAlign: 'center',
                                            }}
                                            text="Chưa có ảnh"
                                        />
                                    )}

                                </View>

                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        width: SIZES.WIDTH_BASE * 0.9,
                                        marginBottom: 10
                                    }}
                                >
                                    <CustomButton
                                        onPress={() => {
                                            console.log('reject');
                                        }}
                                        buttonStyle={{ width: SIZES.WIDTH_BASE * 0.44 }}
                                        type="default"
                                        label="Từ chối"
                                    />
                                    <CustomButton
                                        onPress={() => {
                                            submitCompleteCashOut();
                                        }}
                                        buttonStyle={{ width: SIZES.WIDTH_BASE * 0.44 }}
                                        type="active"
                                        label="Xác nhận"
                                    />
                                </View>
                            </View>
                        )}
                    </ScrollView>
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
