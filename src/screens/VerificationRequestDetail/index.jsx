import { VerificationDocSection } from '@components/businessComponents';
import {
    CenterLoader, CustomButton, CustomText, IconCustom, NoteText
} from '@components/uiComponents';
import { IconFamily, ScreenName, Theme } from '@constants/index';
import { ToastHelpers } from '@helpers/index';
import { UserServices } from '@services/index';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';

const {
    SIZES,
    COLORS,
    FONT: {
        TEXT_BOLD
    }
} = Theme;

export default function VerificationRequestDetail({ navigation, route }) {
    const [isShowSpinner, setIsShowSpinner] = useState(false);
    const [verifyNote, setVerifyNote] = useState('Đầy đủ chứng từ xác thực');
    const [isApprove, setIsApprove] = useState(false);

    const verification = route?.params?.verification || '';

    const submitVerificationRequest = async () => {
        setIsShowSpinner(true);
        const params = {
            customerId: verification.id,
            body: {
                IsPartnerVerified: true,
                IsCustomerVerified: verification.isCustomerVerified,
                IsApproved: isApprove,
                verifyNote
            }
        };
        const res = await UserServices.submitVerificationRequestAsync(params);

        const { data } = res;
        if (data) {
            ToastHelpers.renderToast(data.message, 'success');
            navigation.navigate(ScreenName.VERIFICATION_REQUEST);
        } else {
            setIsShowSpinner(false);
        }
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
                        {verification && (
                            <View>
                                <View
                                    style={{
                                        marginBottom: 10
                                    }}
                                >
                                    <NoteText
                                        width={SIZES.WIDTH_BASE * 0.9}
                                        title="Lưu ý:"
                                        // eslint-disable-next-line max-len
                                        content={'Kiểm tra kĩ các chi tiết trên ảnh (số thẻ, họ tên, các dấu mộc hợp pháp).\nNếu ảnh mờ, không rõ số, số có dấu hiệu tẩy xoá thì phải từ chối xác thực.'}
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
                                    text="Thông tin xác thực"
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
                                    text={verification.userName}
                                />

                                <View
                                    style={{
                                        alignSelf: 'center',
                                        marginBottom: 20
                                    }}
                                >
                                    <VerificationDocSection
                                        setIsShowSpinner={(isShow) => setIsShowSpinner(isShow)}
                                        navigation={navigation}
                                        route={route}
                                        verificationDocuments={verification?.verificationDocuments || []}
                                    />

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
                                            submitVerificationRequest();
                                        }}
                                        buttonStyle={{ width: SIZES.WIDTH_BASE * 0.44 }}
                                        type="active"
                                        label="Xác thực"
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
