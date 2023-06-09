import {
    CenterLoader, CustomText
} from '@components/uiComponents';
import { ScreenName, Theme } from '@constants/index';
import { CommonHelpers, ToastHelpers } from '@helpers/index';
import { UserServices } from '@services/index';
import React, { useEffect, useState } from 'react';
import {
    RefreshControl, ScrollView, TouchableOpacity, View
} from 'react-native';

const {
    SIZES,
    COLORS,
    FONT: {
        TEXT_BOLD
    }
} = Theme;

export default function ListVerificationForApplyPartner({ navigation, listVerificationForPartner, isShowSpinner }) {
    const [refreshing, setRefreshing] = useState(false);
    const [listVerification, setListVerification] = useState(listVerificationForPartner);
    const [verificationSelected, setVerificationSelected] = useState();

    useEffect(
        () => {
            if (verificationSelected) {
                navigation.navigate(ScreenName.VERIFICATION_REQUEST_DETAIL, {
                    verification: verificationSelected,
                    isForPartner: true
                });
            }
        }, [verificationSelected]
    );

    const getListWaitingVerificationRequest = async () => {
        const res = await UserServices.fetchListVerificationRequestAsync({
            isApplyForPartner: true,
        });
        const { data } = res;

        if (data) {
            setListVerification(data.data);
            setRefreshing(false);
        }
    };

    const renderVerificationRequestItem = (item) => (
        <TouchableOpacity
            onPress={
                () => setVerificationSelected(item)
            }
        >
            <View
                style={{
                    width: SIZES.WIDTH_BASE * 0.95,
                    alignSelf: 'center',
                    borderColor: COLORS.ACTIVE,
                    borderRadius: 20,
                    borderWidth: 1,
                    marginBottom: 10,
                }}
            >
                <View
                    style={{
                        width: SIZES.WIDTH_BASE * 0.9,
                        alignSelf: 'center',
                        marginVertical: 10
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                    >
                        <View
                            style={{
                                width: SIZES.WIDTH_BASE * 0.4
                            }}
                        >
                            <CustomText
                                text="Tên đăng nhập:"
                            />
                            <CustomText
                                text="Ngày yêu cầu:"
                            />
                        </View>
                        <View
                            style={{
                                width: SIZES.WIDTH_BASE * 0.5
                            }}
                        >
                            <CustomText
                                style={{
                                    fontFamily: TEXT_BOLD
                                }}
                                text={`${item.userName}`}
                            />
                            <CustomText
                                style={{
                                    fontFamily: TEXT_BOLD
                                }}
                                text={`${CommonHelpers.formatTime(item.applyDate)}`}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    const onRefresh = () => {
        getListWaitingVerificationRequest();
    };

    const renderListWaitingVerificationRequest = () => (
        <View
            style={{
                marginTop: 10
            }}
        >
            {listVerification && listVerification.length > 0 ? (
                <>
                    {listVerification.map((item) => (
                        <View
                            key={item.id}
                        >
                            {renderVerificationRequestItem(item)}
                        </View>
                    ))}
                </>
            ) : (
                <CustomText
                    style={{
                        textAlign: 'center',
                    }}
                    text="Không có dữ liệu"
                />
            )}
        </View>
    );

    try {
        return (
            <>
                {isShowSpinner ? (
                    <CenterLoader />
                ) : (
                    <ScrollView
                        contentContainerStyle={{
                            width: SIZES.WIDTH_BASE,
                            minHeight: SIZES.HEIGHT_BASE
                        }}
                        showsVerticalScrollIndicator={false}
                        refreshControl={(
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={() => onRefresh()}
                                tintColor={COLORS.ACTIVE}
                            />
                        )}
                    >
                        {renderListWaitingVerificationRequest()}
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
