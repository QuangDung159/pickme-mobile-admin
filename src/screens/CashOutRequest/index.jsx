import {
    CenterLoader, CustomButton, CustomModal, CustomText
} from '@components/uiComponents';
import { Theme } from '@constants/index';
import { CommonHelpers, MediaHelpers, ToastHelpers } from '@helpers/index';
import CashServices from '@services/CashServices';
import React, { useEffect, useState } from 'react';
import {
    FlatList, RefreshControl, TouchableOpacity, View
} from 'react-native';

const {
    SIZES,
    COLORS,
    FONT: {
        TEXT_BOLD
    }
} = Theme;

export default function CashOutRequest({ navigation }) {
    const [isShowSpinner, setIsShowSpinner] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [listCashOutRequest, setListCashOutRequest] = useState();
    const [detailModalVisible, setDetailModalVisible] = useState(false);
    const [selectedCashOut, setSelectedCashOut] = useState();

    useEffect(
        () => {
            const onFocus = navigation.addListener('focus', () => {
                setIsShowSpinner(true);
                getListWaitingCashOutRequest();
            });

            return onFocus;
        }, []
    );

    useEffect(
        () => {
            if (selectedCashOut) {
                setDetailModalVisible(true);
            }
        }, [selectedCashOut]
    );

    const getListWaitingCashOutRequest = async () => {
        const res = await CashServices.fetchCashOutRequestAsync();
        const { data } = res;

        if (data) {
            let listNotComplete = [];
            listNotComplete = data.data.filter((item) => !item.isCompleted);
            setListCashOutRequest(listNotComplete);

            setIsShowSpinner(false);
            setRefreshing(false);
        }
    };

    const renderDetailModal = () => (
        <>
            {selectedCashOut && (
                <CustomModal
                    modalVisible={detailModalVisible}
                    renderContent={() => (
                        <View>
                            <CustomText
                                style={{
                                    textAlign: 'center',
                                    marginBottom: 20,
                                    fontSize: SIZES.FONT_H4,
                                    fontFamily: TEXT_BOLD
                                }}
                                text={'Chụp ảnh màn hình sau khi\nthực hiện chuyển tiền'}
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

                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    width: SIZES.WIDTH_BASE * 0.8,
                                    marginBottom: 10
                                }}
                            >
                                <CustomButton
                                    onPress={() => {
                                        setDetailModalVisible(false);
                                        setSelectedCashOut(null);
                                    }}
                                    buttonStyle={{ width: SIZES.WIDTH_BASE * 0.39 }}
                                    type="default"
                                    label="Từ chối"
                                />
                                <CustomButton
                                    onPress={() => {
                                        setDetailModalVisible(false);
                                        setSelectedCashOut(null);
                                    }}
                                    buttonStyle={{ width: SIZES.WIDTH_BASE * 0.39 }}
                                    type="default"
                                    label="Đóng"
                                />
                            </View>
                            <CustomButton
                                onPress={() => {
                                    setDetailModalVisible(false);
                                    setSelectedCashOut(null);
                                    onClickUploadPaidScreenshot();
                                }}
                                buttonStyle={{ width: SIZES.WIDTH_BASE * 0.8 }}
                                type="active"
                                label="Đánh dấu đã hoàn thành"
                            />
                        </View>
                    )}
                />
            )}
        </>
    );

    const submitCompleteCashOut = async (imgUrl) => {
        const res = await CashServices.submitCompleteCashOutRequestAsync({
            PaidImageUrl: imgUrl,
            Description: 'Hoàn thành',
            cashOutRequestId: selectedCashOut.id
        });

        const { data } = res;
        if (data) {
            getListWaitingCashOutRequest();
            ToastHelpers.renderToast(data.message, 'success');
        }
    };

    const onClickUploadPaidScreenshot = () => {
        MediaHelpers.pickImage(false, [1, 1], (result) => handleUploadPainScreenshot(result.uri));
    };

    const handleUploadPainScreenshot = (uri) => {
        setIsShowSpinner(true);

        MediaHelpers.imgbbUploadImage(
            uri,
            (res) => {
                submitCompleteCashOut(res?.data?.url || 'no-image');
            },
            () => {
                ToastHelpers.renderToast();
                submitCompleteCashOut('no-image');
            }
        );
    };

    const renderCashOutRequestItem = (item, index) => (
        <TouchableOpacity
            onPress={
                () => {
                    setSelectedCashOut(item);
                }
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
                    marginTop: index === 0 ? 10 : 0
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
                                text="Số tiền rút:"
                            />
                            <CustomText
                                text="Số tiền trước:"
                            />
                            <CustomText
                                text="Số tiền sau:"
                            />
                            <CustomText
                                text="Chủ tài khoản:"
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
                                text={`${CommonHelpers.formatCurrency(item.amount)}`}
                            />
                            <CustomText
                                style={{
                                    fontFamily: TEXT_BOLD
                                }}
                                text={`${CommonHelpers.formatCurrency(item.previousWalletAmount)}`}
                            />
                            <CustomText
                                style={{
                                    fontFamily: TEXT_BOLD
                                }}
                                text={`${CommonHelpers.formatCurrency(item.updatedWalletAmount)}`}
                            />
                            <CustomText
                                style={{
                                    fontFamily: TEXT_BOLD
                                }}
                                text={`${item.ownerName}`}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    const onRefresh = () => {
        getListWaitingCashOutRequest();
    };

    const renderListCashOutRequest = () => (
        <FlatList
            contentContainerStyle={{
                width: SIZES.WIDTH_BASE,
            }}
            data={listCashOutRequest}
            renderItem={({ item, index }) => renderCashOutRequestItem(item, index)}
            keyExtractor={(item) => item.id}
            refreshControl={(
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={() => onRefresh()}
                    tintColor={COLORS.ACTIVE}
                />
            )}
            ListEmptyComponent={(
                <CustomText
                    style={{
                        textAlign: 'center'
                    }}
                    text="Không có dữ liệu"
                />
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
                            width: SIZES.WIDTH_BASE,
                            backgroundColor: COLORS.BASE,
                        }}
                    >
                        {renderListCashOutRequest()}
                        {renderDetailModal()}
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
