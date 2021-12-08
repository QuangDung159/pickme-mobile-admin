import { CustomText } from '@components/uiComponents';
import { Theme } from '@constants/index';
import { CommonHelpers, ToastHelpers } from '@helpers/index';
import CashServices from '@services/CashServices';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

const {
    SIZES,
    COLORS,
    FONT: {
        TEXT_BOLD
    }
} = Theme;

export default function ListCashInRequest({ navigation }) {
    const [listCashInRequest, setListCashInRequest] = useState();

    useEffect(
        () => {
            const onFocus = navigation.addListener('focus', () => {
                getListCashInRequest();
            });

            return onFocus;
        }, []
    );

    const getListCashInRequest = async () => {
        const res = await CashServices.fetchCashInRequestAsync();
        const { data } = res;

        if (data) {
            setListCashInRequest(data.data);
        }
    };

    const formatTime = (timeString) => {
        const timestamp = new Date(timeString);
        return moment(timestamp).format('HH:mm:ss DD-MM-YY');
    };

    const renderCashInRequestItem = (item, index) => (
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
                            text={`${item.phoneNum}`}
                        />
                        <CustomText
                            style={{
                                fontFamily: TEXT_BOLD
                            }}
                            text={`${formatTime(item.createdDate)}`}
                        />
                    </View>
                </View>
                <CustomText
                    text={`Mô tả: ${item.description}`}
                />
            </View>
        </View>
    );

    const renderListCashInRequest = () => (
        <FlatList
            contentContainerStyle={{
                width: SIZES.WIDTH_BASE,
            }}
            data={listCashInRequest}
            renderItem={({ item, index }) => renderCashInRequestItem(item, index)}
            keyExtractor={(item) => item.id}
            // refreshControl={(
            //     <RefreshControl
            //         refreshing={refreshing}
            //         onRefresh={() => onRefresh()}
            //         tintColor={COLORS.ACTIVE}
            //     />
            // )}
        />
    );

    try {
        return (
            <View
                style={{
                    width: SIZES.WIDTH_BASE,
                    backgroundColor: COLORS.BASE,
                }}
            >
                {renderListCashInRequest()}
            </View>
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
