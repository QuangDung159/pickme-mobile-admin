import {
    CenterLoader, CustomText
} from '@components/uiComponents';
import { ScreenName, Theme } from '@constants/index';
import { CommonHelpers, ToastHelpers } from '@helpers/index';
import CashServices from '@services/CashServices';
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

export default function CashOutRequest({ navigation }) {
    const [isShowSpinner, setIsShowSpinner] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [listCashOutRequest, setListCashOutRequest] = useState();
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
                navigation.navigate(ScreenName.CASH_OUT_REQUEST_DETAIL, {
                    cashOutRequest: selectedCashOut
                });
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

    const renderCashOutRequestItem = (item) => (
        <TouchableOpacity
            onPress={
                () => setSelectedCashOut(item)
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
        <View
            style={{
                marginTop: 10
            }}
        >
            {listCashOutRequest && listCashOutRequest.length > 0 ? (
                <>
                    {listCashOutRequest.map((item) => (
                        <View
                            key={item.id}
                        >
                            {renderCashOutRequestItem(item)}
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
                        // data={listCashOutRequest}
                        // renderItem={({ item, index }) => renderCashOutRequestItem(item, index)}
                        // keyExtractor={(item) => item.id}
                        refreshControl={(
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={() => onRefresh()}
                                tintColor={COLORS.ACTIVE}
                            />
                        )}
                    >
                        {renderListCashOutRequest()}
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
