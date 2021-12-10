import { CenterLoader, CustomText } from '@components/uiComponents';
import { Theme } from '@constants/index';
import { CommonHelpers, ToastHelpers } from '@helpers/index';
import CashServices from '@services/CashServices';
import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';

const {
    SIZES,
    COLORS,
    FONT: {
        TEXT_BOLD
    }
} = Theme;

export default function ListCashOutRequest({ navigation }) {
    const [isShowSpinner, setIsShowSpinner] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [listCashOutRequest, setListCashOutRequest] = useState([]);

    useEffect(
        () => {
            getListCompletedCashOutRequest();
            const onFocus = navigation.addListener('focus', () => {
                setIsShowSpinner(true);
                getListCompletedCashOutRequest();
            });

            return onFocus;
        }, []
    );

    const getListCompletedCashOutRequest = async () => {
        const res = await CashServices.fetchCashOutRequestAsync();
        console.log('res :>> ', res);
        const { data } = res;

        if (data) {
            let listComplete = [];
            listComplete = data.data.filter((item) => item.isCompleted);
            setListCashOutRequest(listComplete);

            setIsShowSpinner(false);
            setRefreshing(false);
        }
    };

    const renderCashOutRequestItem = (item, index) => (
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
                            text="Số tiền nạp:"
                        />
                        <CustomText
                            text="Số tiền trước:"
                        />
                        <CustomText
                            text="Số tiền sau:"
                        />
                        <CustomText
                            text="Tên đăng nhập:"
                        />
                        <CustomText
                            text="Thời gian:"
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
                            text={`${item.username}`}
                        />
                        <CustomText
                            style={{
                                fontFamily: TEXT_BOLD
                            }}
                            text={`${CommonHelpers.formatTime(item.createdDate)}`}
                        />
                    </View>
                </View>
                <CustomText
                    text={`Mô tả: ${item.description}`}
                />
            </View>
        </View>
    );

    const onRefresh = () => {
        getListCompletedCashOutRequest();
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
