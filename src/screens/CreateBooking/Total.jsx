import { CustomButton, CustomInput } from '@components/uiComponents';
import ScreenName from '@constants/ScreenName';
import Theme from '@constants/Theme';
import CommonHelpers from '@helpers/CommonHelpers';
import ToastHelpers from '@helpers/ToastHelpers';
import ValidationHelpers from '@helpers/ValidationHelpers';
import { setListBookingStore, setPersonTabActiveIndex } from '@redux/Actions';
import BookingServices from '@services/BookingServices';
import moment from 'moment';
import React from 'react';
import { Alert, View } from 'react-native';
import { useDispatch } from 'react-redux';

const {
    FONT: {
        TEXT_BOLD
    },
    SIZES,
    COLORS
} = Theme;

export default function Total({
    total,
    route,
    navigation,
    selectedDate,
    startTimeStr,
    endTimeStr,
    booking,
    setIsShowSpinner
}) {
    const dispatch = useDispatch();

    const calculateTotalAmount = (start, end) => {
        if (total !== 0) return total;
        const { estimatePricing } = route.params.partner;
        const startMinutesNumber = convertStringHoursToMinutes(start) || 0;
        const endMinutesNumber = convertStringHoursToMinutes(end) || 0;
        if (startMinutesNumber < endMinutesNumber) {
            return (endMinutesNumber - startMinutesNumber) * estimatePricing;
        }
        return 0;
    };

    const convertStringHoursToMinutes = (hoursStr) => {
        const deltaTime = hoursStr.split(':');
        const hours = deltaTime[0];
        const minutes = deltaTime[1];
        return hours * 60 + +minutes;
    };

    const getListBooking = async () => {
        const res = await BookingServices.fetchListBookingAsync();

        if (res.data) {
            dispatch(setListBookingStore(res.data.data));
        }
    };

    const validate = () => {
        const validationArr = [
            {
                fieldName: 'Địa điểm',
                input: booking.address,
                validate: {
                    required: {
                        value: true,
                    },
                    maxLength: {
                        value: 255,
                    },
                }
            }
        ];

        return ValidationHelpers.validate(validationArr);
    };

    const onSubmitBooking = async () => {
        if (!validate()) return;

        const {
            params: {
                partner
            }
        } = route;

        const dateString = `${moment(selectedDate, 'DD-MM-YYYY').format('YYYY-MM-DD')}T00:00:00`;
        const startString = convertStringHoursToMinutes(startTimeStr);
        const endString = convertStringHoursToMinutes(endTimeStr);

        if (startString > 1200) {
            ToastHelpers.renderToast('Vui lòng không bắt đầu sau 20h');
            return;
        }

        const bookingToSubmit = {
            StartAt: startString,
            EndAt: endString,
            Date: dateString,
            Address: booking.address || 'N/a',
            Longtitude: booking.longtitude || 0,
            Latitude: booking.latitude || 0,
            Description: 'N/a',
            Noted: booking.noted || 'N/a',
            totalAmount: total !== 0 ? total : calculateTotalAmount(startTimeStr, endTimeStr)
        };

        setIsShowSpinner(true);
        const result = await BookingServices.submitScheduleBookingAsync(partner.id, bookingToSubmit);
        const { data } = result;

        if (data) {
            ToastHelpers.renderToast(data.message, 'success');
            getListBooking();
            dispatch(setPersonTabActiveIndex(2));
            navigation.reset({
                index: 0,
                routes: [{ name: ScreenName.PERSONAL }],
            });
        }
        setIsShowSpinner(false);
    };

    const renderAlert = () => (
        Alert.alert(
            'Huỷ bỏ?',
            'Bạn có chắc muốn huỷ đặt hẹn?',
            [
                {
                    text: 'Tiếp tục đặt',
                    style: 'cancel'
                },
                {
                    text: 'Đồng ý huỷ',
                    onPress: () => {
                        navigation.navigate(ScreenName.PROFILE, {
                            user: route.params.partner
                        });
                    }
                }
            ],
            { cancelable: false }
        )
    );

    const renderButtonPanel = () => (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}
        >
            <CustomButton
                onPress={() => renderAlert()}
                type="default"
                label="Huỷ bỏ"
            />
            <CustomButton
                onPress={() => onSubmitBooking()}
                type="active"
                label="Xác nhận"
            />
        </View>
    );

    const renderTotal = () => (
        <View>
            <View
                style={{
                    alignSelf: 'center',
                    width: SIZES.WIDTH_BASE * 0.9,
                }}
            >
                <CustomInput
                    value={CommonHelpers.generateMoneyStr(calculateTotalAmount(startTimeStr, endTimeStr))}
                    editable={false}
                    containerStyle={{
                        marginVertical: 10,
                        width: SIZES.WIDTH_BASE * 0.9,
                    }}
                    inputStyle={{
                        height: 50,
                        fontSize: SIZES.FONT_H1 + 5,
                        fontFamily: TEXT_BOLD,
                        backgroundColor: COLORS.ACTIVE,
                        color: COLORS.BASE
                    }}
                    label="Tổng chi phí:"
                />

                {renderButtonPanel()}
            </View>

        </View>
    );

    return (
        <>
            {renderTotal()}
        </>
    );
}
