import { CustomButton, CustomModal } from '@components/uiComponents';
import Theme from '@constants/Theme';
import CommonHelpers from '@helpers/CommonHelpers';
import { Picker } from '@react-native-picker/picker';
import moment from 'moment';
import React from 'react';
import { Platform, Text, View } from 'react-native';

const {
    FONT: {
        TEXT_REGULAR,
        TEXT_BOLD
    },
    SIZES,
    COLORS
} = Theme;

export default function PartnerPackageModal({
    listPartnerPackage,
    packageActive,
    setPackageActive,
    modalPartnerPackageVisible,
    setModalPartnerPackageVisible,
    setStartTimeStr,
    setEndTimeStr,
    setTotal,
    setBooking,
    booking
}) {
    const onChangePackage = (packageIdInput) => {
        const packageChoose = listPartnerPackage.find((item) => item.id === packageIdInput);

        if (packageChoose) {
            setPackageActive(packageChoose);
        }
    };

    const convertMinutesToStringHours = (minutes) => moment.utc()
        .startOf('day')
        .add(minutes, 'minutes')
        .format('HH:mm');

    const renderPartnerPackage = () => (
        <View
            style={{
                width: SIZES.WIDTH_BASE * 0.8,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: Platform.OS === 'ios' ? -20 : -10
            }}
        >
            {listPartnerPackage && packageActive && (
                <View
                    style={{
                        width: SIZES.WIDTH_BASE * 0.8,
                    }}
                >
                    <Picker
                        selectedValue={packageActive.id}
                        onValueChange={(itemValue) => onChangePackage(itemValue)}
                        fontFamily={TEXT_REGULAR}
                        itemStyle={{
                            fontSize: SIZES.FONT_H2,
                            color: COLORS.DEFAULT
                        }}
                        mode="dropdown"
                        dropdownIconColor={COLORS.ACTIVE}
                        style={{
                            fontSize: SIZES.FONT_H2,
                            color: COLORS.ACTIVE
                        }}
                    >
                        {listPartnerPackage.map((item) => (
                            <Picker.Item value={item.id} label={item.title} key={item.id} />
                        ))}
                    </Picker>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around'
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: TEXT_REGULAR,
                                color: COLORS.ACTIVE,
                                fontSize: SIZES.FONT_H1,
                                marginBottom: 10,
                            }}
                        >
                            {convertMinutesToStringHours(packageActive.startAt)}
                        </Text>
                        <Text
                            style={{
                                fontFamily: TEXT_REGULAR,
                                color: COLORS.ACTIVE,
                                fontSize: SIZES.FONT_H1,
                                marginBottom: 10
                            }}
                        >
                            {convertMinutesToStringHours(packageActive.endAt)}
                        </Text>
                    </View>

                    <Text
                        style={{
                            fontFamily: TEXT_REGULAR,
                            color: COLORS.DEFAULT,
                            fontSize: SIZES.FONT_H2,
                            marginBottom: 10
                        }}
                    >
                        {`Địa điểm: ${packageActive.address}`}
                    </Text>
                    <Text
                        style={{
                            fontFamily: TEXT_REGULAR,
                            color: COLORS.DEFAULT,
                            fontSize: SIZES.FONT_H2,
                            marginBottom: 10
                        }}
                    >
                        {`Lời nhắn từ Host: ${packageActive.noted}`}
                    </Text>
                    <View
                        style={{
                            alignSelf: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: TEXT_BOLD,
                                fontSize: 30,
                                paddingVertical: 10,
                                color: COLORS.ACTIVE
                            }}
                        >
                            {CommonHelpers.generateMoneyStr(packageActive.estimateAmount)}
                        </Text>
                    </View>
                </View>
            )}
        </View>
    );

    const renderPartnerPackageModal = () => (
        <CustomModal
            modalVisible={modalPartnerPackageVisible}
            renderContent={() => (
                <>
                    <Text
                        style={{
                            fontFamily: TEXT_REGULAR,
                            marginVertical: 10,
                            fontSize: SIZES.FONT_H2,
                            color: COLORS.DEFAULT
                        }}
                    >
                        Chọn gói đơn hẹn
                    </Text>
                    {renderPartnerPackage()}
                    <View
                        style={{
                            paddingVertical: 10,
                            width: SIZES.WIDTH_BASE * 0.8,
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}
                    >

                        <CustomButton
                            onPress={() => {
                                setModalPartnerPackageVisible(false);
                            }}
                            type="default"
                            label="Huỷ bỏ"
                            buttonStyle={{
                                width: SIZES.WIDTH_BASE * 0.39
                            }}
                        />
                        <CustomButton
                            onPress={() => {
                                setModalPartnerPackageVisible(false);
                                const startHourString = convertMinutesToStringHours(
                                    packageActive.startAt
                                );

                                const endHourString = convertMinutesToStringHours(
                                    packageActive.endAt
                                );

                                setStartTimeStr(startHourString);
                                setEndTimeStr(endHourString);
                                setTotal(packageActive.estimateAmount);
                                setBooking({
                                    ...booking,
                                    noted: packageActive.noted,
                                    address: packageActive.address
                                });
                            }}
                            buttonStyle={{
                                width: SIZES.WIDTH_BASE * 0.39
                            }}
                            type="active"
                            label="Xác nhận"
                        />
                    </View>
                </>
            )}
        />
    );

    return (
        <>
            {renderPartnerPackageModal()}
        </>
    );
}
